from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.admin_service import admin_service

router = APIRouter()

@router.get("/analytics")
def get_admin_analytics(db: Session = Depends(get_db)):
    """Returns admin panel metrics: active models, model accuracy, users count, system logs."""
    return admin_service.get_system_analytics(db)
