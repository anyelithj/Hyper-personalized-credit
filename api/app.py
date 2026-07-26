"""
app.py - API REST en FastAPI para Profiling y Recomendación Basada en JAX & Autoencoder

Expone los endpoints del Encoder, Motor de Recomendación por Distancia Euclidiana
y generación de mensajes personalizados en lenguaje natural mediante la API de Claude (Anthropic).
"""

import os
from contextlib import asynccontextmanager
import jax
import httpx
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any

from main import AutoencoderInferencePipeline
from archetypes import (
    ARQUETIPOS_PORTAFOLIO,
    build_archetype_vectors,
    transform_client_dict,
    compute_euclidean_recommendations,
    aplicar_politicas_credito
)

# Configuración de clave de API de Anthropic (se lee desde variable de entorno con fallback predeterminado)
DEFAULT_ANTHROPIC_KEY = "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"
os.environ.setdefault("ANTHROPIC_API_KEY", DEFAULT_ANTHROPIC_KEY)

# Estado global del backend en memoria para cero overhead en cada petición HTTP
state: Dict[str, Any] = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Carga los modelos JAX, vectores de arquetipos y cliente HTTP al iniciar el servidor."""
    print("Iniciando servicio API FastAPI (JAX Driven & Claude AI)...")
    state["pipeline"] = AutoencoderInferencePipeline(weights_path="autoencoder_weights.pkl")
    state["z_arquetipos"], state["product_keys"] = build_archetype_vectors(weights_path="autoencoder_weights.pkl")
    state["http_client"] = httpx.AsyncClient(timeout=15.0)
    print(f"Modelos JAX e Integración Claude AI listos. Arquetipos cargados ({len(state['product_keys'])} productos).")
    yield
    await state["http_client"].aclose()
    state.clear()
    print("Servicio API finalizado.")

app = FastAPI(
    title="Colsubsidio Profiling & Recommendation Engine API",
    description="API REST impulsada por JAX, Flax, Distancia Euclidiana y Claude AI (Anthropic)",
    version="1.1.0",
    lifespan=lifespan
)

# --- Modelos de Petición HTTP (Pydantic) ---

class DatosCliente(BaseModel):
    GENERO: str = Field(default="M", example="M")
    RANGO_EDAD: str = Field(default="36 a 45 años", example="36 a 45 años")
    RANGO_SALARIAL: str = Field(default="Entre 3 y 4 SMLV", example="Entre 3 y 4 SMLV")
    CATEGORIA: str = Field(default="ZETA", example="ZETA")
    SEGMENTO_GRUPO_FAMILIAR: str = Field(default="LAMBDA", example="LAMBDA")
    SEGMENTO_POBLACIONAL: str = Field(default="TAU", example="TAU")
    PIRAMIDE_NUEVA: str = Field(default="ETA", example="ETA")
    EMPRESA_FOCO: str = Field(default="EMP_000001", example="EMP_000001")
    CIUDAD_AFILIADO: str = Field(default="BOGOTA D.C.", example="BOGOTA D.C.")
    HOTELES: str = Field(default="NO", example="NO")
    DROGUERIA: str = Field(default="NO", example="NO")
    AGENCIAS: str = Field(default="NO", example="NO")
    VIVIENDA: str = Field(default="SI", example="SI")

class SolicitudPerfilamiento(BaseModel):
    cedula: str = Field(example="1018234901")
    nombre_afiliado: Optional[str] = Field(default="Afiliado(a)", example="Maria Paula")
    salario_estimado: float = Field(example=4500000.0)
    antiguedad_meses: int = Field(example=12)
    generar_mensaje_llm: bool = Field(default=True, description="Si es True, llama a la API de Claude para generar un mensaje personalizado en lenguaje natural")
    datos_cliente: DatosCliente

# --- Función auxiliar para llamar a la API de Anthropic Claude ---

async def generar_mensaje_claude(
    nombre: str,
    evaluacion: Dict,
    genero: str,
    salario: float
) -> Optional[str]:
    """Genera un mensaje personalizado en lenguaje natural mediante Claude API."""
    api_key = os.getenv("ANTHROPIC_API_KEY", DEFAULT_ANTHROPIC_KEY)
    
    if not api_key:
        return "No se ha configurado la API Key de Anthropic."

    ofertas = evaluacion.get("ofertas", [])
    if not ofertas:
        return f"Hola {nombre}, en este momento no tenemos una oferta pré-aprobada disponible, pero te invitamos a consultar más soluciones en Colsubsidio."

    top_oferta = ofertas[0]
    nombre_prod = top_oferta["nombre_producto"]
    monto_sugerido = top_oferta["monto_maximo_sugerido"]
    beneficio = top_oferta.get("beneficio_adicional", "")

    prompt = f"""Eres un asesor comercial amable, empático e institucional de la Caja de Compensación Colsubsidio en Colombia.
