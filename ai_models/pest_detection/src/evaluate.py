def evaluate_pest_count(pest_count: int) -> str:
    if pest_count > 15:
        return "Severe Outbreak"
    elif pest_count > 5:
        return "Moderate Infestation"
    return "Low Threat Level"
