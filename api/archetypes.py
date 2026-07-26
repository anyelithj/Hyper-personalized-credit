"""
archetypes.py - Módulo de Arquetipos Ideales y Recomendación por Distancia Euclidiana

Define los perfiles ideales de los 7 productos del portafolio de créditos de Colsubsidio:
  1. Cupo de Crédito / Consumo Rotativo
  2. Crédito Hipotecario
  3. Crédito Educativo
  4. Compra de Cartera
  5. Crédito Mujer (con Protección Oncológica)
  6. Crédito Complementario
  7. Crédito Rotativo para Seguros e Impuestos
"""

import pickle
import numpy as np
import jax.numpy as jnp
from typing import Dict, List, Tuple
from main import encode

# 1. Definición de los 7 Arquetipos Ideales del Portafolio Colsubsidio
ARQUETIPOS_PORTAFOLIO: Dict[str, Dict] = {
    "Cupo_Credito_Consumo_Rotativo": {
        "nombre_producto": "Cupo de Crédito / Consumo Rotativo",
        "descripcion": "Monto aprobado reutilizable ($150.000 a $5.000.000) para educación, farmacia, alimentación, vestuario y aliados (Droguerías, Hoteles, Agencias).",
        "GENERO": "M",
        "RANGO_EDAD": "20 a 35 años",
        "RANGO_SALARIAL": "Entre 1.5 y 2 SMLV",
        "CATEGORIA": "SIGMA",
        "SEGMENTO_GRUPO_FAMILIAR": "LAMBDA",
        "SEGMENTO_POBLACIONAL": "PI",
        "PIRAMIDE_NUEVA": "ETA",
        "EMPRESA_FOCO": "EMP_000001",
        "CIUDAD_AFILIADO": "BOGOTA D.C.",
        "HOTELES": "SI",
        "DROGUERIA": "SI",
        "AGENCIAS": "SI",
        "VIVIENDA": "NO"
    },
    "Credito_Hipotecario": {
        "nombre_producto": "Crédito Hipotecario",
        "descripcion": "Para compra de vivienda, en UVR o pesos con plazos adaptados a la capacidad de pago.",
        "GENERO": "M",
        "RANGO_EDAD": "36 a 45 años",
        "RANGO_SALARIAL": "Entre 3 y 4 SMLV",
        "CATEGORIA": "ZETA",
        "SEGMENTO_GRUPO_FAMILIAR": "LAMBDA",
        "SEGMENTO_POBLACIONAL": "TAU",
        "PIRAMIDE_NUEVA": "ETA",
        "EMPRESA_FOCO": "EMP_000001",
        "CIUDAD_AFILIADO": "BOGOTA D.C.",
        "HOTELES": "NO",
        "DROGUERIA": "NO",
        "AGENCIAS": "NO",
        "VIVIENDA": "SI"
    },
    "Credito_Educativo": {
        "nombre_producto": "Crédito Educativo",
        "descripcion": "Financia cualquier nivel formativo en instituciones acreditadas (cursos técnicos, pregrado o posgrado) con plazos flexibles.",
        "GENERO": "F",
        "RANGO_EDAD": "20 a 35 años",
        "RANGO_SALARIAL": "Entre 1 y 1.5 SMLV",
        "CATEGORIA": "SIGMA",
        "SEGMENTO_GRUPO_FAMILIAR": "EPSILON",
        "SEGMENTO_POBLACIONAL": "ETA",
        "PIRAMIDE_NUEVA": "XI",
        "EMPRESA_FOCO": "EMP_000001",
        "CIUDAD_AFILIADO": "BOGOTA D.C.",
        "HOTELES": "NO",
        "DROGUERIA": "NO",
        "AGENCIAS": "NO",
        "VIVIENDA": "NO"
    },
    "Compra_de_Cartera": {
        "nombre_producto": "Compra de Cartera",
        "descripcion": "Unifica deudas en un solo crédito con menor tasa de interés y mejores plazos.",
        "GENERO": "M",
        "RANGO_EDAD": "36 a 45 años",
        "RANGO_SALARIAL": "Entre 2.5 y 3 SMLV",
        "CATEGORIA": "PI",
        "SEGMENTO_GRUPO_FAMILIAR": "RHO",
        "SEGMENTO_POBLACIONAL": "TAU",
        "PIRAMIDE_NUEVA": "DELTA",
        "EMPRESA_FOCO": "EMP_000001",
        "CIUDAD_AFILIADO": "BOGOTA D.C.",
        "HOTELES": "NO",
        "DROGUERIA": "SI",
        "AGENCIAS": "NO",
        "VIVIENDA": "NO"
    },
    "Credito_Mujer": {
        "nombre_producto": "Crédito Mujer",
        "descripcion": "Montos adaptables con beneficios adicionales exclusivos como protección oncológica.",
        "GENERO": "F",
        "RANGO_EDAD": "20 a 35 años",
        "RANGO_SALARIAL": "Entre 1.5 y 2 SMLV",
        "CATEGORIA": "SIGMA",
        "SEGMENTO_GRUPO_FAMILIAR": "EPSILON",
        "SEGMENTO_POBLACIONAL": "ETA",
        "PIRAMIDE_NUEVA": "XI",
        "EMPRESA_FOCO": "EMP_000001",
        "CIUDAD_AFILIADO": "BOGOTA D.C.",
        "HOTELES": "SI",
        "DROGUERIA": "SI",
        "AGENCIAS": "NO",
        "VIVIENDA": "NO"
    },
    "Credito_Complementario": {
        "nombre_producto": "Crédito Complementario",
        "descripcion": "Línea adicional del portafolio de soluciones financieras.",
        "GENERO": "M",
        "RANGO_EDAD": "46 a 55 años",
        "RANGO_SALARIAL": "Entre 4 y 6 SMLV",
        "CATEGORIA": "ZETA",
        "SEGMENTO_GRUPO_FAMILIAR": "RHO",
        "SEGMENTO_POBLACIONAL": "TAU",
        "PIRAMIDE_NUEVA": "DELTA",
        "EMPRESA_FOCO": "EMP_000001",
        "CIUDAD_AFILIADO": "BOGOTA D.C.",
        "HOTELES": "NO",
        "DROGUERIA": "NO",
        "AGENCIAS": "NO",
        "VIVIENDA": "NO"
    },
    "Credito_Rotativo_Seguros_Impuestos": {
        "nombre_producto": "Crédito Rotativo para Seguros e Impuestos",
        "descripcion": "Financia hasta $5.000.000 para pagar impuestos y seguros con plazos de hasta 11 meses.",
        "GENERO": "F",
        "RANGO_EDAD": "36 a 45 años",
        "RANGO_SALARIAL": "Entre 2 y 2.5 SMLV",
        "CATEGORIA": "PI",
        "SEGMENTO_GRUPO_FAMILIAR": "LAMBDA",
        "SEGMENTO_POBLACIONAL": "TAU",
        "PIRAMIDE_NUEVA": "UPSILON",
        "EMPRESA_FOCO": "EMP_000001",
        "CIUDAD_AFILIADO": "BOGOTA D.C.",
        "HOTELES": "NO",
        "DROGUERIA": "SI",
        "AGENCIAS": "NO",
        "VIVIENDA": "NO"
    }
}

