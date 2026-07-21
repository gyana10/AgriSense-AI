from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class TreatmentPlan(BaseModel):
    organic_treatment: str
    chemical_treatment: Optional[str] = None
    preventive_actions: Optional[str] = None

class DiseaseDetectionResponse(BaseModel):
    disease_name: str
    confidence: float
    severity: str
    bounding_boxes: List[Dict[str, Any]]
    treatment_plan: TreatmentPlan

class PestDetectionResponse(BaseModel):
    pest_name: str
    pest_count: int
    severity: str
    treatment_plan: TreatmentPlan
