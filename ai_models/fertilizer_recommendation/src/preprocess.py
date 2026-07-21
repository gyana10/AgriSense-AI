import pandas as pd
import numpy as np

def calculate_npk_deficit(crop: str, N: float, P: float, K: float):
    """Calculates nutrient deficit based on crop-specific optimal target ranges."""
    targets = {
        "rice": {"N": 80, "P": 40, "K": 40},
        "maize": {"N": 100, "P": 50, "K": 50},
        "chickpea": {"N": 40, "P": 60, "K": 80},
        "kidneybeans": {"N": 20, "P": 60, "K": 20},
        "pigeonpeas": {"N": 20, "P": 60, "K": 20},
        "mothbeans": {"N": 20, "P": 40, "K": 20},
        "mungbean": {"N": 20, "P": 40, "K": 20},
        "blackgram": {"N": 40, "P": 60, "K": 20},
        "lentil": {"N": 20, "P": 60, "K": 20},
        "pomegranate": {"N": 40, "P": 20, "K": 40},
        "banana": {"N": 100, "P": 75, "K": 120},
        "mango": {"N": 50, "P": 30, "K": 50},
        "grapes": {"N": 30, "P": 125, "K": 200},
        "watermelon": {"N": 100, "P": 10, "K": 50},
        "muskmelon": {"N": 100, "P": 10, "K": 50},
        "apple": {"N": 20, "P": 135, "K": 200},
        "orange": {"N": 20, "P": 10, "K": 10},
        "papaya": {"N": 50, "P": 50, "K": 50},
        "coconut": {"N": 20, "P": 10, "K": 30},
        "cotton": {"N": 120, "P": 46, "K": 20},
        "jute": {"N": 80, "P": 40, "K": 40},
        "coffee": {"N": 100, "P": 30, "K": 30}
    }
    
    crop_lower = crop.lower() if isinstance(crop, str) else "rice"
    target = targets.get(crop_lower, {"N": 80, "P": 40, "K": 40})
    
    defic_N = max(0.0, target["N"] - N)
    defic_P = max(0.0, target["P"] - P)
    defic_K = max(0.0, target["K"] - K)
    
    return defic_N, defic_P, defic_K
