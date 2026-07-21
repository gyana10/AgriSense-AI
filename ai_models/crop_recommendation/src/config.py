from pathlib import Path
from ai_models.common.config import AI_MODELS_DIR, DATASETS_DIR, RANDOM_STATE, TEST_SIZE

MODULE_DIR = AI_MODELS_DIR / "crop_recommendation"
DATASET_PATH = DATASETS_DIR / "Crop_recommendation.csv"

TRAINED_MODELS_DIR = MODULE_DIR / "trained_models"
OUTPUTS_DIR = MODULE_DIR / "outputs"

MODEL_PATH = TRAINED_MODELS_DIR / "best_crop_model.joblib"
LABEL_ENCODER_PATH = TRAINED_MODELS_DIR / "label_encoder.joblib"
SCALER_PATH = TRAINED_MODELS_DIR / "scaler.joblib"
METRICS_PATH = OUTPUTS_DIR / "metrics.json"

FEATURE_NAMES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
TARGET_NAME = "label"