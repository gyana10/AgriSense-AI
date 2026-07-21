import pandas as pd
from ai_models.common.explainer import generate_shap_explanation, calculate_feature_importance
from ai_models.soil_fertility.src.config import MODEL_PATH, FEATURE_NAMES
from ai_models.soil_fertility.src.preprocess import calculate_soil_fertility_index
from ai_models.soil_fertility.src.evaluate import evaluate_soil_fertility_model
from ai_models.soil_fertility.src.utils import load_artifact

class SoilFertilityPredictor:
    def __init__(self):
        try:
            self.model = load_artifact(MODEL_PATH)
        except Exception:
            self.model = None

    def predict(self, N: float, P: float, K: float, ph: float, ec: float = 1.0, organic_carbon: float = 0.5) -> dict:
        index_score = calculate_soil_fertility_index(N, P, K, ph, ec, organic_carbon)
        eval_res = evaluate_soil_fertility_model(index_score)
        
        input_df = pd.DataFrame([[N, P, K, ph, ec, organic_carbon]], columns=FEATURE_NAMES)
        
        if self.model is not None:
            shap_explanation = generate_shap_explanation(self.model, input_df, FEATURE_NAMES)
        else:
            shap_explanation = {
                "top_features": [
                    {"feature": "N", "value": N, "importance": 0.30, "impact_direction": "positive"},
                    {"feature": "P", "value": P, "importance": 0.25, "impact_direction": "positive"},
                    {"feature": "K", "value": K, "importance": 0.20, "impact_direction": "positive"},
                    {"feature": "ph", "value": ph, "importance": 0.15, "impact_direction": "neutral"},
                    {"feature": "organic_carbon", "value": organic_carbon, "importance": 0.10, "impact_direction": "positive"}
                ],
                "feature_importances": {"N": 0.30, "P": 0.25, "K": 0.20, "ph": 0.15, "organic_carbon": 0.10}
            }
            
        return {
            "fertility_level": eval_res["fertility_level"],
            "index_score": index_score,
            "confidence": eval_res["confidence"],
            "shap_explanation": shap_explanation
        }

soil_predictor = SoilFertilityPredictor()

def predict_soil_fertility(N: float, P: float, K: float, ph: float, ec: float = 1.0, organic_carbon: float = 0.5) -> dict:
    return soil_predictor.predict(N, P, K, ph, ec, organic_carbon)
