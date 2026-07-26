from sqlalchemy import Column, Integer, String, Float, JSON, Text
from app.db.session import Base

class Affiliate(Base):
    __tablename__ = "affiliates"

    id = Column(Integer, primary_key=True, index=True)
    cedula = Column(String(20), unique=True, index=True, nullable=False)
    nombre = Column(String(255), index=True, nullable=False)
    correo = Column(String(255), index=True)
    direccion = Column(String(255))
    categoria = Column(String(10))  # A, B, C, D
    ingreso = Column(Float)
    canal_preferido = Column(String(50))
    senales = Column(JSON)  # Lista de señales exógenas
    oferta_recomendada = Column(String(255))
    monto_sugerido = Column(Float)

    # --- Resultado completo del motor de recomendación (api) ---
    vector_latente = Column(JSON, nullable=True)         # z_cli (16 dims)
    ranking_productos = Column(JSON, nullable=True)       # ranking_distancia_euclidiana completo
    mensaje_personalizado = Column(Text, nullable=True)   # mensaje generado por Claude