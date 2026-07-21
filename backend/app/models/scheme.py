import datetime
from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean, JSON
from app.db.session import Base

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    category = Column(String, nullable=False, index=True)
    short_description = Column(Text, nullable=False)
    eligibility = Column(Text, nullable=False)
    benefits = Column(Text, nullable=False)
    required_documents = Column(JSON, nullable=True)
    official_url = Column(String, nullable=False)
    last_updated = Column(String, default="2026-07-01")

class SchemeBookmark(Base):
    __tablename__ = "scheme_bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    scheme_id = Column(Integer, ForeignKey("schemes.id"), nullable=False)
    bookmarked_at = Column(DateTime, default=datetime.datetime.utcnow)
