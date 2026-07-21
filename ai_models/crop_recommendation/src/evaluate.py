from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import numpy as np

def evaluate_classifier_model(model, X_test, y_test, target_names=None):
    """Evaluates a classification model and returns metric dictionary."""
    y_pred = model.predict(X_test)
    acc = float(accuracy_score(y_test, y_pred))
    report = classification_report(y_test, y_pred, output_dict=True)
    cm = confusion_matrix(y_test, y_pred).tolist()
    
    return {
        "accuracy": round(acc, 4),
        "confusion_matrix": cm,
        "classification_report": report
    }