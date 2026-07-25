# Servicio API REST y Motor de Recomendación

Este módulo liviano (~170 KB) expone la API REST en FastAPI utilizando los pesos exportados del Autoencoder para perfilamiento de clientes y recomendación mediante **Distancia Euclidiana** contra perfiles arquetipo ideales.

## Instalación de Requerimientos
```bash
pip install -r requirements.txt
```

## Estructura de Archivos
* `app.py`: Servidor FastAPI REST (Endpoints `/`, `/api/v1/archetypes`, `/api/v1/encode`, `/api/v1/recommend`).
* `archetypes.py`: Definición de clientes ideales y motor de recomendación por distancia euclidiana.
* `main.py`: Módulo de inferencia en JAX para Encoder, Decoder y Autoencoder.
* `autoencoder.py`: Red de extracción de embeddings en Flax.
* `autoencoder_weights.pkl` / `autoencoder_weights.npz`: Pesos exportados.
* `metadata.pkl`: Diccionario de características.

## Ejecución del Servidor
```bash
python app.py
```
El servicio estará disponible en `http://localhost:8000`.
Documentación interactiva disponible en `http://localhost:8000/docs`.
