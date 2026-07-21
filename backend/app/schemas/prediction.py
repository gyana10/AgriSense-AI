from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

# Crop Schemas
class CropPredictionRequest(BaseModel):
    nitrogen: float = Field(..., ge=0, le=300)
    phosphorus: float = Field(..., ge=0, le=300)
    potassium: float = Field(..., ge=0, le=300)
    temperature: float = Field(..., ge=-10, le=60)
    humidity: float = Field(..., ge=0, le=100)
    ph: float = Field(..., ge=0, le=14)
    rainfall: float = Field(..., ge=0, le=3000)

class TopRecommendation(BaseModel):
    crop: str
    confidence: float

class CropPredictionResponse(BaseModel):
    recommended_crop: str
    confidence: float
    top_recommendations: List[TopRecommendation]
    explanation: Dict[str, Any]

# Fertilizer Schemas
class FertilizerRequest(BaseModel):
    crop: str
    nitrogen: float
    phosphorus: float
    potassium: float
    soil_type: Optional[str] = "Loamy"

class FertilizerResponse(BaseModel):
    recommended_fertilizer: str
    organic_alternative: str
    application_schedule: List[Dict[str, str]]
    deficits: Dict[str, float]

# Soil Schemas
class SoilPredictionRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    ph: float
    ec: Optional[float] = 1.0
    organic_carbon: Optional[float] = 0.5

class SoilPredictionResponse(BaseModel):
    fertility_level: str
    index_score: float
    confidence: float
    shap_explanation: Dict[str, Any]

# Yield Schemas
class YieldPredictionRequest(BaseModel):
    state: str
    district: str
    crop: str
    season: str
    area_hectares: float = Field(..., gt=0)
    rainfall: Optional[float] = 1000.0

class YieldPredictionResponse(BaseModel):
    yield_tons_per_ha: float
    total_production_tons: float
    estimated_revenue_inr: float
    currency: str
    metadata: Dict[str, Any]
