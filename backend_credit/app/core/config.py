import os
from typing import Optional
from dotenv import load_dotenv

# Carga las variables definidas en el archivo .env (ubicado en la raíz de backend_credit)
load_dotenv()

class Settings:
    PROJECT_NAME: str = "Hyper-personalized Credit API"
    API_V1_STR: str = "/api/v1"
    
    # MySQL Database
    MYSQL_USER: str = os.getenv("MYSQL_USER", "root")
    MYSQL_PASSWORD: str = os.getenv("MYSQL_PASSWORD", "")
    MYSQL_HOST: str = os.getenv("MYSQL_HOST", "localhost")
    MYSQL_PORT: str = os.getenv("MYSQL_PORT", "3306")
    MYSQL_DB: str = os.getenv("MYSQL_DB", "credit_db")
    
    # JWT
    SECRET_KEY: str = os.getenv("SECRET_KEY", "secret-key-for-development-only")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # Recommendation Engine (api)
    RECOMMENDATION_API_URL: str = os.getenv(
        "RECOMMENDATION_API_URL",
        "http://ax12-archer.tplinkdns.com:10000"
    )
    RECOMMENDATION_API_TIMEOUT: float = float(os.getenv("RECOMMENDATION_API_TIMEOUT", "20.0"))

    # CORS - dominios permitidos para el frontend
    BACKEND_CORS_ORIGINS: list = os.getenv(
        "BACKEND_CORS_ORIGINS", "http://localhost:3000"
    ).split(",")

    @property
    def DATABASE_URL(self) -> str:
        return f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB}"

settings = Settings()