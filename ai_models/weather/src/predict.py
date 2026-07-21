from ai_models.weather.src.preprocess import compute_weather_risks
from ai_models.weather.src.evaluate import evaluate_irrigation_urgency

class WeatherIntelligencePredictor:
    def predict(self, location: str = "Bhubaneswar, Odisha", temp: float = 29.5, humidity: float = 78.0, rainfall: float = 5.0, wind_speed: float = 12.0) -> dict:
        disease_risk, pest_risk, water_stress = compute_weather_risks(temp, humidity, rainfall)
        urgency = evaluate_irrigation_urgency(water_stress, temp)
        
        needs_irrigation = "Irrigation Required" in water_stress
        duration_minutes = 45 if needs_irrigation and temp > 32 else (30 if needs_irrigation else 0)
        best_time = "Early Morning (06:00 AM - 08:00 AM)" if needs_irrigation else "N/A"
        
        return {
            "location": location,
            "current_weather": {
                "temperature_c": temp,
                "humidity_percent": humidity,
                "rainfall_mm": rainfall,
                "wind_speed_kmh": wind_speed,
                "uv_index": 6.5
            },
            "risk_assessments": {
                "disease_risk": disease_risk,
                "pest_risk": pest_risk,
                "water_stress": water_stress
            },
            "irrigation_advice": {
                "needs_irrigation": needs_irrigation,
                "urgency": urgency,
                "recommended_duration_minutes": duration_minutes,
                "best_time_to_water": best_time
            },
            "forecast_7_days": [
                {"day": "Today", "temp": temp, "rain_probability": 20 if rainfall < 10 else 80, "condition": "Partly Cloudy"},
                {"day": "Tomorrow", "temp": temp + 1.0, "rain_probability": 15, "condition": "Sunny"},
                {"day": "Day 3", "temp": temp - 0.5, "rain_probability": 60, "condition": "Light Rain"},
                {"day": "Day 4", "temp": temp - 1.5, "rain_probability": 75, "condition": "Thunderstorms"},
                {"day": "Day 5", "temp": temp + 0.5, "rain_probability": 10, "condition": "Clear"},
                {"day": "Day 6", "temp": temp + 2.0, "rain_probability": 5, "condition": "Sunny"},
                {"day": "Day 7", "temp": temp + 1.5, "rain_probability": 10, "condition": "Partly Cloudy"}
            ]
        }

weather_predictor = WeatherIntelligencePredictor()

def predict_weather_intelligence(location: str = "Bhubaneswar, Odisha", temp: float = 29.5, humidity: float = 78.0, rainfall: float = 5.0, wind_speed: float = 12.0) -> dict:
    return weather_predictor.predict(location, temp, humidity, rainfall, wind_speed)
