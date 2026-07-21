from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth, crop, fertilizer, soil, yield_api, disease, pest, weather, assistant, farm_health, schemes, market, reports, dashboard, admin
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(crop.router, prefix="/crop", tags=["Crop Recommendation"])
api_router.include_router(fertilizer.router, prefix="/fertilizer", tags=["Fertilizer Recommendation"])
api_router.include_router(soil.router, prefix="/soil", tags=["Soil Fertility"])
api_router.include_router(yield_api.router, prefix="/yield", tags=["Yield Prediction"])
api_router.include_router(disease.router, prefix="/disease", tags=["Disease Detection"])
api_router.include_router(pest.router, prefix="/pest", tags=["Pest Detection"])
api_router.include_router(weather.router, prefix="/weather", tags=["Weather Intelligence"])
api_router.include_router(assistant.router, prefix="/assistant", tags=["AI Farming Assistant"])
api_router.include_router(farm_health.router, prefix="/farm-health", tags=["Farm Health Score"])
api_router.include_router(schemes.router, prefix="/schemes", tags=["Government Schemes"])
api_router.include_router(market.router, prefix="/market", tags=["Market Intelligence"])
api_router.include_router(reports.router, prefix="/reports", tags=["Report Generator"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(admin.router, prefix="/admin", tags=["Admin Panel"])