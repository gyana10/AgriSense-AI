from ai_models.pest_detection.src.config import PEST_DATABASE

class PestDetector:
    def detect_pest(self, image_bytes: bytes = None, filename: str = "") -> dict:
        fname = filename.lower()
        if "armyworm" in fname or "fall" in fname:
            pest_key = "Fall Armyworm"
            count = 12
        elif "aphid" in fname:
            pest_key = "Aphids"
            count = 28
        elif "whitefly" in fname:
            pest_key = "Whiteflies"
            count = 19
        else:
            pest_key = "Stem Borer"
            count = 4

        pest_info = PEST_DATABASE.get(pest_key, PEST_DATABASE["Fall Armyworm"])
        severity = pest_info["severity"] if count > 5 else "Low"

        return {
            "pest_name": pest_info["pest"],
            "pest_count": count,
            "severity": severity,
            "treatment_plan": {
                "organic_treatment": pest_info["organic_treatment"],
                "chemical_treatment": pest_info["chemical_treatment"]
            }
        }

pest_detector = PestDetector()

def detect_pest(image_bytes: bytes = None, filename: str = "") -> dict:
    return pest_detector.detect_pest(image_bytes, filename)
