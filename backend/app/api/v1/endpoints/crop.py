from fastapi import APIRouter

from app.schemas.crop import CropRequest, CropResponse
from app.services.crop.predict import predict_crop

router = APIRouter()


@router.post(
    "/predict",
    response_model=CropResponse,
)
def predict(request: CropRequest):

    result = predict_crop(
        N=request.N,
        P=request.P,
        K=request.K,
        temperature=request.temperature,
        humidity=request.humidity,
        ph=request.ph,
        rainfall=request.rainfall,
    )

    return result