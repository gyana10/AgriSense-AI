import pandas as pd
import numpy as np
import pickle
import json
import os
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error

def mean_absolute_percentage_error(y_true, y_pred):
    return np.mean(np.abs((y_true - y_pred) / (y_true + 1e-8))) * 100

print("Starting High-Performance Crop Yield Prediction Model Training using Random Forest")

TARGET_COLUMN = 'Avg Yield'
os.makedirs('models', exist_ok=True)


df = pd.read_csv('Odisha_Crop_Yield_Dataset_Enhanced.csv')


df['Temp_Range'] = df['Max_Temperature_C'] - df['Min_Temperature_C']
df.drop(['State', 'Rainfall (mm)', 'Temperature'], axis=1, inplace=True)


df.dropna(subset=[TARGET_COLUMN], inplace=True)


X = df.drop(TARGET_COLUMN, axis=1)
y = np.log1p(df[TARGET_COLUMN])  

categorical_features = X.select_dtypes(include=['object']).columns.tolist()
numerical_features = X.select_dtypes(include=np.number).columns.tolist()

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numerical_features),
    ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


param_grid = {
    'regressor__n_estimators': [500, 800, 1000],
    'regressor__max_depth': [20, 30, None],
    'regressor__min_samples_split': [5, 10],
    'regressor__min_samples_leaf': [1, 2, 4],
    'regressor__max_features': ['sqrt', 'log2']
}

pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('regressor', RandomForestRegressor(random_state=42, n_jobs=-1))
])


grid_search = GridSearchCV(
    pipeline,
    param_grid=param_grid,
    cv=5,
    scoring='r2',
    n_jobs=-1,
    verbose=2
)

print("Performing grid search for best hyperparameters (this may take time)...")
grid_search.fit(X_train, y_train)

best_model = grid_search.best_estimator_
print(f"Best hyperparameters found: {grid_search.best_params_}")


y_pred_transformed = best_model.predict(X_test)
y_test_original = np.expm1(y_test)
y_pred_original = np.expm1(y_pred_transformed)

r2 = r2_score(y_test_original, y_pred_original)
rmse = np.sqrt(mean_squared_error(y_test_original, y_pred_original))
mae = mean_absolute_error(y_test_original, y_pred_original)
mape = mean_absolute_percentage_error(y_test_original, y_pred_original)

performance_metrics = {
    'R-squared': round(r2, 4),
    'RMSE': round(rmse, 4),
    'MAE': round(mae, 4)
}

print("\nFinal Model Performance Metrics:")
print(f"R-squared: {performance_metrics['R-squared']}")
print(f"RMSE: {performance_metrics['RMSE']} Q/Ha")
print(f"MAE: {performance_metrics['MAE']} Q/Ha")


with open('models/Random_Forest_Best.pkl', 'wb') as f_model:
    pickle.dump(best_model, f_model)

with open('models/random_forest_performance.json', 'w') as f_metrics:
    json.dump(performance_metrics, f_metrics, indent=4)

print("\nModel and performance metrics saved successfully.")
print("Crop Yield Prediction Model Training Completed.")