def transform_client_dict(client_dict: Dict, metadata_path: str = "metadata.pkl") -> np.ndarray:
    """Transforma el diccionario del cliente en vector binario de 81 dimensiones."""
    with open(metadata_path, "rb") as f:
        meta = pickle.load(f)

    feature_names = meta["feature_names"]
    top_cities = meta["top_cities"]

    vec = np.zeros(len(feature_names), dtype=np.float32)
    
    client_copy = client_dict.copy()
    ciudad = client_copy.get("CIUDAD_AFILIADO", "DESCONOCIDO")
    if ciudad not in top_cities:
        ciudad = "OTRAS_O_DESCONOCIDO"
    client_copy["CIUDAD_AFILIADO"] = ciudad

    for col, val in client_copy.items():
        if col in ["SERIE", "PISCILAGO"]:
            continue
        feat_col = f"{col}_{val}"
        if feat_col in feature_names:
            idx = feature_names.index(feat_col)
            vec[idx] = 1.0

    return vec

def build_archetype_vectors(weights_path: str = "autoencoder_weights.pkl") -> Tuple[np.ndarray, List[str]]:
    """Genera la matriz de vectores latentes (7, 16) para los arquetipos del portafolio."""
    keys = list(ARQUETIPOS_PORTAFOLIO.keys())
    matrix_x = []
    
    for key in keys:
        arq_dict = ARQUETIPOS_PORTAFOLIO[key]
        x_vec = transform_client_dict(arq_dict)
        matrix_x.append(x_vec)

    matrix_x = np.array(matrix_x, dtype=np.float32)
    z_arquetipos = encode(matrix_x, weights_path=weights_path)
    return z_arquetipos, keys

