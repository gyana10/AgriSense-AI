from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import numpy as np

def evaluate_regressor_model(model, X_test, y_test):
    """Evaluates regression performance metrics (R2, RMSE, MAE)."""
    y_pred = model.predict(X_test)
    r2 = float(r2_score(y_test, y_pred))
    rmse = float(np.sqrt(mean_squared_error(y_test, y_pred)))
    mae = float(mean_absolute_error(y_test, y_pred))
    
    return {
        "r2_score": round(r2, 4),
        "rmse": round(rmse, 4),
        "mae": round(mae, 4)
    }
