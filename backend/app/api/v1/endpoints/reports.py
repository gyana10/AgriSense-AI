from fastapi import APIRouter
from fastapi.responses import Response
from app.services.report_service import report_service

router = APIRouter()

@router.get("/pdf")
def download_pdf_report(user_name: str = "Farmer User", health_score: int = 88):
    """Generates and downloads a comprehensive PDF farm health diagnostic report."""
    pdf_bytes = report_service.generate_farm_pdf_report(user_name, health_score)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=AgriSense_Farm_Report_{user_name}.pdf"}
    )
