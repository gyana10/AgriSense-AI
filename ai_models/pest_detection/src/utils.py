from ai_models.common.utils import setup_logger, save_artifact, load_artifact, save_metrics
from ai_models.pest_detection.src.config import MODULE_DIR

logger = setup_logger("pest_detection", log_file=MODULE_DIR / "outputs" / "pipeline.log")
