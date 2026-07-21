import os
from typing import List, Optional

try:
    from pydantic_settings import BaseSettings
except ImportError:
    from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriSense AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment & Security
    ENV: str = os.getenv("ENV", "development")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "agrisense_super_secret_key_change_in_production_2026_precision_ag")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./agrisense.db")
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "*"
    ]
    
    # AI & External APIs
    GEMINI_API_KEY: Optional[str] = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY", "")
    CLOUDINARY_CLOUD_NAME: Optional[str] = os.getenv("CLOUDINARY_CLOUD_NAME", "")
    CLOUDINARY_API_KEY: Optional[str] = os.getenv("CLOUDINARY_API_KEY", "")
    CLOUDINARY_API_SECRET: Optional[str] = os.getenv("CLOUDINARY_API_SECRET", "")
    
    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
