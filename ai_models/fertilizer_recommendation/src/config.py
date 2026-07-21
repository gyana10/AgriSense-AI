from pathlib import Path
from ai_models.common.config import AI_MODELS_DIR, DATASETS_DIR

MODULE_DIR = AI_MODELS_DIR / "fertilizer_recommendation"
TRAINED_MODELS_DIR = MODULE_DIR / "trained_models"
OUTPUTS_DIR = MODULE_DIR / "outputs"

MODEL_PATH = TRAINED_MODELS_DIR / "fertilizer_model.joblib"
METRICS_PATH = OUTPUTS_DIR / "metrics.json"

FEATURE_NAMES = ["crop", "nitrogen", "phosphorus", "potassium", "soil_type"]
TARGET_NAME = "fertilizer"

ORGANIC_ALTERNATIVES = {
    "Urea": "Neem-coated compost / Vermicompost with Azotobacter",
    "DAP": "Rock phosphate with Bio-fertilizer (PSB) & Farm Yard Manure",
    "14-35-14": "Enriched organic compost with bone meal and ash",
    "28-28": "Balanced poultry manure with bone dust",
    "17-17-17": "Well-rotted farmyard manure (FYM) with seaweed extract",
    "20-20": "Compost tea enriched with rock phosphate",
    "10-26-26": "Wood ash mixed with composted cattle manure"
}
