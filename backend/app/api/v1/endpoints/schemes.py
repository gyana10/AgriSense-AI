from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.session import get_db
from app.schemas.system import SchemeResponse
from app.services.scheme_service import scheme_service

router = APIRouter()

@router.get("/list", response_model=List[SchemeResponse])
def get_government_schemes(
    query: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Retrieves central and state agricultural schemes with category filtering and keyword search."""
    return scheme_service.get_schemes(db, query, category)
