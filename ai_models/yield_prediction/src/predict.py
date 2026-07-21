from ai_models.yield_prediction.src.config import MODEL_PATH
from ai_models.yield_prediction.src.preprocess import estimate_revenue_inr
from ai_models.yield_prediction.src.utils import load_artifact

class YieldPredictor:
    def __init__(self):
        try:
            self.model = load_artifact(MODEL_PATH)
        except Exception:
            self.model = None

    def predict(self, state: str, district: str, crop: str, season: str, area_hectares: float, rainfall: float = 1000.0) -> dict:
        """Predicts Yield per hectare, Total Production, and Estimated Revenue in INR."""
        # Yield heuristics per crop baseline
        baseline_yields = {
            "rice": 3.8,
            "wheat": 3.2,
            "maize": 4.5,
            "cotton": 2.1,
            "sugarcane": 70.0,
            "potato": 22.0,
            "pulses": 1.2,
            "banana": 40.0
        }
        
        crop_key = crop.lower() if isinstance(crop, str) else "rice"
        base_yield = baseline_yields.get(crop_key, 2.8)
        
        # Environmental modulation factor
        rf_factor = min(1.25, max(0.75, rainfall / 1000.0))
        yield_tons_per_ha = round(float(base_yield * rf_factor), 2)
        total_production_tons = round(float(yield_tons_per_ha * area_hectares), 2)
        estimated_revenue_inr = estimate_revenue_inr(crop, total_production_tons)
        
        return {
            "yield_tons_per_ha": yield_tons_per_ha,
            "total_production_tons": total_production_tons,
            "estimated_revenue_inr": estimated_revenue_inr,
            "currency": "INR",
            "metadata": {
                "state": state,
                "district": district,
                "crop": crop,
                "season": season,
                "area_hectares": area_hectares,
                "rainfall_mm": rainfall
            }
        }

yield_predictor = YieldPredictor()

def predict_yield(state: str, district: str, crop: str, season: str, area_hectares: float, rainfall: float = 1000.0) -> dict:
    return yield_predictor.predict(state, district, crop, season, area_hectares, rainfall)
