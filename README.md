# 🌾 AgriSense AI
> **An End-to-End AI Platform for Precision Agriculture**

[![AgriSense CI/CD](https://github.com/gyana10/AgriSense-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/gyana10/AgriSense-AI/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![React + Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB.svg)](https://vitejs.dev/)
[![YOLOv11](https://img.shields.io/badge/Vision-YOLOv11-FF6F00.svg)](https://ultralytics.com)

---

## 🌟 Key Features

1. **Centerpiece Dashboard Hero**:
   - **0-100 Farm Health Score**: Real-time multi-factorial health score synthesis.
   - **Live Microclimate Weather**: Temperature, humidity, rainfall, wind speed, and automated irrigation advisor.
   - **Live OpenStreetMap GIS Map**: Interactive Leaflet map layer with weather/soil overlays and GPS locator.
   - **Live Commodity Price Ticker**: Real-time market prices filterable by crop and state.
2. **Precision ML Engine (`ai_models/`)**:
   - **Crop Recommendation**: CatBoost classifier trained with 99.77% accuracy.
   - **Fertilizer Recommender**: Calculates NPK deficits, chemical recommendation, and organic alternatives.
   - **Soil Fertility & SHAP**: Classifies soil health with SHAP feature importance breakdown.
   - **Yield & Revenue Predictor**: Computes harvest tonnage and estimated INR revenue.
3. **Computer Vision (YOLOv11)**:
   - **Disease Detection**: Leaf photo analysis with bounding box overlay and organic/chemical treatment plans.
   - **Pest Detection**: Pest species identification, instance counting, and severity rating.
4. **AI Farming Assistant**:
   - Context-aware LangChain RAG pipeline powered by Gemini API.
5. **Government Schemes & Subsidies**:
   - Searchable, categorized scheme directory with direct secure external links to official portals.
6. **Report Generator**:
   - Downloadable PDF diagnostic reports formatted with ReportLab.

---

## 📁 Repository Structure

```
AgriSense-AI/
├── ai_models/                # 8 Reusable ML pipelines (crop, fertilizer, soil, yield, disease, pest, weather, common)
├── backend/                  # FastAPI Clean Architecture (Routers, Services, Repositories, Schemas, Models, Alembic)
├── frontend/                 # React + Vite + Tailwind CSS + Recharts + Leaflet OpenStreetMap
├── datasets/                 # Agricultural datasets
├── docs/                     # Comprehensive technical documentation
│   ├── ARCHITECTURE.md
│   ├── API_DOCS.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── MODEL_DOCUMENTATION.md
│   └── DEVELOPER_GUIDE.md
├── .github/workflows/ci.yml  # GitHub Actions CI workflow
├── docker-compose.yml        # Docker stack containerization
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### Backend
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
python app/main.py
```
Swagger Documentation: `http://localhost:8000/docs`

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Dashboard: `http://localhost:5173`

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
