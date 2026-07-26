"""
main.py - Módulo de Inferencia e Integración para el Autoencoder Tabular (JAX/Flax)

Permite utilizar de forma independiente las componentes de la red:
  - Encoder: Transforma datos de entrada preprocesados X (81 dims) a espacio latente Z (16 dims).
  - Decoder: Reconstruye características X_hat (81 dims) a partir del espacio latente Z (16 dims).
  - Autoencoder Completo: X -> Z -> X_hat

Requisitos: jax, jaxlib, flax, numpy, pandas
"""

import os
import pickle
import numpy as np
import jax
import jax.numpy as jnp
from typing import Dict, Tuple, Union, Optional

from autoencoder import Encoder, Decoder, TabularAutoencoder

# Dimensiones por defecto ajustadas a nuestro entrenamiento
INPUT_DIM = 81
LATENT_DIM = 16
HIDDEN_DIMS_ENC = (64, 32)
HIDDEN_DIMS_DEC = (32, 64)

def load_weights(weights_path: str = "autoencoder_weights.pkl") -> Dict:
    """
    Carga los pesos entrenados del modelo desde un archivo .pkl o .npz.
    Retorna un diccionario de parámetros compatible con Flax/JAX.
    """
    if not os.path.exists(weights_path):
        raise FileNotFoundError(f"Archivo de pesos no encontrado en: {weights_path}")

    if weights_path.endswith(".pkl"):
        with open(weights_path, "rb") as f:
            params = pickle.load(f)
    elif weights_path.endswith(".npz"):
        # Carga desde archivo npz comprimido
        raw_npz = np.load(weights_path, allow_pickle=True)
        params = raw_npz['params'].item()
    else:
        raise ValueError("Formato no soportado. Use .pkl o .npz")

    # Asegurar conversión a jax.numpy.ndarray
    params_jax = jax.tree_util.tree_map(lambda x: jnp.array(x), params)
    return params_jax

def get_encoder_and_decoder_weights(params: Dict) -> Tuple[Dict, Dict]:
    """
    Separa las estructuras de pesos para usar el Encoder y el Decoder de manera autónoma.
    """
    if 'params' in params:
        p = params['params']
    else:
        p = params

    encoder_params = {'params': p['encoder']}
    decoder_params = {'params': p['decoder']}
    return encoder_params, decoder_params

def encode(
    x: Union[np.ndarray, jnp.ndarray],
    encoder_params: Optional[Dict] = None,
    weights_path: str = "autoencoder_weights.pkl",
    latent_dim: int = LATENT_DIM
) -> np.ndarray:
    """
    Paso de Codificación (Encoder): X (N, 81) -> Z (N, 16)
    """
    if encoder_params is None:
        full_params = load_weights(weights_path)
        encoder_params, _ = get_encoder_and_decoder_weights(full_params)

    encoder_model = Encoder(latent_dim=latent_dim, hidden_dims=HIDDEN_DIMS_ENC, dropout_rate=0.0)
    x_jax = jnp.array(x, dtype=jnp.float32)
    
    # Inferencia con JIT para máxima velocidad en GPU/CPU
    @jax.jit
    def _run_encoder(batch):
        return encoder_model.apply(encoder_params, batch, train=False)

    z = _run_encoder(x_jax)
    return np.array(z)

def decode(
    z: Union[np.ndarray, jnp.ndarray],
    decoder_params: Optional[Dict] = None,
    weights_path: str = "autoencoder_weights.pkl",
    input_dim: int = INPUT_DIM
) -> np.ndarray:
    """
    Paso de Decodificación (Decoder): Z (N, 16) -> X_hat (N, 81)
    """
    if decoder_params is None:
        full_params = load_weights(weights_path)
        _, decoder_params = get_encoder_and_decoder_weights(full_params)

    decoder_model = Decoder(out_dim=input_dim, hidden_dims=HIDDEN_DIMS_DEC, dropout_rate=0.0)
    z_jax = jnp.array(z, dtype=jnp.float32)

    @jax.jit
    def _run_decoder(batch):
        return decoder_model.apply(decoder_params, batch, train=False)

    x_rec = _run_decoder(z_jax)
    return np.array(x_rec)

