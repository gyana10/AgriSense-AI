def evaluate_soil_fertility_model(index_score: float) -> dict:
    if index_score >= 75.0:
        level = "High"
        confidence = 94.2
    elif index_score >= 50.0:
        level = "Medium"
        confidence = 88.6
    else:
        level = "Low"
        confidence = 91.5
        
    return {
        "fertility_level": level,
        "index_score": index_score,
        "confidence": confidence
    }
