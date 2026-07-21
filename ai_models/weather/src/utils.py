from ai_models.common.utils import setup_logger, save_metrics
from ai_models.weather.src.config import MODULE_DIR

logger = setup_logger("weather", log_file=MODULE_DIR / "outputs" / "pipeline.log")
