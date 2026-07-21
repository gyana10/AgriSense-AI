import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from xgboost import XGBRegressor
import joblib
import os


os.makedirs("models", exist_ok=True)


df = pd.read_csv("crop_yield.csv")


le_crop = LabelEncoder()
df['Crop'] = le_crop.fit_transform(df['Crop'])

le_season = LabelEncoder()
df['Season'] = le_season.fit_transform(df['Season'])

le_state = LabelEncoder()
df['State'] = le_state.fit_transform(df['State'])


X = df.drop(['Yield'], axis=1)
y = df['Yield']


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)


param_grid = {
    'n_estimators': [100, 300],
    'max_depth': [6, 10],
    'learning_rate': [0.05, 0.1],
    'subsample': [0.8, 1.0]
}

grid_search = GridSearchCV(
    estimator=XGBRegressor(objective='reg:squarederror', random_state=42),
    param_grid=param_grid,
    scoring='r2',
    cv=5,
    n_jobs=-1,
    verbose=1
)


grid_search.fit(X_train, y_train)


best_model = grid_search.best_estimator_


y_pred = best_model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print(f"MAE: {mae}")
print(f"MSE: {mse}")
print(f"R2 Score: {r2}")


joblib.dump(best_model, "models/crop_yield_model.pkl")
joblib.dump(scaler, "models/yield_scaler.pkl")
joblib.dump(le_crop, "models/crop_label_encoder.pkl")
joblib.dump(le_season, "models/season_label_encoder.pkl")
joblib.dump(le_state, "models/state_label_encoder.pkl")

print("\n Model, scaler, and label encoders saved in 'models/' folder successfully!")
