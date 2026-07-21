from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app.db.session import get_db
from app.schemas.prediction import CropPredictionRequest, CropPredictionResponse
from app.services.prediction_service import prediction_service

router = APIRouter()

@router.post("/predict", response_model=CropPredictionResponse)
def predict_crop(req: CropPredictionRequest, db: Session = Depends(get_db)):
    """Predicts optimal crop recommendation using machine learning model."""
    return prediction_service.recommend_crop(db, req)