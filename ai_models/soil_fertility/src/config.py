from pathlib import Path
from ai_models.common.config import AI_MODELS_DIR

MODULE_DIR = AI_MODELS_DIR / "soil_fertility"
TRAINED_MODELS_DIR = MODULE_DIR / "trained_models"
OUTPUTS_DIR = MODULE_DIR / "outputs"

MODEL_PATH = TRAINED_MODELS_DIR / "soil_fertility_model.joblib"
METRICS_PATH = OUTPUTS_DIR / "metrics.json"

FEATURE_NAMES = ["N", "P", "K", "ph", "ec", "organic_carbon"]
TARGET_CLASSES = ["Low", "Medium", "High"]
