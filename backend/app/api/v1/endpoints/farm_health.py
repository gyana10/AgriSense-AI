from fastapi import APIRouter
from app.schemas.system import FarmHealthScoreResponse
from app.services.farm_health_service import farm_health_service

router = APIRouter()

@router.get("/score", response_model=FarmHealthScoreResponse)
def get_farm_health_score(
    soil_fertility_index: float = 78.5,
    disease_detected: bool = False,
    pest_infestation: bool = False,
    weather_risk_level: str = "Low",
    yield_efficiency: float = 90.0
):
    """Calculates overall 0-100 Farm Health Score synthesized across all AI predictions."""
    return farm_health_service.calculate_farm_health_score(
        soil_fertility_index, disease_detected, pest_infestation, weather_risk_level, yield_efficiency
    )
