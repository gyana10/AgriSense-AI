import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error, r2_score
import joblib
import os

os.makedirs("models", exist_ok=True)

df = pd.read_csv("full_merged_crop_data.csv")

X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']


label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)


scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)


X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)


crop_model = RandomForestClassifier(n_estimators=500, max_depth=15, random_state=42)
crop_model.fit(X_train, y_train)


y_pred = crop_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\nCrop Prediction Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=label_encoder.classes_))


joblib.dump(crop_model, "models/crop_prediction_model.pkl")
joblib.dump(label_encoder, "models/crop_label_encoder.pkl")
joblib.dump(scaler, "models/crop_scaler.pkl")


df['fertility_score'] = 0.5 * df['N'] + 0.3 * df['P'] + 0.2 * df['K'] + df['ph']
y_fertility = df['fertility_score']


Xf_train, Xf_test, yf_train, yf_test = train_test_split(
    X_scaled, y_fertility, test_size=0.2, random_state=42
)


fertility_model = RandomForestRegressor(n_estimators=500, max_depth=15, random_state=42)
fertility_model.fit(Xf_train, yf_train)


yf_pred = fertility_model.predict(Xf_test)
mse = mean_squared_error(yf_test, yf_pred)
r2 = r2_score(yf_test, yf_pred)

print(f"\nFertility Prediction MSE: {mse:.4f}")
print(f"Fertility Prediction R² Score: {r2:.4f}")


joblib.dump(fertility_model, "models/fertility_prediction_model.pkl")

print("\n Models saved successfully in 'models/' directory:")
print("- crop_prediction_model.pkl")
print("- crop_label_encoder.pkl")
print("- crop_scaler.pkl")
print("- fertility_prediction_model.pkl")
