from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.vision import DiseaseDetectionResponse
from app.services.prediction_service import prediction_service

router = APIRouter()

@router.post("/detect", response_model=DiseaseDetectionResponse)
async def detect_disease(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Analyzes uploaded plant leaf image using YOLOv11 vision pipeline."""
    contents = await file.read()
    return prediction_service.detect_disease_image(db, contents, file.filename)
