from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.prediction import YieldPredictionRequest, YieldPredictionResponse
from app.services.prediction_service import prediction_service

router = APIRouter()

@router.post("/predict", response_model=YieldPredictionResponse)
def predict_yield(req: YieldPredictionRequest, db: Session = Depends(get_db)):
    """Predicts crop yield (tons/ha), total production (tons), and estimated revenue (INR)."""
    return prediction_service.predict_yield_and_revenue(db, req)
