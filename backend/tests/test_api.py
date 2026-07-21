import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "Online"

def test_crop_prediction():
    payload = {
        "nitrogen": 90,
        "phosphorus": 42,
        "potassium": 43,
        "temperature": 20.8,
        "humidity": 82.0,
        "ph": 6.5,
        "rainfall": 202.9
    }
    response = client.post("/api/v1/crop/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "recommended_crop" in data
    assert "confidence" in data

def test_fertilizer_recommendation():
    payload = {
        "crop": "rice",
        "nitrogen": 20,
        "phosphorus": 10,
        "potassium": 10
    }
    response = client.post("/api/v1/fertilizer/recommend", json=payload)
    assert response.status_code == 200
    assert "recommended_fertilizer" in response.json()

def test_soil_fertility():
    payload = {
        "nitrogen": 140,
        "phosphorus": 30,
        "potassium": 150,
        "ph": 6.8
    }
    response = client.post("/api/v1/soil/predict", json=payload)
    assert response.status_code == 200
    assert response.json()["fertility_level"] in ["High", "Medium", "Low"]

def test_schemes_list():
    response = client.get("/api/v1/schemes/list")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_market_prices():
    response = client.get("/api/v1/market/prices")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
