from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter()

@router.get("/role-stats")
def get_role_dashboard_stats(role: str = "farmer", db: Session = Depends(get_db)):
    """Returns specialized dashboard metrics depending on user role (Farmer, Agronomist, Researcher, Admin)."""
    if role == "agronomist":
        return {
            "role": "Agronomist",
            "assigned_farms": 28,
            "pending_field_audits": 4,
            "high_risk_disease_alerts": 2,
            "soil_samples_tested": 142,
            "advisories_issued": 89
        }
    elif role == "researcher":
        return {
            "role": "Researcher",
            "model_experiments": 16,
            "active_datasets": 8,
            "mean_crop_model_accuracy": 0.9977,
            "yield_r2_score": 0.965,
            "cross_val_folds": 5
        }
    elif role == "admin":
        return {
            "role": "Admin",
            "total_registered_users": 1250,
            "active_models_running": 6,
            "system_uptime": "99.98%",
            "daily_api_requests": 14200
        }
    else:  # Farmer
        return {
            "role": "Farmer",
            "farm_health_score": 88,
            "recommended_crop": "Rice / Maize",
            "active_disease_alert": "None",
            "irrigation_due": "30 mins tomorrow morning",
            "eligible_schemes": 7
        }
