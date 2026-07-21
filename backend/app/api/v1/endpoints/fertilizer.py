from fastapi import APIRouter
from app.schemas.prediction import FertilizerRequest, FertilizerResponse
from app.services.prediction_service import prediction_service

router = APIRouter()

@router.post("/recommend", response_model=FertilizerResponse)
def recommend_fertilizer(req: FertilizerRequest):
    """Predicts best fertilizer, organic alternatives, and application schedule."""
    return prediction_service.recommend_fertilizer(req)
