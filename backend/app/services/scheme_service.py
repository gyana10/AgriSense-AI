from typing import List
from sqlalchemy.orm import Session
from app.repositories.scheme_repository import scheme_repo
from app.schemas.system import SchemeResponse

OFFICIAL_GOVT_SCHEMES = [
    {
        "id": 1,
        "title": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "category": "PM-KISAN",
        "short_description": "Income support of ₹6,000 per year in three equal installments directly to land-holding farmer families.",
        "eligibility": "All landholding farmer families having cultivable landholding in their names.",
        "benefits": "₹6,000 per year credited directly to Aadhaar-seeded bank accounts.",
        "required_documents": ["Aadhaar Card", "Landholding Ownership Document (Khatauni)", "Bank Passbook"],
        "official_url": "https://pmkisan.gov.in/",
        "last_updated": "2026-07-01"
    },
    {
        "id": 2,
        "title": "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
        "category": "Crop Insurance",
        "short_description": "Comprehensive crop insurance cover against yield losses due to non-preventable natural risks.",
        "eligibility": "All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.",
        "benefits": "Financial support in case of crop damage from drought, flood, pests, or natural fire.",
        "required_documents": ["Land Record (7/12 or ROR)", "Sowing Certificate", "Aadhaar Card", "Bank Account Details"],
        "official_url": "https://pmfby.gov.in/",
        "last_updated": "2026-07-01"
    },
    {
        "id": 3,
        "title": "Soil Health Card Scheme",
        "category": "Soil Health Card",
        "short_description": "Provides crop-wise recommendations of nutrients and fertilizers required for individual farm plots.",
        "eligibility": "All agricultural landowners across all States and Union Territories.",
        "benefits": "Customized soil test report every 3 years with precise macro and micro-nutrient recommendations.",
        "required_documents": ["Soil Sample Details", "Farmer Identity Proof", "Land Survey Number"],
        "official_url": "https://soilhealth.dac.gov.in/",
        "last_updated": "2026-07-01"
    },
    {
        "id": 4,
        "title": "Kisan Credit Card (KCC) Scheme",
        "category": "Kisan Credit Card",
        "short_description": "Concessional institutional credit for crop cultivation, post-harvest expenses, and farm maintenance.",
        "eligibility": "Individual/Joint borrowers who are owner cultivators, tenant farmers, or self-help groups.",
        "benefits": "Credit limit up to ₹3 Lakhs at subsidized interest rates (4% per annum with prompt repayment).",
        "required_documents": ["Application Form", "Aadhaar / Voter ID", "Land Tax Receipt / Agreement"],
        "official_url": "https://www.myscheme.gov.in/schemes/kcc",
        "last_updated": "2026-07-01"
    },
    {
        "id": 5,
        "title": "Paramparagat Krishi Vikas Yojana (PKVY)",
        "category": "Organic Farming",
        "short_description": "Promotes certified organic farming through cluster approach and Participatory Guarantee System (PGS).",
        "eligibility": "Farmers willing to form clusters of 50 or more farmers with 50 acres of land.",
        "benefits": "Financial assistance of ₹50,000 per hectare over 3 years for organic inputs and certification.",
        "required_documents": ["Cluster Group Details", "Aadhaar Card", "Land Record Proof"],
        "official_url": "https://pgsindia-ncof.gov.in/pkvy/index.aspx",
        "last_updated": "2026-07-01"
    },
    {
        "id": 6,
        "title": "PM Krishi Sinchayee Yojana (Micro Irrigation)",
        "category": "Irrigation",
        "short_description": "Drip and sprinkler micro-irrigation systems to maximize water use efficiency ('More Crop Per Drop').",
        "eligibility": "All category farmers with access to water sources for irrigation.",
        "benefits": "55% subsidy for small and marginal farmers, 45% subsidy for other farmers on micro-irrigation equipment.",
        "required_documents": ["Land Record", "Water Source Proof", "Electricity Bill / Pump Details"],
        "official_url": "https://pmksy.gov.in/",
        "last_updated": "2026-07-01"
    },
    {
        "id": 7,
        "title": "Sub-Mission on Agricultural Mechanization (SMAM)",
        "category": "Farm Mechanization",
        "short_description": "Financial subsidy for purchasing modern farm machinery, tractors, harvesters, and implements.",
        "eligibility": "Small, marginal farmers, women farmers, and agricultural cooperative societies.",
        "benefits": "40% to 50% subsidy on agricultural equipment purchase or custom hiring center setup.",
        "required_documents": ["Aadhaar", "Land Records", "Bank Passbook", "Machinery Quotation"],
        "official_url": "https://agrimachinery.nic.in/",
        "last_updated": "2026-07-01"
    }
]

class SchemeService:
    def get_schemes(self, db: Session, query: str = None, category: str = None) -> List[SchemeResponse]:
        filtered = OFFICIAL_GOVT_SCHEMES
        if category and category != "All":
            filtered = [s for s in filtered if s["category"] == category]
        if query:
            q_lower = query.lower()
            filtered = [s for s in filtered if q_lower in s["title"].lower() or q_lower in s["short_description"].lower()]
        return [SchemeResponse(**s) for s in filtered]

scheme_service = SchemeService()
