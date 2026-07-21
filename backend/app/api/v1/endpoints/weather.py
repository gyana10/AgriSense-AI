from fastapi import APIRouter
from ai_models.weather.src.predict import predict_weather_intelligence

router = APIRouter()

@router.get("/intelligence")
def get_weather_intelligence(location: str = "Bhubaneswar, Odisha", temp: float = 29.5, humidity: float = 78.0, rainfall: float = 5.0):
    """Returns weather forecast, disease/pest risk scoring, and smart irrigation advice."""
    return predict_weather_intelligence(location, temp, humidity, rainfall)
