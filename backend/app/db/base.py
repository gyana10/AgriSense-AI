from app.db.session import Base
from app.models.user import User
from app.models.prediction import (
    CropPrediction,
    FertilizerPrediction,
    SoilPrediction,
    YieldPrediction,
    DiseasePrediction,
    PestPrediction
)
from app.models.scheme import Scheme, SchemeBookmark
from app.models.system import WeatherLog, Notification, SystemLog
