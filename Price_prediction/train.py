import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
from xgboost import XGBRegressor
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
import joblib


df = pd.read_csv("Odisha_Price_Prediction_Final.csv")


df["Year_num"] = df["Year"].str[:4].astype(int)


X = df.drop(columns=["modal_price", "Year"])
y = df["modal_price"]


numeric_features = ["Avg Yield", "min_price", "max_price", "Year_num"]
categorical_features = ["District", "Crop"]

numeric_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_transformer = Pipeline(steps=[
    ("imputer", SimpleImputer(strategy="constant", fill_value="missing")),
    ("onehot", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
])

preprocessor = ColumnTransformer(
    transformers=[
        ("num", numeric_transformer, numeric_features),
        ("cat", categorical_transformer, categorical_features)
    ]
)


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


models = {
    "GradientBoosting": {
        "model": GradientBoostingRegressor(random_state=42),
        "params": {
            "model__n_estimators": [100, 200, 300],
            "model__max_depth": [3, 5, 7],
            "model__learning_rate": [0.05, 0.1, 0.2]
        }
    },
    "RandomForest": {
        "model": RandomForestRegressor(random_state=42),
        "params": {
            "model__n_estimators": [100, 200, 300],
            "model__max_depth": [None, 5, 10],
            "model__min_samples_split": [2, 5, 10]
        }
    },
    "XGBoost": {
        "model": XGBRegressor(objective="reg:squarederror", random_state=42, n_jobs=-1),
        "params": {
            "model__n_estimators": [100, 200, 300],
            "model__max_depth": [3, 5, 7],
            "model__learning_rate": [0.05, 0.1, 0.2],
            "model__subsample": [0.7, 0.8, 1.0],
            "model__colsample_bytree": [0.7, 0.8, 1.0]
        }
    }
}

best_models = {}


for name, m in models.items():
    print(f"\n🔹 Training {name}...")
    pipeline = Pipeline(steps=[("preprocessor", preprocessor), ("model", m["model"])])
    
    grid = GridSearchCV(
        pipeline, m["params"], cv=3, scoring="r2", n_jobs=-1, verbose=2
    )
    
    grid.fit(X_train, y_train)
    
    print(f"✅ {name} Best parameters: {grid.best_params_}")
    print(f"✅ {name} Best CV R²: {grid.best_score_:.4f}")
    
    best_models[name] = grid.best_estimator_
    
    joblib.dump(grid.best_estimator_, f"{name}_best_model.pkl")
    print(f"🎉 {name} model saved as {name}_best_model.pkl")


for name, model in best_models.items():
    test_score = model.score(X_test, y_test)
    print(f"📊 {name} R² on test set: {test_score:.4f}")
