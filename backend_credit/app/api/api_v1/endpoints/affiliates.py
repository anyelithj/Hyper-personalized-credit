from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.session import get_db
from app.crud.crud_affiliate import affiliate as crud_affiliate
from app.schemas.affiliate import (
    Affiliate, AffiliateCreate, AffiliateUpdate, PerfilamientoRequest
)
from app.services.recommendation_client import (
    solicitar_perfilamiento, RecommendationServiceError
)

router = APIRouter()


@router.post("/perfilar", response_model=Affiliate)
async def perfilar_y_crear_afiliado(
    solicitud: PerfilamientoRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """
    Flujo principal:
    1. Envía los datos del afiliado a la api de recomendación (autoencoder + Claude AI).
    2. Guarda al afiliado en la base de datos junto con el resultado del perfilamiento.
    Si el afiliado (por cédula) ya existe, actualiza su información.
    """
    payload = {
        "cedula": solicitud.cedula,
        "nombre_afiliado": solicitud.nombre,
        "salario_estimado": solicitud.salario_estimado,
        "antiguedad_meses": solicitud.antiguedad_meses,
        "generar_mensaje_llm": solicitud.generar_mensaje_llm,
        "datos_cliente": solicitud.datos_cliente.model_dump(),
    }

    try:
        resultado = await solicitar_perfilamiento(payload)
    except RecommendationServiceError as e:
        raise HTTPException(status_code=502, detail=str(e))

    ranking = resultado.get("ranking_distancia_euclidiana", [])
    top_oferta = ranking[0] if ranking else {}

    evaluacion = resultado.get("evaluacion_politica_credito", {})
    ofertas_aprobadas = evaluacion.get("ofertas", [])
    top_oferta_aprobada = ofertas_aprobadas[0] if ofertas_aprobadas else {}

    datos_afiliado = {
        "cedula": solicitud.cedula,
        "nombre": solicitud.nombre,
        "correo": solicitud.correo,
        "direccion": solicitud.direccion,
        "categoria": solicitud.datos_cliente.CATEGORIA,
        "ingreso": solicitud.salario_estimado,
        "canal_preferido": solicitud.canal_preferido,
        "senales": ranking,
        "oferta_recomendada": top_oferta_aprobada.get("nombre_producto") or top_oferta.get("nombre_producto"),
        "monto_sugerido": top_oferta_aprobada.get("monto_maximo_sugerido"),
        "vector_latente": resultado.get("vector_latente_z"),
        "ranking_productos": ranking,
        "mensaje_personalizado": resultado.get("mensaje_personalizado_claude"),
    }

    existente = crud_affiliate.get_by_cedula(db, cedula=solicitud.cedula)
    if existente:
        db_obj = crud_affiliate.update(db, db_obj=existente, obj_in=datos_afiliado)
    else:
        db_obj = crud_affiliate.model(**datos_afiliado)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

    return db_obj


@router.get("/", response_model=List[Affiliate])
def listar_afiliados(
    skip: int = 0, limit: int = 100,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud_affiliate.get_multi(db, skip=skip, limit=limit)


@router.get("/{affiliate_id}", response_model=Affiliate)
def obtener_afiliado(
    affiliate_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    db_obj = crud_affiliate.get(db, id=affiliate_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Afiliado no encontrado")
    return db_obj


@router.put("/{affiliate_id}", response_model=Affiliate)
def actualizar_afiliado(
    affiliate_id: int,
    datos: AffiliateUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    db_obj = crud_affiliate.get(db, id=affiliate_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Afiliado no encontrado")
    return crud_affiliate.update(db, db_obj=db_obj, obj_in=datos)


@router.delete("/{affiliate_id}")
def eliminar_afiliado(
    affiliate_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    db_obj = crud_affiliate.remove(db, id=affiliate_id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Afiliado no encontrado")
    return {"detail": "Afiliado eliminado correctamente"}