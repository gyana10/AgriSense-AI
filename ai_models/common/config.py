import os
from pathlib import Path

# Base paths
BASE_DIR = Path(__file__).resolve().parent.parent.parent
AI_MODELS_DIR = BASE_DIR / "ai_models"
DATASETS_DIR = BASE_DIR / "datasets"

# ML Config Defaults
RANDOM_STATE = 42
TEST_SIZE = 0.2
CV_FOLDS = 5

# Supported Model Registry Names
SUPPORTED_CLASSIFIERS = ["RandomForest", "XGBoost", "LightGBM", "CatBoost"]
SUPPORTED_REGRESSORS = ["RandomForest", "XGBoost", "LightGBM", "CatBoost"]
