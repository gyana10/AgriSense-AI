from fastapi import APIRouter

from app.api.v1.endpoints import crop

api_router = APIRouter()

api_router.include_router(
    crop.router,
    prefix="/crop",
    tags=["Crop Recommendation"],
)