from pydantic import BaseModel
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

    class Config:
        from_attributes = True

class Affiliate(AffiliateInDBBase):
    pass
