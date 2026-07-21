from fastapi import APIRouter
from app.schemas.prediction import SoilPredictionRequest, SoilPredictionResponse
from app.services.prediction_service import prediction_service

router = APIRouter()

@router.post("/predict", response_model=SoilPredictionResponse)
def predict_soil_fertility(req: SoilPredictionRequest):
    """Predicts soil fertility level (High/Medium/Low) with SHAP feature explanations."""
    return prediction_service.predict_soil(req)
