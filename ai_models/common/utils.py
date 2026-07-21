import logging
import json
from pathlib import Path
import joblib
import numpy as np

def setup_logger(name: str, log_file: Path = None, level=logging.INFO) -> logging.Logger:
    """Configures a standardized logger for ML pipelines and backend services."""
    logger = logging.getLogger(name)
    logger.setLevel(level)
    
    if not logger.handlers:
        formatter = logging.Formatter(
            '[%(asctime)s] [%(levelname)s] [%(name)s]: %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S'
        )
        
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)
        logger.addHandler(stream_handler)
        
        if log_file:
            log_file.parent.mkdir(parents=True, exist_ok=True)
            file_handler = logging.FileHandler(log_file)
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)
            
    return logger

def save_artifact(obj, file_path: Path):
    """Saves a model object or dictionary using joblib."""
    file_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(obj, file_path)

def load_artifact(file_path: Path):
    """Loads a saved joblib artifact if exists."""
    if not file_path.exists():
        raise FileNotFoundError(f"Artifact not found at path: {file_path}")
    return joblib.load(file_path)

def save_metrics(metrics: dict, file_path: Path):
    """Saves evaluation metrics to a JSON file."""
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with open(file_path, "w") as f:
        json.dump(metrics, f, indent=4)
