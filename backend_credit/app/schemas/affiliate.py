from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class Signal(BaseModel):
    n: str  # Nombre de la señal
    p: float # Porcentaje/Valor de la señal

class AffiliateBase(BaseModel):
    cedula: str
    nombre: str
    correo: Optional[str] = None
    direccion: Optional[str] = None
    categoria: Optional[str] = None
    ingreso: Optional[float] = 0
    canal_preferido: Optional[str] = None
    senales: Optional[List[Dict[str, Any]]] = []
    oferta_recomendada: Optional[str] = None
    monto_sugerido: Optional[float] = 0

class AffiliateCreate(AffiliateBase):
    pass

class AffiliateUpdate(BaseModel):
    nombre: Optional[str] = None
    correo: Optional[str] = None
    direccion: Optional[str] = None
    categoria: Optional[str] = None
    ingreso: Optional[float] = None
    canal_preferido: Optional[str] = None
    senales: Optional[List[Dict[str, Any]]] = None
    oferta_recomendada: Optional[str] = None
    monto_sugerido: Optional[float] = None

class AffiliateInDBBase(AffiliateBase):
    id: int
    vector_latente: Optional[List[float]] = None
    ranking_productos: Optional[List[Dict[str, Any]]] = None
    mensaje_personalizado: Optional[str] = None

    class Config:
        from_attributes = True

class Affiliate(AffiliateInDBBase):
    pass


# --- Esquemas para el flujo de perfilamiento (conexión con `api`) ---

class DatosClienteSchema(BaseModel):
    """Debe coincidir exactamente con la clase DatosCliente de la api de recomendación."""
    GENERO: str = "M"
    RANGO_EDAD: str = "36 a 45 años"
    RANGO_SALARIAL: str = "Entre 3 y 4 SMLV"
    CATEGORIA: str = "ZETA"
    SEGMENTO_GRUPO_FAMILIAR: str = "LAMBDA"
    SEGMENTO_POBLACIONAL: str = "TAU"
    PIRAMIDE_NUEVA: str = "ETA"
    EMPRESA_FOCO: str = "EMP_000001"
    CIUDAD_AFILIADO: str = "BOGOTA D.C."
    HOTELES: str = "NO"
    DROGUERIA: str = "NO"
    AGENCIAS: str = "NO"
    VIVIENDA: str = "SI"

class PerfilamientoRequest(BaseModel):
    """Lo que el frontend envía a backend_credit para perfilar/crear un afiliado."""
    cedula: str
    nombre: str
    correo: Optional[str] = None
    direccion: Optional[str] = None
    salario_estimado: float
    antiguedad_meses: int
    canal_preferido: Optional[str] = None
    generar_mensaje_llm: bool = True
    datos_cliente: DatosClienteSchema