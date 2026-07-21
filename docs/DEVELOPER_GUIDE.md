# Developer Guide - AgriSense AI

## Local Development Setup

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- Git

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Activate virtualenv
pip install -r requirements.txt
alembic upgrade head
python app/main.py
```
Backend runs at `http://localhost:8000/docs`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

### 4. Running Unit Tests
```bash
cd backend
$env:PYTHONPATH="..;."
python -m pytest tests/test_api.py
```
