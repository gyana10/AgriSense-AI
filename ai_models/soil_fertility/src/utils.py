from ai_models.common.utils import setup_logger, save_artifact, load_artifact, save_metrics
from ai_models.soil_fertility.src.config import MODULE_DIR

logger = setup_logger("soil_fertility", log_file=MODULE_DIR / "outputs" / "pipeline.log")