Tu objetivo es redactar un mensaje personalizado corto (máximo 3 párrafos, tono cálido y profesional) para el afiliado(a) {nombre}.

Información relevante:
- Producto recomendado principal: {nombre_prod}
- Cupo máximo sugerido pre-aprobado: ${monto_sugerido:,.0f} COP
- Beneficio especial: {beneficio if beneficio else 'Amplios beneficios y tasas preferenciales'}
- Género: {'Femenino' if genero == 'F' else 'Masculino'}

Requisitos del mensaje:
1. Saluda cordialmente por su nombre.
2. Explícale brevemente por qué este producto ({nombre_prod}) se ajusta a su perfil y resalta el cupo o beneficio.
3. Termina con un llamado a la acción entusiasta e invitando a ingresar al portal de Colsubsidio o responder esta notificación.
No incluyas corchetes ni placeholders sin reemplazar."""

    headers = {
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    }

    payload = {
        "model": "claude-sonnet-4-5-20250929",
        "max_tokens": 300,
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    try:
        http_client: httpx.AsyncClient = state.get("http_client")
        if http_client:
            res = await http_client.post("https://api.anthropic.com/v1/messages", headers=headers, json=payload)
        else:
            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post("https://api.anthropic.com/v1/messages", headers=headers, json=payload)
                
        if res.status_code == 200:
            data = res.json()
            return data["content"][0]["text"]
        else:
            return f"Error en API Claude ({res.status_code}): {res.text}"
    except Exception as e:
        return f"Excepción al llamar a Claude API: {str(e)}"

# --- Endpoints de la API ---

@app.get("/")
def health_check():
    return {
        "status": "ONLINE",
        "backend": jax.default_backend(),
        "devices": [str(d) for d in jax.devices()],
        "claude_api_configured": bool(os.getenv("ANTHROPIC_API_KEY")),
        "num_arquetipos_cargados": len(state.get("product_keys", []))
    }

@app.get("/api/v1/archetypes")
def listar_arquetipos():
    """Retorna la lista de productos y sus perfiles ideales en el espacio latente."""
    return {
        "productos": ARQUETIPOS_PORTAFOLIO,
        "nombres_productos": state["product_keys"]
    }

@app.post("/api/v1/encode")
def obtener_vector_latente(datos: DatosCliente):
    """Transforma las características de un cliente y retorna solo su vector latente Z (16 dims)."""
    try:
        x_vec = transform_client_dict(datos.model_dump())
        z_cli = state["pipeline"].encode(x_vec.reshape(1, -1))
        return {
            "dimensiones": z_cli.shape,
            "vector_latente_z": z_cli.squeeze().tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/v1/recommend")
async def perfilar_y_recomendar(solicitud: SolicitudPerfilamiento):
    """
    Endpoint Principal:
    1. Codifica los datos del cliente al espacio latente Z con el Encoder en JAX.
    2. Calcula las distancias euclidianas relativas a los vectores arquetipo de producto.
    3. Aplica restricciones de políticas de crédito.
    4. Genera opcionalmente un mensaje personalizado en lenguaje natural con Claude AI (Anthropic).
    """
    try:
        # 1. Transformar cliente a vector de 81 dims y obtener Z (16 dims)
        x_vec = transform_client_dict(solicitud.datos_cliente.model_dump())
        z_cli = state["pipeline"].encode(x_vec.reshape(1, -1))

        # 2. Calcular distancias euclidianas y ordenamiento por afinidad
        ranking = compute_euclidean_recommendations(
            z_cliente=z_cli,
            z_arquetipos=state["z_arquetipos"],
            product_keys=state["product_keys"]
        )

        # 3. Aplicar políticas de negocio
        evaluacion = aplicar_politicas_credito(
            ranking=ranking,
            salario_estimado=solicitud.salario_estimado,
            antiguedad_meses=solicitud.antiguedad_meses,
            genero=solicitud.datos_cliente.GENERO
        )

        # 4. Generación de mensaje personalizado con Claude AI de Anthropic
        mensaje_personalizado = None
        if solicitud.generar_mensaje_llm:
            mensaje_personalizado = await generar_mensaje_claude(
                nombre=solicitud.nombre_afiliado or "Afiliado(a)",
                evaluacion=evaluacion,
                genero=solicitud.datos_cliente.GENERO,
                salario=solicitud.salario_estimado
            )

        return {
            "cedula": solicitud.cedula,
            "nombre_afiliado": solicitud.nombre_afiliado,
            "vector_latente_z": z_cli.squeeze().tolist(),
            "ranking_distancia_euclidiana": ranking,
            "evaluacion_politica_credito": evaluacion,
            "mensaje_personalizado_claude": mensaje_personalizado
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
