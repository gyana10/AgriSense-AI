def evaluate_fertilizer_recommendation(defic_N, defic_P, defic_K):
    """Evaluates NPK ratios and returns precision match percentage."""
    total_deficit = defic_N + defic_P + defic_K
    if total_deficit == 0:
        return {"match_score": 100.0, "status": "Optimal soil nutrients"}
    return {
        "match_score": round(max(60.0, 100.0 - (total_deficit * 0.2)), 2),
        "status": "Nutrient replenishment recommended"
    }
