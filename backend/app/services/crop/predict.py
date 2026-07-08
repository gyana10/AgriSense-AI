from pathlib import Path

import joblib
import pandas as pd

MODEL_DIR = (
    Path(__file__).resolve().parents[2]
    / "ml_models"
    / "crop"
)

model = joblib.load(MODEL_DIR / "best_crop_model.joblib")
encoder = joblib.load(MODEL_DIR / "label_encoder.joblib")


def predict_crop(
    N,
    P,
    K,
    temperature,
    humidity,
    ph,
    rainfall,
):

    data = pd.DataFrame(
        [[
            N,
            P,
            K,
            temperature,
            humidity,
            ph,
            rainfall
        ]],
        columns=[
            "N",
            "P",
            "K",
            "temperature",
            "humidity",
            "ph",
            "rainfall",
        ],
    )

    prediction = model.predict(data)[0]

    crop = encoder.inverse_transform([prediction])[0]

    probabilities = model.predict_proba(data)[0]

    confidence = float(max(probabilities) * 100)

    top3 = sorted(
        zip(encoder.classes_, probabilities),
        key=lambda x: x[1],
        reverse=True,
    )[:3]

    return {
        "recommended_crop": crop,
        "confidence": round(confidence, 2),
        "top_3": [
            {
                "crop": crop_name,
                "confidence": round(float(prob) * 100, 2),
            }
            for crop_name, prob in top3
        ],
    }