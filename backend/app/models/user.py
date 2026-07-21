import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, default="farmer")  # farmer, agronomist, admin, researcher
    state = Column(String, nullable=True)
    district = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    # Relationships
    crop_predictions = relationship("CropPrediction", back_populates="user", cascade="all, delete-orphan")
    yield_predictions = relationship("YieldPrediction", back_populates="user", cascade="all, delete-orphan")
    disease_predictions = relationship("DiseasePrediction", back_populates="user", cascade="all, delete-orphan")
    pest_predictions = relationship("PestPrediction", back_populates="user", cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")