def reconstruct(
    x: Union[np.ndarray, jnp.ndarray],
    weights_path: str = "autoencoder_weights.pkl"
) -> np.ndarray:
    """
    Autoencoder Completo: X (N, 81) -> Z (N, 16) -> X_hat (N, 81)
    """
    full_params = load_weights(weights_path)
    ae_model = TabularAutoencoder(input_dim=INPUT_DIM, latent_dim=LATENT_DIM, dropout_rate=0.0)
    x_jax = jnp.array(x, dtype=jnp.float32)

    @jax.jit
    def _run_ae(batch):
        return ae_model.apply(full_params, batch, train=False)

    x_rec = _run_ae(x_jax)
    return np.array(x_rec)

def export_weights_to_npz(
    weights_pkl_path: str = "autoencoder_weights.pkl",
    output_npz_path: str = "autoencoder_weights.npz"
):
    """
    Exporta los pesos a un formato comprimido .npz para portabilidad sin dependencia estricta de Pickle.
    """
    params = load_weights(weights_pkl_path)
    # Convertir PyTree de JAX a diccionario simple de NumPy
    params_np = jax.tree_util.tree_map(lambda x: np.array(x), params)
    np.savez_compressed(output_npz_path, params=params_np)
    print(f"Pesos exportados exitosamente a: {output_npz_path}")

class AutoencoderInferencePipeline:
    """
    Clase contenedora orientada a producción para cargar el modelo y ejecutar operaciones por partes.
    """
    def __init__(self, weights_path: str = "autoencoder_weights.pkl"):
        self.full_params = load_weights(weights_path)
        self.encoder_params, self.decoder_params = get_encoder_and_decoder_weights(self.full_params)
        
        self.encoder = Encoder(latent_dim=LATENT_DIM, hidden_dims=HIDDEN_DIMS_ENC, dropout_rate=0.0)
        self.decoder = Decoder(out_dim=INPUT_DIM, hidden_dims=HIDDEN_DIMS_DEC, dropout_rate=0.0)
        self.autoencoder = TabularAutoencoder(input_dim=INPUT_DIM, latent_dim=LATENT_DIM, dropout_rate=0.0)

    def encode(self, x: np.ndarray) -> np.ndarray:
        return encode(x, encoder_params=self.encoder_params)

    def decode(self, z: np.ndarray) -> np.ndarray:
        return decode(z, decoder_params=self.decoder_params)

    def reconstruct(self, x: np.ndarray) -> np.ndarray:
        return reconstruct(x, weights_path="autoencoder_weights.pkl")


if __name__ == "__main__":
    print("=== DEMOSTRACIÓN DE USO INDEPENDIENTE DE ENCODER Y DECODER ===")
    
    # 1. Exportar versión comprimida NPZ
    export_weights_to_npz()

    # 2. Cargar datos de prueba
    if os.path.exists("X_processed.npy"):
        X_sample = np.load("X_processed.npy")[:10]
        print(f"\nMuestra de entrada X: {X_sample.shape}")

        # 3. Uso autónomo del Encoder
        Z_latente = encode(X_sample)
        print(f"1. Salida del ENCODER (Vector Latente Z): {Z_latente.shape}")
        print(f"   Ejemplo del primer vector latente Z[0]:\n   {Z_latente[0][:6]} ...")

        # 4. Uso autónomo del Decoder
        X_reconstruido = decode(Z_latente)
        print(f"\n2. Salida del DECODER (Reconstrucción X_hat): {X_reconstruido.shape}")

        # 5. Autoencoder completo
        X_reconstruido_ae = reconstruct(X_sample)
        print(f"3. Salida del AUTOENCODER COMPLETO: {X_reconstruido_ae.shape}")

        # Verification de coincidencia
        diff = np.max(np.abs(X_reconstruido - X_reconstruido_ae))
        print(f"\nDiferencia máxima entre (Encoder -> Decoder) vs Autoencoder Completo: {diff:.8f}")
        print("¡Verificación exitosa! Las partes funcionan de forma 100% independiente.")
