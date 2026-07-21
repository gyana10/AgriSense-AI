from pathlib import Path
from ai_models.common.config import AI_MODELS_DIR, BASE_DIR

MODULE_DIR = AI_MODELS_DIR / "yield_prediction"
RAW_DATASET_PATH = BASE_DIR / "CROP_YIELDING" / "crop_yield.csv"

TRAINED_MODELS_DIR = MODULE_DIR / "trained_models"
OUTPUTS_DIR = MODULE_DIR / "outputs"

MODEL_PATH = TRAINED_MODELS_DIR / "best_yield_regressor.joblib"
METRICS_PATH = OUTPUTS_DIR / "metrics.json"

FEATURE_NAMES = ["Crop", "Crop_Year", "Season", "State", "Area", "Production", "Annual_Rainfall", "Fertilizer", "Pesticide"]
TARGET_NAME = "Yield"
