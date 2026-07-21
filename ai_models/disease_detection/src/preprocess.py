import io
from PIL import Image

def preprocess_image_for_inference(image_bytes: bytes, target_size=(640, 640)):
    """Preprocesses input image bytes into PIL Image format for vision inference."""
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        img_resized = img.resize(target_size)
        return img_resized
    except Exception as e:
        raise ValueError(f"Invalid image format: {e}")
