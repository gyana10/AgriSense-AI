from ai_models.fertilizer_recommendation.src.config import ORGANIC_ALTERNATIVES, METRICS_PATH
from ai_models.fertilizer_recommendation.src.utils import logger, save_metrics

def train_fertilizer_pipeline():
    """Builds fertilizer rule mapping matrix and metadata."""
    logger.info("Initializing fertilizer recommendation rules matrix...")
    metrics = {
        "status": "ready",
        "supported_fertilizers": list(ORGANIC_ALTERNATIVES.keys()),
        "organic_alternatives_mapped": len(ORGANIC_ALTERNATIVES)
    }
    save_metrics(metrics, METRICS_PATH)
    logger.info("Fertilizer training pipeline completed.")
    return metrics

if __name__ == "__main__":
    train_fertilizer_pipeline()
