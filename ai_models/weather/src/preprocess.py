def compute_weather_risks(temp: float, humidity: float, rainfall: float):
    """Computes disease, pest, and water stress risk levels from microclimate factors."""
    if humidity > 80 and 20 <= temp <= 30:
        disease_risk = "High (Fungal / Blight Risk)"
    elif humidity > 65:
        disease_risk = "Moderate"
    else:
        disease_risk = "Low"

    if temp > 28 and humidity > 70:
        pest_risk = "High (Aphids & Stem Borer active)"
    elif temp > 25:
        pest_risk = "Moderate"
    else:
        pest_risk = "Low"

    if rainfall > 50:
        water_stress = "Excess Water / Drainage Needed"
    elif rainfall < 10:
        water_stress = "Moisture Deficit / Irrigation Required"
    else:
        water_stress = "Optimal Moisture"

    return disease_risk, pest_risk, water_stress
