import sys
from pathlib import Path

# Add project root directory to sys.path
root_dir = Path(__file__).resolve().parent.parent.parent
if str(root_dir) not in sys.path:
    sys.path.insert(0, str(root_dir))

backend_dir = Path(__file__).resolve().parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_app_logging
from app.middleware.logging_middleware import RequestLoggingMiddleware
import app.db.base  # Pre-loads all SQLAlchemy models into registry
from app.api.v1.router import api_router

setup_app_logging()

app = FastAPI(
    title="🌾 AgriSense AI API",
    description="Precision Agriculture Platform API powering ML predictions, Computer Vision, Weather Intelligence, GIS Mapping, and AI Assistant.",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging Middleware
app.add_middleware(RequestLoggingMiddleware)

# API Routes
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "title": "🌾 AgriSense AI Engine",
        "status": "Online",
        "version": settings.VERSION,
        "swagger_docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)