def euclidean_distance_jax(z_client: jnp.ndarray, z_archetypes: jnp.ndarray) -> jnp.ndarray:
    """Calcula Distancia Euclidiana en JAX entre cliente (1, 16) y arquetipos (7, 16)."""
    diff = z_archetypes - z_client
    distances = jnp.sqrt(jnp.sum(diff ** 2, axis=-1))
    return distances

def compute_euclidean_recommendations(
    z_cliente: np.ndarray,
    z_arquetipos: np.ndarray,
    product_keys: List[str]
) -> List[Dict]:
    """Calcula distancias euclidianas y ordena el ranking por afinidad %."""
    z_cli_jax = jnp.array(z_cliente, dtype=jnp.float32)
    z_arq_jax = jnp.array(z_arquetipos, dtype=jnp.float32)
    
    if len(z_cli_jax.shape) == 1:
        z_cli_jax = jnp.expand_dims(z_cli_jax, axis=0)

    distances = euclidean_distance_jax(z_cli_jax, z_arq_jax)
    distances_np = np.array(distances).squeeze()

    ranking = []
    for i, dist in enumerate(distances_np):
        p_key = product_keys[i]
        p_info = ARQUETIPOS_PORTAFOLIO[p_key]
        afinidad_score = float(100.0 / (1.0 + float(dist)))
        
        ranking.append({
            "codigo_producto": p_key,
            "nombre_producto": p_info["nombre_producto"],
            "descripcion": p_info["descripcion"],
            "distancia_euclidiana": round(float(dist), 4),
            "afinidad_score": round(afinidad_score, 2)
        })

    ranking.sort(key=lambda x: x["distancia_euclidiana"])
    return ranking

def aplicar_politicas_credito(
    ranking: List[Dict],
    salario_estimado: float,
    antiguedad_meses: int,
    genero: str = "F"
) -> Dict:
    """Aplica reglas de negocio (antigüedad, género y rango salarial)."""
    if antiguedad_meses < 2:
        return {
            "status": "RECHAZADO",
            "motivo": "Antigüedad laboral menor a 2 meses (requisito mínimo de política).",
            "ofertas": []
        }

    ofertas = []
    for item in ranking:
        p_key = item["codigo_producto"]
        dist = item["distancia_euclidiana"]
        afinidad = item["afinidad_score"]
        
        # Filtro exclusivo de género para Crédito Mujer
        if p_key == "Credito_Mujer" and genero.upper() != "F":
            continue

        # Filtros de salario por producto
        if p_key == "Credito_Hipotecario" and salario_estimado < 3000000:
            continue
        if p_key in ["Compra_de_Cartera", "Credito_Complementario"] and salario_estimado < 2500000:
            continue
        
        # Cálculo de cupo máximo sugerido según producto
        if p_key in ["Cupo_Credito_Consumo_Rotativo", "Credito_Rotativo_Seguros_Impuestos"]:
            monto_maximo = min(5000000.0, salario_estimado * 1.5)
        elif salario_estimado >= 10000000:
            monto_maximo = salario_estimado * 3.5
        elif salario_estimado >= 3000000:
            monto_maximo = salario_estimado * 2.5
        else:
            monto_maximo = salario_estimado * 1.5

        oferta_dict = {
            "codigo_producto": p_key,
            "nombre_producto": item["nombre_producto"],
            "descripcion": item["descripcion"],
            "distancia_euclidiana": dist,
            "afinidad_porcentaje": f"{afinidad}%",
            "monto_maximo_sugerido": round(monto_maximo, 2)
        }

        if p_key == "Credito_Mujer":
            oferta_dict["beneficio_adicional"] = "Incluye Cobertura de Protección Oncológica Femenina"

        ofertas.append(oferta_dict)

    return {
        "status": "APROBADO" if len(ofertas) > 0 else "SIN_OFERTAS_VIABLES",
        "ofertas": ofertas
    }
