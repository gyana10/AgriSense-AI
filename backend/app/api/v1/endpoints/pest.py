from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.vision import PestDetectionResponse
from app.services.prediction_service import prediction_service

router = APIRouter()

@router.post("/detect", response_model=PestDetectionResponse)
async def detect_pest(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Analyzes image for pest identification, counting, and severity level."""
    contents = await file.read()
    return prediction_service.detect_pest_image(db, contents, file.filename)
