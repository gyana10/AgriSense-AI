from fastapi import APIRouter
from typing import List, Optional
from app.schemas.system import MarketPriceItem
from app.services.market_service import market_service

router = APIRouter()

@router.get("/prices", response_model=List[MarketPriceItem])
def get_market_prices(crop: Optional[str] = None, state: Optional[str] = None):
    """Returns live agricultural crop prices filtered by crop name or state."""
    return market_service.get_market_prices(crop, state)
