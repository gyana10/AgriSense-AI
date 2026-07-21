import logging
import sys
from pathlib import Path

def setup_app_logging():
    """Configures application-wide logging."""
    logger = logging.getLogger("agrisense")
    logger.setLevel(logging.INFO)
    
    if not logger.handlers:
        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] [%(name)s:%(filename)s:%(lineno)d] - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S"
        )
        
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)
        
        log_dir = Path("logs")
        log_dir.mkdir(exist_ok=True)
        file_handler = logging.FileHandler(log_dir / "agrisense_app.log")
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

setup_app_logging()
logger = logging.getLogger("agrisense")
