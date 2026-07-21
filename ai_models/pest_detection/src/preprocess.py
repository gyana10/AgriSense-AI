import io
from PIL import Image

def preprocess_pest_image(image_bytes: bytes):
    """Parses and formats image input for pest counting and classification."""
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        return img
    except Exception as e:
        raise ValueError(f"Invalid pest image format: {e}")
