from sklearn.ensemble import RandomForestClassifier
import numpy as np
import pandas as pd
from ai_models.soil_fertility.src.config import MODEL_PATH, METRICS_PATH, FEATURE_NAMES
from ai_models.soil_fertility.src.utils import logger, save_artifact, save_metrics

def train_soil_fertility_model():
    """Trains a Random Forest Soil Fertility Classifier with SHAP explainability support."""
    logger.info("Generating synthetic calibration soil data...")
    np.random.seed(42)
    N = np.random.uniform(10, 250, 500)
    P = np.random.uniform(5, 120, 500)
    K = np.random.uniform(10, 300, 500)
    ph = np.random.uniform(4.5, 9.0, 500)
    ec = np.random.uniform(0.1, 4.0, 500)
    oc = np.random.uniform(0.1, 1.5, 500)
    
    X = pd.DataFrame({"N": N, "P": P, "K": K, "ph": ph, "ec": ec, "organic_carbon": oc})
    scores = (X["N"]/250*25) + (X["P"]/120*20) + (X["K"]/300*20) + ((9.0-np.abs(X["ph"]-6.5))/9.0*15) + (X["organic_carbon"]/1.5*20)
    y = np.where(scores >= 65, "High", np.where(scores >= 45, "Medium", "Low"))
    
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, y)
    
    save_artifact(clf, MODEL_PATH)
    metrics = {
        "model": "RandomForestClassifier",
        "training_samples": 500,
        "classes": ["Low", "Medium", "High"]
    }
    save_metrics(metrics, METRICS_PATH)
    logger.info("Soil fertility training pipeline completed successfully.")
    return clf

if __name__ == "__main__":
    train_soil_fertility_model()
