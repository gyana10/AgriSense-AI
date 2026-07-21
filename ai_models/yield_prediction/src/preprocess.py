import pandas as pd
import numpy as np

CROP_PRICE_PER_TON_INR = {
    "rice": 22000,
    "wheat": 22750,
    "maize": 2090,
    "cotton": 66200,
    "sugarcane": 3150,
    "potato": 15000,
    "onion": 18000,
    "pulses": 55000,
    "groundnut": 60000,
    "soyabean": 4600
}

def estimate_revenue_inr(crop: str, total_production_tons: float) -> float:
    """Calculates estimated market revenue in INR based on target MSP / market rate."""
    crop_lower = crop.lower() if isinstance(crop, str) else "rice"
    rate = CROP_PRICE_PER_TON_INR.get(crop_lower, 25000)
    return round(float(total_production_tons * rate), 2)
