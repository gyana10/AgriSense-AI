from ai_models.common.utils import setup_logger, save_artifact, load_artifact, save_metrics
from ai_models.crop_recommendation.src.config import MODULE_DIR

logger = setup_logger("crop_recommendation", log_file=MODULE_DIR / "outputs" / "pipeline.log")
