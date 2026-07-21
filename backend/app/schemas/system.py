from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class WeatherRequest(BaseModel):
    location: Optional[str] = "Bhubaneswar, Odisha"
    temp: Optional[float] = 29.5
    humidity: Optional[float] = 78.0
    rainfall: Optional[float] = 5.0
    wind_speed: Optional[float] = 12.0

class AssistantRequest(BaseModel):
    question: str
    context: Optional[Dict[str, Any]] = None

class AssistantResponse(BaseModel):
    answer: str
    sources: List[str]
    confidence: float

class FarmHealthScoreResponse(BaseModel):
    health_score: int  # 0 - 100
    rating: str  # Excellent, Good, Fair, Poor
    sub_scores: Dict[str, int]
    recommended_actions: List[str]

class SchemeResponse(BaseModel):
    id: int
    title: str
    category: str
    short_description: str
    eligibility: str
    benefits: str
    required_documents: List[str]
    official_url: str
    last_updated: str

class MarketPriceItem(BaseModel):
    crop: str
    market: str
    district: str
    state: str
    arrival_quantity_quintals: float
    min_price_inr: float
    max_price_inr: float
    modal_price_inr: float
    date: str
