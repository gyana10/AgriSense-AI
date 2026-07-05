import json
import joblib
import matplotlib.pyplot as plt
import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

from preprocess import preprocess
from config import MODEL_DIR, OUTPUT_DIR


X_train, X_test, y_train, y_test, encoder = preprocess()

model = joblib.load(
    MODEL_DIR / "best_crop_model.joblib"
)

prediction = model.predict(X_test)

accuracy = accuracy_score(y_test, prediction)

print(f"Accuracy : {accuracy:.4f}")



report = classification_report(
    y_test,
    prediction,
    target_names=encoder.classes_
)

print(report)

with open(
    OUTPUT_DIR / "classification_report.txt",
    "w"
) as f:
    f.write(report)


cm = confusion_matrix(
    y_test,
    prediction
)

plt.figure(figsize=(12,10))

plt.imshow(cm)

plt.title("Confusion Matrix")

plt.colorbar()

plt.xlabel("Predicted")

plt.ylabel("Actual")

plt.tight_layout()

plt.savefig(
    OUTPUT_DIR / "confusion_matrix.png"
)

plt.close()



importance = model.feature_importances_

features = X_train.columns

importance_df = pd.DataFrame({
    "Feature": features,
    "Importance": importance
})

importance_df = importance_df.sort_values(
    by="Importance",
    ascending=False
)

importance_df.to_csv(
    OUTPUT_DIR / "feature_importance.csv",
    index=False
)

plt.figure(figsize=(8,5))

plt.bar(
    importance_df["Feature"],
    importance_df["Importance"]
)

plt.xticks(rotation=45)

plt.tight_layout()

plt.savefig(
    OUTPUT_DIR / "feature_importance.png"
)

plt.close()



metadata = {

    "Model": type(model).__name__,

    "Accuracy": float(accuracy),

    "Dataset Size": len(X_train) + len(X_test),

    "Features": list(features),

    "Classes": list(encoder.classes_)
}

with open(
    OUTPUT_DIR / "metadata.json",
    "w"
) as f:

    json.dump(
        metadata,
        f,
        indent=4
    )

print("\nEvaluation Complete.")