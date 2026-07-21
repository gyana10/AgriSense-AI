import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean, JSON, Float
from sqlalchemy.orm import relationship
from app.db.session import Base

class WeatherLog(Base):
    __tablename__ = "weather_logs"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False, index=True)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    rainfall = Column(Float, nullable=False)
    wind_speed = Column(Float, nullable=False)
    uv_index = Column(Float, default=5.0)
    disease_risk = Column(String, default="Low")
    pest_risk = Column(String, default="Low")
    water_stress = Column(String, default="Optimal")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(String, nullable=False)  # weather, disease, pest, scheme
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User", back_populates="notifications")

class SystemLog(Base):
    __tablename__ = "system_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    action = Column(String, nullable=False)
    endpoint = Column(String, nullable=False)
    status_code = Column(Integer, nullable=False)
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
