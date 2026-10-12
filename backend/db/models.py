"""
Database Models
"""

from sqlalchemy import Column, Integer, String, Boolean
from jdatetime import datetime

from .config import Base


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, unique=True, primary_key=True, autoincrement=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False)
    tel = Column(String, nullable=False)
    password = Column(String, nullable=False)

class HistoryDiagnoses(Base):
    __tablename__ = "history_diagnoses"

    id = Column(Integer, unique=True, primary_key=True, autoincrement=True)
    image_url = Column(String, nullable=False)
    motion = Column(Boolean, nullable=False, default=True)
    timestamp = Column(String, nullable=False)
