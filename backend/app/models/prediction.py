import datetime
from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base

class CropPrediction(Base):
    __tablename__ = "crop_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    nitrogen = Column(Float, nullable=False)
    phosphorus = Column(Float, nullable=False)
    potassium = Column(Float, nullable=False)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    ph = Column(Float, nullable=False)
    rainfall = Column(Float, nullable=False)
    recommended_crop = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    top_recommendations = Column(JSON, nullable=True)
    model_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="crop_predictions")

class FertilizerPrediction(Base):
    __tablename__ = "fertilizer_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    crop = Column(String, nullable=False)
    nitrogen = Column(Float, nullable=False)
    phosphorus = Column(Float, nullable=False)
    potassium = Column(Float, nullable=False)
    soil_type = Column(String, nullable=True)
    recommended_fertilizer = Column(String, nullable=False)
    organic_alternative = Column(String, nullable=True)
    schedule = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class SoilPrediction(Base):
    __tablename__ = "soil_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    nitrogen = Column(Float, nullable=False)
    phosphorus = Column(Float, nullable=False)
    potassium = Column(Float, nullable=False)
    ph = Column(Float, nullable=False)
    ec = Column(Float, nullable=True, default=1.0)
    organic_carbon = Column(Float, nullable=True, default=0.5)
    fertility_level = Column(String, nullable=False)  # High, Medium, Low
    shap_explanation = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class YieldPrediction(Base):
    __tablename__ = "yield_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    state = Column(String, nullable=False)
    district = Column(String, nullable=False)
    crop = Column(String, nullable=False)
    season = Column(String, nullable=False)
    area_hectares = Column(Float, nullable=False)
    rainfall = Column(Float, nullable=True)
    yield_tons_per_ha = Column(Float, nullable=False)
    total_production_tons = Column(Float, nullable=False)
    estimated_revenue_inr = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="yield_predictions")

class DiseasePrediction(Base):
    __tablename__ = "disease_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    image_url = Column(String, nullable=True)
    disease_name = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    bounding_boxes = Column(JSON, nullable=True)
    treatment_plan = Column(JSON, nullable=True)
    severity = Column(String, default="Moderate")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="disease_predictions")

class PestPrediction(Base):
    __tablename__ = "pest_predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    image_url = Column(String, nullable=True)
    pest_name = Column(String, nullable=False)
    pest_count = Column(Integer, default=1)
    severity = Column(String, default="Low")
    treatment_plan = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="pest_predictions")
