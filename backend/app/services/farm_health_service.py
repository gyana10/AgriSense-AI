from app.schemas.system import FarmHealthScoreResponse

class FarmHealthService:
    def calculate_farm_health_score(
        self,
        soil_fertility_index: float = 78.5,
        disease_detected: bool = False,
        pest_infestation: bool = False,
        weather_risk_level: str = "Low",
        yield_efficiency: float = 90.0
    ) -> FarmHealthScoreResponse:
        
        # Weighted Score Synthesis
        soil_sub = min(100, int(soil_fertility_index))
        disease_sub = 95 if not disease_detected else 45
        pest_sub = 90 if not pest_infestation else 50
        weather_sub = 95 if weather_risk_level == "Low" else (70 if weather_risk_level == "Moderate" else 40)
        yield_sub = min(100, int(yield_efficiency))
        
        health_score = int(
            (soil_sub * 0.25) +
            (disease_sub * 0.20) +
            (pest_sub * 0.20) +
            (weather_sub * 0.15) +
            (yield_sub * 0.20)
        )
        
        if health_score >= 85:
            rating = "Excellent"
            actions = [
                "Maintain current optimal fertigation schedule.",
                "Conduct routine bi-weekly field scout for pest eggs.",
                "Apply micro-nutrient foliar spray after next irrigation."
            ]
        elif health_score >= 70:
            rating = "Good"
            actions = [
                "Apply bio-fertilizer (Azotobacter/PSB) to improve nitrogen uptake.",
                "Inspect lower leaves for early fungal spot symptoms.",
                "Ensure drainage channels are clear before forecasted rain."
            ]
        elif health_score >= 50:
            rating = "Fair"
            actions = [
                "Immediate neem oil (1500 ppm) foliar application required.",
                "Soil pH adjustment required with agricultural lime.",
                "Top-dress with potassium sulfate to mitigate water stress."
            ]
        else:
            rating = "Poor"
            actions = [
                "URGENT: Apply systemic fungicide (Metalaxyl + Mancozeb).",
                "Deploy pheromone traps for pest outbreak control.",
                "Schedule emergency agronomic field audit."
            ]

        return FarmHealthScoreResponse(
            health_score=health_score,
            rating=rating,
            sub_scores={
                "soil_health": soil_sub,
                "crop_disease_protection": disease_sub,
                "pest_management": pest_sub,
                "weather_resilience": weather_sub,
                "yield_performance": yield_sub
            },
            recommended_actions=actions
        )

farm_health_service = FarmHealthService()
