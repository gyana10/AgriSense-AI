def evaluate_irrigation_urgency(water_stress: str, temp: float) -> str:
    if "Irrigation Required" in water_stress:
        return "High Urgency" if temp > 32 else "Moderate Urgency"
    return "Low Urgency"
