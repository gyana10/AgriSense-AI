from sqlalchemy.orm import Session
from app.repositories.user_repository import user_repository
from app.models.user import User

class AdminService:
    def get_system_analytics(self, db: Session) -> dict:
        total_users = db.query(User).count()
        return {
            "total_users": total_users,
            "active_models": [
                {"name": "Crop Recommendation (CatBoost)", "version": "1.0.0", "accuracy": "99.77%"},
                {"name": "Fertilizer Recommender", "version": "1.0.0", "accuracy": "98.50%"},
                {"name": "Soil Fertility Classifier (RF)", "version": "1.0.0", "accuracy": "96.40%"},
                {"name": "Crop Yield Regressor (RF)", "version": "1.0.0", "r2": "0.965"},
                {"name": "Disease Detector (YOLOv11)", "version": "11.0.0", "mAP50": "94.8%"},
                {"name": "Pest Detector (YOLOv11)", "version": "11.0.0", "mAP50": "92.5%"}
            ],
            "server_status": "Healthy",
            "db_connection": "Connected (SQLite/Postgres)"
        }

admin_service = AdminService()
