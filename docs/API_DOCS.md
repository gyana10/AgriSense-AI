# API Documentation - AgriSense AI

All endpoints are versioned under `/api/v1/`.

## Endpoints Summary

### Authentication (`/api/v1/auth`)
- `POST /register`: Registers new user. Returns JWT Access & Refresh Tokens.
- `POST /login`: Authenticates user credentials.
- `POST /refresh`: Issues new access token from refresh token.
- `GET /me`: Returns current user profile.

### Precision ML Tools
- `POST /api/v1/crop/predict`: Predicts top recommended crops with CatBoost accuracy score.
- `POST /api/v1/fertilizer/recommend`: Calculates NPK deficits, recommended fertilizer, and organic substitute.
- `POST /api/v1/soil/predict`: Classifies soil fertility with SHAP feature impact breakdown.
- `POST /api/v1/yield/predict`: Calculates harvest tonnage and estimated INR market revenue.

### Computer Vision
- `POST /api/v1/disease/detect`: Upload leaf image for YOLOv11 diagnosis, bounding boxes, and treatment.
- `POST /api/v1/pest/detect`: Upload pest photo for count, severity, and control recommendations.

### System & Intelligence
- `GET /api/v1/weather/intelligence`: Weather forecast, disease/pest risk scoring, and irrigation duration.
- `POST /api/v1/assistant/chat`: LangChain RAG AI Assistant answering agronomic questions.
- `GET /api/v1/schemes/list`: Filterable government schemes with official website redirects.
- `GET /api/v1/market/prices`: Live agricultural commodity prices.
- `GET /api/v1/reports/pdf`: Export PDF diagnostic report using ReportLab.
