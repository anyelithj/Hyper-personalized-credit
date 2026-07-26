import httpx
from typing import Dict, Any
from app.core.config import settings

class RecommendationServiceError(Exception):
    """Se lanza cuando falla la comunicación con la api de recomendación."""
    pass

async def solicitar_perfilamiento(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Llama al endpoint POST /api/v1/recommend de la api de recomendación
    (autoencoder + arquetipos + Claude AI) y retorna la respuesta cruda.
    """
    url = f"{settings.RECOMMENDATION_API_URL}/api/v1/recommend"
    try:
        async with httpx.AsyncClient(timeout=settings.RECOMMENDATION_API_TIMEOUT) as client:
            response = await client.post(url, json=payload)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as e:
        raise RecommendationServiceError(
            f"La api de recomendación respondió con error {e.response.status_code}: {e.response.text}"
        )
    except httpx.RequestError as e:
        raise RecommendationServiceError(
            f"No se pudo conectar con la api de recomendación en {url}: {str(e)}"
        )