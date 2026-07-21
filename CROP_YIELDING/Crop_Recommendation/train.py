import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


df = pd.read_csv("Crop_recommendation (1).csv")

X = df.drop(columns=['label'])
y = df['label']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(random_state=42, n_jobs=-1))
])

param_distributions = {
    'classifier__n_estimators': [300, 500, 800, 1000],
    'classifier__max_depth': [15, 20, 25, None],
    'classifier__min_samples_split': [2, 5, 10],
    'classifier__min_samples_leaf': [1, 2, 4],
    'classifier__max_features': ['sqrt', 'log2']
}
random_search = RandomizedSearchCV(
    pipeline,
    param_distributions=param_distributions,
    n_iter=30,
    cv=5,
    scoring='accuracy',
    n_jobs=-1,
    verbose=2,
    random_state=42
)


print("Training optimized Random Forest model...")
random_search.fit(X_train, y_train)

best_model = random_search.best_estimator_
print("Best Hyperparameters:", random_search.best_params_)


y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\nFinal Model Accuracy: {accuracy:.4f}")
print("\nClassification Report:\n", classification_report(y_test, y_pred))
print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))


import os
os.makedirs("models", exist_ok=True)
with open("models/Crop_Recommendation_RF.pkl", "wb") as f:
    pickle.dump(best_model, f)

print(" Model training completed and saved as 'models/Crop_Recommendation_RF.pkl'")
