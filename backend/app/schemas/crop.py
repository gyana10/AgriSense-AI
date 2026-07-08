from pydantic import BaseModel, Field


class CropRequest(BaseModel):
    N: int = Field(..., ge=0)
    P: int = Field(..., ge=0)
    K: int = Field(..., ge=0)
    temperature: float
    humidity: float
    ph: float
    rainfall: float


class Recommendation(BaseModel):
    crop: str
    confidence: float


class CropResponse(BaseModel):
    recommended_crop: str
    confidence: float
    top_3: list[Recommendation]