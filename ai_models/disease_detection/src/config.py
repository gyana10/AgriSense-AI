from pathlib import Path
from ai_models.common.config import AI_MODELS_DIR

MODULE_DIR = AI_MODELS_DIR / "disease_detection"
TRAINED_MODELS_DIR = MODULE_DIR / "trained_models"
OUTPUTS_DIR = MODULE_DIR / "outputs"

MODEL_PATH = TRAINED_MODELS_DIR / "yolov11_disease.pt"
METRICS_PATH = OUTPUTS_DIR / "metrics.json"

DISEASE_TREATMENT_DATABASE = {
    "Tomato Early Blight": {
        "disease": "Tomato Early Blight (Alternaria solani)",
        "severity": "Moderate",
        "organic_treatment": "Apply Neem oil (3ml/L) or copper-based fungicide spray every 7 days.",
        "chemical_treatment": "Foliar spray with Mancozeb (2g/L) or Chlorothalonil (2g/L).",
        "preventive_actions": "Remove infected bottom leaves, avoid overhead watering, rotate crops annually."
    },
    "Tomato Late Blight": {
        "disease": "Tomato Late Blight (Phytophthora infestans)",
        "severity": "High",
        "organic_treatment": "Apply copper hydroxide spray immediately; prune infected shoots.",
        "chemical_treatment": "Spray Metalaxyl + Mancozeb (2.5g/L) or Dimethomorph.",
        "preventive_actions": "Ensure wide plant spacing for airflow, remove crop residue."
    },
    "Potato Early Blight": {
        "disease": "Potato Early Blight",
        "severity": "Moderate",
        "organic_treatment": "Bordeaux mixture (1%) application at early sign of dark concentric rings.",
        "chemical_treatment": "Propineb or Azoxystrobin spray.",
        "preventive_actions": "Plant certified disease-free tubers, maintain optimal soil potassium."
    },
    "Potato Late Blight": {
        "disease": "Potato Late Blight",
        "severity": "Critical",
        "organic_treatment": "Remove and destroy blighted foliage 2 weeks before harvest.",
        "chemical_treatment": "Cymoxanil + Mancozeb spray.",
        "preventive_actions": "Avoid waterlogging, apply preventative fungicide during humid weather."
    },
    "Pepper Bell Bacterial Spot": {
        "disease": "Pepper Bell Bacterial Spot (Xanthomonas campestris)",
        "severity": "High",
        "organic_treatment": "Spray streptomycin sulfate with copper oxychloride.",
        "chemical_treatment": "Copper hydroxide combined with bactericide.",
        "preventive_actions": "Use treated seeds, sanitize farming equipment."
    },
    "Healthy": {
        "disease": "Healthy Leaf",
        "severity": "None",
        "organic_treatment": "No treatment required. Maintain balanced irrigation.",
        "chemical_treatment": "None required.",
        "preventive_actions": "Continue regular monitoring and balanced fertilization."
    }
}
