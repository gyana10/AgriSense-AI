import pandas as pd
from sklearn.preprocessing import LabelEncoder
from ai_models.common.preprocess import clean_data, prepare_train_test_split, scale_features
from ai_models.crop_recommendation.src.config import FEATURE_NAMES, TARGET_NAME, DATASET_PATH

def load_and_preprocess_crop_data(data_path=DATASET_PATH):
    """Loads, cleans, encodes target labels, and splits crop recommendation dataset."""
    df = pd.read_csv(data_path)
    df = clean_data(df)
    
    X = df[FEATURE_NAMES]
    y_raw = df[TARGET_NAME]
    
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_raw)
    
    X_train, X_test, y_train, y_test = prepare_train_test_split(X, y, stratify=y)
    X_train_scaled, X_test_scaled, scaler = scale_features(X_train, X_test)
    
    return X_train_scaled, X_test_scaled, y_train, y_test, label_encoder, scaler, X