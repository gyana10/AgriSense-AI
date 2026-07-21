from sqlalchemy.orm import Session
from typing import Optional
from ai_models.crop_recommendation.src.predict import predict_crop
from ai_models.fertilizer_recommendation.src.predict import predict_fertilizer
from ai_models.soil_fertility.src.predict import predict_soil_fertility
from ai_models.yield_prediction.src.predict import predict_yield
from ai_models.disease_detection.src.predict import detect_plant_disease
from ai_models.pest_detection.src.predict import detect_pest
from app.repositories.prediction_repository import (
    crop_prediction_repo, yield_prediction_repo, disease_prediction_repo, pest_prediction_repo
)
from app.schemas.prediction import (
    CropPredictionRequest, CropPredictionResponse,
    FertilizerRequest, FertilizerResponse,
    SoilPredictionRequest, SoilPredictionResponse,
    YieldPredictionRequest, YieldPredictionResponse
)
from app.schemas.vision import DiseaseDetectionResponse, PestDetectionResponse

class PredictionService:
    def recommend_crop(self, db: Session, req: CropPredictionRequest, user_id: Optional[int] = None) -> CropPredictionResponse:
        res = predict_crop(req.nitrogen, req.phosphorus, req.potassium, req.temperature, req.humidity, req.ph, req.rainfall)
        
        # Save to database
        db_record = {
            "user_id": user_id,
            "nitrogen": req.nitrogen,
            "phosphorus": req.phosphorus,
            "potassium": req.potassium,
            "temperature": req.temperature,
            "humidity": req.humidity,
            "ph": req.ph,
            "rainfall": req.rainfall,
            "recommended_crop": res["recommended_crop"],
            "confidence": res["confidence"],
            "top_recommendations": res["top_recommendations"],
            "model_metadata": res["explanation"]
        }
        crop_prediction_repo.create(db, db_record)
        return CropPredictionResponse(**res)

    def recommend_fertilizer(self, req: FertilizerRequest) -> FertilizerResponse:
        res = predict_fertilizer(req.crop, req.nitrogen, req.phosphorus, req.potassium, req.soil_type or "Loamy")
        return FertilizerResponse(**res)

    def predict_soil(self, req: SoilPredictionRequest) -> SoilPredictionResponse:
        res = predict_soil_fertility(req.nitrogen, req.phosphorus, req.potassium, req.ph, req.ec or 1.0, req.organic_carbon or 0.5)
        return SoilPredictionResponse(**res)

    def predict_yield_and_revenue(self, db: Session, req: YieldPredictionRequest, user_id: Optional[int] = None) -> YieldPredictionResponse:
        res = predict_yield(req.state, req.district, req.crop, req.season, req.area_hectares, req.rainfall or 1000.0)
        
        db_record = {
            "user_id": user_id,
            "state": req.state,
            "district": req.district,
            "crop": req.crop,
            "season": req.season,
            "area_hectares": req.area_hectares,
            "rainfall": req.rainfall or 1000.0,
            "yield_tons_per_ha": res["yield_tons_per_ha"],
            "total_production_tons": res["total_production_tons"],
            "estimated_revenue_inr": res["estimated_revenue_inr"]
        }
        yield_prediction_repo.create(db, db_record)
        return YieldPredictionResponse(**res)

    def detect_disease_image(self, db: Session, image_bytes: bytes, filename: str, user_id: Optional[int] = None) -> DiseaseDetectionResponse:
        res = detect_plant_disease(image_bytes, filename)
        db_record = {
            "user_id": user_id,
            "image_url": f"/uploads/{filename}",
            "disease_name": res["disease_name"],
            "confidence": res["confidence"],
            "bounding_boxes": res["bounding_boxes"],
            "treatment_plan": res["treatment_plan"],
            "severity": res["severity"]
        }
        disease_prediction_repo.create(db, db_record)
        return DiseaseDetectionResponse(**res)

    def detect_pest_image(self, db: Session, image_bytes: bytes, filename: str, user_id: Optional[int] = None) -> PestDetectionResponse:
        res = detect_pest(image_bytes, filename)
        db_record = {
            "user_id": user_id,
            "image_url": f"/uploads/{filename}",
            "pest_name": res["pest_name"],
            "pest_count": res["pest_count"],
            "severity": res["severity"],
            "treatment_plan": res["treatment_plan"]
        }
        pest_prediction_repo.create(db, db_record)
        return PestDetectionResponse(**res)

prediction_service = PredictionService()
