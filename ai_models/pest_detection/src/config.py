from pathlib import Path
from ai_models.common.config import AI_MODELS_DIR

MODULE_DIR = AI_MODELS_DIR / "pest_detection"
TRAINED_MODELS_DIR = MODULE_DIR / "trained_models"
OUTPUTS_DIR = MODULE_DIR / "outputs"

MODEL_PATH = TRAINED_MODELS_DIR / "yolov11_pest.pt"
METRICS_PATH = OUTPUTS_DIR / "metrics.json"

PEST_DATABASE = {
    "Fall Armyworm": {
        "pest": "Fall Armyworm (Spodoptera frugiperda)",
        "severity": "High",
        "organic_treatment": "Release Trichogramma egg parasitoids (50,000/ha) or apply Neem-based EC 1500 ppm.",
        "chemical_treatment": "Spray Emamectin benzoate 5% SG (0.4g/L) or Spinetoram 11.7% SC."
    },
    "Aphids": {
        "pest": "Aphids (Aphidoidea)",
        "severity": "Moderate",
        "organic_treatment": "Spray insecticidal soap solution or release Ladybird beetles.",
        "chemical_treatment": "Foliar application of Imidacloprid 17.8 SL (0.5ml/L) or Thiamethoxam."
    },
    "Whiteflies": {
        "pest": "Whiteflies (Bemisia tabaci)",
        "severity": "Moderate",
        "organic_treatment": "Deploy yellow sticky traps (25/ha) and spray neem oil (5ml/L).",
        "chemical_treatment": "Spray Diafenthiuron 50% WP or Spiromesifen 22.9% SC."
    },
    "Stem Borer": {
        "pest": "Yellow Stem Borer (Scirpophaga incertulas)",
        "severity": "High",
        "organic_treatment": "Install Pheromone traps (12/ha) to monitor adult moths.",
        "chemical_treatment": "Apply Chlorantraniliprole 0.4% GR (4kg/acre) or Cartap Hydrochloride."
    }
}
