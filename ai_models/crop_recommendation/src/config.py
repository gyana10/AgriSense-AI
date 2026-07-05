from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]

DATASET_PATH = PROJECT_ROOT / "datasets" / "Crop_recommendation.csv"

MODEL_DIR = PROJECT_ROOT / "ai_models" / "crop_recommendation" / "trained_models"

OUTPUT_DIR = PROJECT_ROOT / "ai_models" / "crop_recommendation" / "outputs"

MODEL_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)