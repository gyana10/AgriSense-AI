import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from ai_models.common.config import RANDOM_STATE, TEST_SIZE

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Removes duplicate rows and handles missing values."""
    df_clean = df.drop_duplicates().copy()
    numeric_cols = df_clean.select_dtypes(include=[np.number]).columns
    df_clean[numeric_cols] = df_clean[numeric_cols].fillna(df_clean[numeric_cols].median())
    categorical_cols = df_clean.select_dtypes(include=['object', 'category']).columns
    for col in categorical_cols:
        df_clean[col] = df_clean[col].fillna(df_clean[col].mode()[0] if not df_clean[col].mode().empty else "Unknown")
    return df_clean

def prepare_train_test_split(X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE, stratify=None):
    """Splits data into train and test sets."""
    return train_test_split(X, y, test_size=test_size, random_state=random_state, stratify=stratify)

def scale_features(X_train, X_test=None, scaler=None):
    """Scales numerical features using StandardScaler."""
    if scaler is None:
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
    else:
        X_train_scaled = scaler.transform(X_train)
        
    if X_test is not None:
        X_test_scaled = scaler.transform(X_test)
        return X_train_scaled, X_test_scaled, scaler
    return X_train_scaled, scaler
