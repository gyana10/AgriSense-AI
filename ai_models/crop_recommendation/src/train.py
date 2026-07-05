import time
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from catboost import CatBoostClassifier

from preprocess import preprocess
from config import MODEL_DIR


X_train, X_test, y_train, y_test, encoder = preprocess()


models = {
    "Random Forest": RandomForestClassifier(
        random_state=42
    ),

    "XGBoost": XGBClassifier(
        random_state=42,
        eval_metric="mlogloss"
    ),

    "LightGBM": LGBMClassifier(
        random_state=42
    ),

    "CatBoost": CatBoostClassifier(
        verbose=False,
        random_state=42
    )
}


results = []

best_model = None
best_accuracy = 0


for name, model in models.items():

    print("=" * 60)
    print(f"Training {name}")

    start = time.time()

    model.fit(X_train, y_train)

    train_time = time.time() - start

    prediction = model.predict(X_test)

    accuracy = accuracy_score(
        y_test,
        prediction
    )

    print(f"Accuracy : {accuracy:.4f}")
    print(f"Training Time : {train_time:.2f} sec")

    results.append({
        "Model": name,
        "Accuracy": accuracy,
        "Training Time": train_time
    })

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model


results = pd.DataFrame(results)

print("\n")
print(results)

joblib.dump(
    best_model,
    MODEL_DIR / "best_crop_model.joblib"
)

joblib.dump(
    encoder,
    MODEL_DIR / "label_encoder.joblib"
)

print("\nBest Model Saved Successfully")