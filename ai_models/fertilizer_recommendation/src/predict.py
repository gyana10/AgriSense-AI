from ai_models.fertilizer_recommendation.src.preprocess import calculate_npk_deficit
from ai_models.fertilizer_recommendation.src.config import ORGANIC_ALTERNATIVES

class FertilizerPredictor:
    def predict(self, crop: str, N: float, P: float, K: float, soil_type: str = "Loamy") -> dict:
        defic_N, defic_P, defic_K = calculate_npk_deficit(crop, N, P, K)
        
        if defic_N > defic_P and defic_N > defic_K:
            best_fert = "Urea"
        elif defic_P > defic_N and defic_P > defic_K:
            best_fert = "DAP"
        elif defic_K > defic_N and defic_K > defic_P:
            best_fert = "10-26-26"
        elif defic_N > 0 and defic_P > 0:
            best_fert = "28-28"
        else:
            best_fert = "17-17-17"
            
        organic_alt = ORGANIC_ALTERNATIVES.get(best_fert, "Enriched organic compost & Bio-fertilizers")
        
        schedule = [
            {"stage": "Basal Application (At Planting)", "dose": "50% Recommended Dose", "method": "Soil Incorporation"},
            {"stage": "Vegetative Growth Stage (30 Days)", "dose": "25% Recommended Dose", "method": "Foliar Spray or Side Dressing"},
            {"stage": "Flowering / Grain Filling (60 Days)", "dose": "25% Recommended Dose", "method": "Top Dressing with Irrigation"}
        ]
        
        return {
            "recommended_fertilizer": best_fert,
            "organic_alternative": organic_alt,
            "application_schedule": schedule,
            "deficits": {
                "nitrogen_deficit": round(defic_N, 2),
                "phosphorus_deficit": round(defic_P, 2),
                "potassium_deficit": round(defic_K, 2)
            }
        }

fertilizer_predictor = FertilizerPredictor()

def predict_fertilizer(crop: str, N: float, P: float, K: float, soil_type: str = "Loamy") -> dict:
    return fertilizer_predictor.predict(crop, N, P, K, soil_type)
