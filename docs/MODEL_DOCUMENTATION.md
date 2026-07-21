# ML Model Documentation - AgriSense AI

## 1. Crop Recommendation Engine
- **Models Evaluated**: Random Forest, XGBoost, LightGBM, CatBoost.
- **Best Model Selected**: CatBoost Classifier.
- **Test Accuracy**: 99.77%
- **Cross-Validation Score**: 99.32% (5 Folds)
- **Artifacts**: `best_crop_model.joblib`, `label_encoder.joblib`, `scaler.joblib`.

## 2. Soil Fertility & SHAP Explainer
- **Model**: Random Forest Classifier + SHAP Impact Allocator.
- **Features**: N, P, K, pH, EC, Organic Carbon.
- **Explainability**: Quantifies feature importance and impact direction for every soil sample.

## 3. Crop Yield Regressor
- **Model**: Random Forest Regressor.
- **R² Score**: 0.965
- **RMSE**: 1.24

## 4. Computer Vision (YOLOv11)
- **Architecture**: YOLOv11 Vision Object Detection & Classification.
- **Leaf Diseases**: Early Blight, Late Blight, Bacterial Spot, Healthy.
- **Pests**: Fall Armyworm, Aphids, Whiteflies, Stem Borer.
- **mAP50**: 94.8%
