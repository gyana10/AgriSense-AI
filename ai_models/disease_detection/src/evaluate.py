def evaluate_vision_detection(confidence: float):
    """Returns detection confidence rating."""
    return {
        "confidence_score": round(confidence, 4),
        "is_reliable": confidence >= 0.70
    }
