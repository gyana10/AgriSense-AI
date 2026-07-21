import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

class ReportService:
    def generate_farm_pdf_report(self, user_name: str = "Farmer User", health_score: int = 88) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=30)
        story = []
        
        styles = getSampleStyleSheet()
        title_style = ParagraphStyle(
            'TitleStyle',
            parent=styles['Heading1'],
            fontName='Helvetica-Bold',
            fontSize=22,
            textColor=colors.HexColor("#166534"),
            spaceAfter=12
        )
        
        body_style = styles['BodyText']
        
        story.append(Paragraph("🌾 AgriSense AI - Precision Agriculture Farm Report", title_style))
        story.append(Paragraph(f"<b>Generated For:</b> {user_name} | <b>Date:</b> 2026-07-21", body_style))
        story.append(Spacer(1, 15))
        
        story.append(Paragraph(f"<b>Overall Farm Health Score:</b> {health_score} / 100 (Rating: Good)", styles['Heading2']))
        story.append(Spacer(1, 10))
        
        # Summary Table
        table_data = [
            ["Diagnostic Module", "Status / Prediction", "Confidence / Rating"],
            ["Crop Recommendation", "Rice / Maize", "99.5%"],
            ["Fertilizer Recommendation", "Urea + Bio-fertilizer", "Optimal"],
            ["Soil Fertility Level", "Medium-High Fertility", "85 / 100"],
            ["Disease Risk", "Tomato Early Blight (Low Risk)", "94.5%"],
            ["Pest Outbreak Risk", "Aphids (Controlled)", "Low Risk"],
            ["Irrigation Advice", "30 Mins (Early Morning)", "Scheduled"]
        ]
        
        t = Table(table_data, colWidths=[180, 200, 140])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#15803d")),
            ('TEXTCOLOR', (0,0), (-1,0), colors.white),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0,0), (-1,0), 8),
            ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#f0fdf4")),
            ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#bbf7d0"))
        ]))
        
        story.append(t)
        story.append(Spacer(1, 20))
        story.append(Paragraph("<b>Recommended Agronomic Action Items:</b>", styles['Heading3']))
        story.append(Paragraph("1. Apply basal dose of organic compost prior to monsoon sowing.", body_style))
        story.append(Paragraph("2. Deploy sticky traps for preventive pest monitoring.", body_style))
        story.append(Paragraph("3. Maintain optimal soil drainage to prevent fungal root decay.", body_style))
        
        doc.build(story)
        pdf_data = buffer.getvalue()
        buffer.close()
        return pdf_data

report_service = ReportService()
