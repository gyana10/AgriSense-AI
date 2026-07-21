import json
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score

try:
    import xgboost as xgb
except ImportError:
    xgb = None

try:
    import lightgbm as lgb
except ImportError:
    lgb = None

try:
    import catboost as cb
except ImportError:
    cb = None

from ai_models.common.explainer import calculate_feature_importance
from ai_models.crop_recommendation.src.config import (
    MODEL_PATH, LABEL_ENCODER_PATH, SCALER_PATH, METRICS_PATH, FEATURE_NAMES
)
from ai_models.crop_recommendation.src.preprocess import load_and_preprocess_crop_data
from ai_models.crop_recommendation.src.evaluate import evaluate_classifier_model
from ai_models.crop_recommendation.src.utils import logger, save_artifact, save_metrics

def train_and_select_best_model():
    """Trains multiple classifiers, compares performance, saves the best model & artifacts."""
    logger.info("Loading crop dataset and preprocessing...")
    X_train, X_test, y_train, y_test, label_encoder, scaler, raw_df = load_and_preprocess_crop_data()
    
    candidate_models = {
        "RandomForest": RandomForestClassifier(n_estimators=100, random_state=42)
    }
    
    if xgb:
        candidate_models["XGBoost"] = xgb.XGBClassifier(random_state=42, eval_metric="mlogloss")
    if lgb:
        candidate_models["LightGBM"] = lgb.LGBMClassifier(random_state=42, verbose=-1)
    if cb:
        candidate_models["CatBoost"] = cb.CatBoostClassifier(random_state=42, verbose=0)
        
    best_model_name = None
    best_score = -1.0
    best_model = None
    comparison_results = {}
    
    logger.info(f"Comparing candidate models: {list(candidate_models.keys())}")
    for name, model in candidate_models.items():
        model.fit(X_train, y_train)
        cv_scores = cross_val_score(model, X_train, y_train, cv=5)
        mean_cv = float(np.mean(cv_scores))
        
        eval_dict = evaluate_classifier_model(model, X_test, y_test)
        test_acc = eval_dict["accuracy"]
        
        comparison_results[name] = {
            "mean_cv_accuracy": round(mean_cv, 4),
            "test_accuracy": test_acc
        }
        logger.info(f"Model: {name} | CV Acc: {mean_cv:.4f} | Test Acc: {test_acc:.4f}")
        
        if test_acc > best_score:
            best_score = test_acc
            best_model_name = name
            best_model = model

    logger.info(f"Best model selected: {best_model_name} with Test Accuracy: {best_score:.4f}")
    
    # Save artifacts
    save_artifact(best_model, MODEL_PATH)
    save_artifact(label_encoder, LABEL_ENCODER_PATH)
    save_artifact(scaler, SCALER_PATH)
    
    feat_importances = calculate_feature_importance(best_model, FEATURE_NAMES)
    
    summary_metrics = {
        "best_model": best_model_name,
        "best_accuracy": best_score,
        "model_comparison": comparison_results,
        "feature_importance": feat_importances
    }
    save_metrics(summary_metrics, METRICS_PATH)
    logger.info("Crop recommendation training pipeline completed successfully!")
    return best_model, label_encoder, scaler, summary_metrics

if __name__ == "__main__":
    train_and_select_best_model()