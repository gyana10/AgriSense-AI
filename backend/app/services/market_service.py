from typing import List
from app.schemas.system import MarketPriceItem

MARKET_PRICES_DATA = [
    {"crop": "Rice (Paddy)", "market": "Bhubaneswar Mandi", "district": "Khordha", "state": "Odisha", "arrival_quantity_quintals": 450.0, "min_price_inr": 2180, "max_price_inr": 2300, "modal_price_inr": 2240, "date": "2026-07-21"},
    {"crop": "Wheat", "market": "Khordha Grain Market", "district": "Khordha", "state": "Odisha", "arrival_quantity_quintals": 320.0, "min_price_inr": 2200, "max_price_inr": 2350, "modal_price_inr": 2275, "date": "2026-07-21"},
    {"crop": "Maize", "market": "Cuttack Central Mandi", "district": "Cuttack", "state": "Odisha", "arrival_quantity_quintals": 680.0, "min_price_inr": 1950, "max_price_inr": 2150, "modal_price_inr": 2090, "date": "2026-07-21"},
    {"crop": "Potato", "market": "Puri Agricultural Yard", "district": "Puri", "state": "Odisha", "arrival_quantity_quintals": 890.0, "min_price_inr": 1400, "max_price_inr": 1650, "modal_price_inr": 1520, "date": "2026-07-21"},
    {"crop": "Onion", "market": "Sambalpur Main Market", "district": "Sambalpur", "state": "Odisha", "arrival_quantity_quintals": 540.0, "min_price_inr": 1700, "max_price_inr": 1950, "modal_price_inr": 1820, "date": "2026-07-21"},
    {"crop": "Cotton", "market": "Rayagada APMC", "district": "Rayagada", "state": "Odisha", "arrival_quantity_quintals": 210.0, "min_price_inr": 6400, "max_price_inr": 6850, "modal_price_inr": 6620, "date": "2026-07-21"},
    {"crop": "Sugarcane", "market": "Nayagarh Sugar Yard", "district": "Nayagarh", "state": "Odisha", "arrival_quantity_quintals": 1200.0, "min_price_inr": 305, "max_price_inr": 325, "modal_price_inr": 315, "date": "2026-07-21"}
]

class MarketService:
    def get_market_prices(self, crop: str = None, state: str = None) -> List[MarketPriceItem]:
        filtered = MARKET_PRICES_DATA
        if crop:
            c_lower = crop.lower()
            filtered = [item for item in filtered if c_lower in item["crop"].lower()]
        if state:
            s_lower = state.lower()
            filtered = [item for item in filtered if s_lower in item["state"].lower()]
        return [MarketPriceItem(**item) for item in filtered]

market_service = MarketService()
