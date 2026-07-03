from fastapi import FastAPI

app = FastAPI(
    title="AgriSense AI",
    description="AI Powered Precision Agriculture Platform",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "project": "AgriSense AI",
        "version": "1.0.0",
        "status": "Running Successfully 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }