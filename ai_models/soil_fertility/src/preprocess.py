import pandas as pd
import numpy as np
from ai_models.soil_fertility.src.config import FEATURE_NAMES

def calculate_soil_fertility_index(N: float, P: float, K: float, ph: float, ec: float = 1.0, organic_carbon: float = 0.5) -> float:
    """
    Computes Soil Health & Fertility Index (0 - 100) from soil chemical parameters.
    Standard agronomic optimal ranges:
    N: 140 - 280 kg/ha
    P: 15 - 30 kg/ha
    K: 120 - 240 kg/ha
    pH: 6.0 - 7.5
    EC: 0.5 - 2.0 dS/m
    OC: 0.5 - 0.75 %
    """
    n_score = min(1.0, max(0.2, N / 140.0)) * 25
    p_score = min(1.0, max(0.2, P / 25.0)) * 20
    k_score = min(1.0, max(0.2, K / 150.0)) * 20
    
    ph_dist = abs(ph - 6.75)
    ph_score = max(0.0, 1.0 - (ph_dist / 3.0)) * 15
    
    ec_score = 10.0 if 0.5 <= ec <= 2.5 else 5.0
    oc_score = min(1.0, max(0.2, organic_carbon / 0.75)) * 10
    
    total_score = n_score + p_score + k_score + ph_score + ec_score + oc_score
    return round(float(total_score), 2)
