from typing import List
from sqlalchemy.orm import Session
from app.models.prediction import (
    CropPrediction, FertilizerPrediction, SoilPrediction, YieldPrediction, DiseasePrediction, PestPrediction
)
from app.repositories.base import BaseRepository

class CropPredictionRepository(BaseRepository[CropPrediction]):
    def __init__(self):
        super().__init__(CropPrediction)

    def get_by_user(self, db: Session, user_id: int, limit: int = 20) -> List[CropPrediction]:
        return db.query(CropPrediction).filter(CropPrediction.user_id == user_id).order_by(CropPrediction.created_at.desc()).limit(limit).all()

class YieldPredictionRepository(BaseRepository[YieldPrediction]):
    def __init__(self):
        super().__init__(YieldPrediction)

    def get_by_user(self, db: Session, user_id: int, limit: int = 20) -> List[YieldPrediction]:
        return db.query(YieldPrediction).filter(YieldPrediction.user_id == user_id).order_by(YieldPrediction.created_at.desc()).limit(limit).all()

class DiseasePredictionRepository(BaseRepository[DiseasePrediction]):
    def __init__(self):
        super().__init__(DiseasePrediction)

    def get_by_user(self, db: Session, user_id: int, limit: int = 20) -> List[DiseasePrediction]:
        return db.query(DiseasePrediction).filter(DiseasePrediction.user_id == user_id).order_by(DiseasePrediction.created_at.desc()).limit(limit).all()

class PestPredictionRepository(BaseRepository[PestPrediction]):
    def __init__(self):
        super().__init__(PestPrediction)

    def get_by_user(self, db: Session, user_id: int, limit: int = 20) -> List[PestPrediction]:
        return db.query(PestPrediction).filter(PestPrediction.user_id == user_id).order_by(PestPrediction.created_at.desc()).limit(limit).all()

crop_prediction_repo = CropPredictionRepository()
yield_prediction_repo = YieldPredictionRepository()
disease_prediction_repo = DiseasePredictionRepository()
pest_prediction_repo = PestPredictionRepository()
