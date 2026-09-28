from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean
from datetime import datetime
from .connection import Base

class Booking(Base):
    __tablename__ = 'bookings'

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(String(50), unique=True, index=True, nullable=False)
    customer_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    pickup = Column(String(255), nullable=False)
    destination = Column(String(255), nullable=False)
    date = Column(String(20), nullable=False)
    time = Column(String(20), nullable=False)
    trip_type = Column(String(50), nullable=False)
    passengers = Column(String(50), nullable=False)
    route_type = Column(String(50), default='fastest')
    distance_km = Column(Float, nullable=True)
    travel_time = Column(String(50), nullable=True)
    estimated_toll = Column(String(50), nullable=True)
    notes = Column(Text, nullable=True)
    status = Column(String(30), default='Pending')  # Pending, Confirmed, Completed, Cancelled
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Review(Base):
    __tablename__ = 'reviews'

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    rating = Column(Integer, nullable=False)
    review_type = Column(String(20), default='review')  # review or complaint
    review_text = Column(Text, nullable=False)
    status = Column(String(30), default='Pending')  # Pending, Approved, Rejected
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    approved_at = Column(DateTime, nullable=True)

class AdminUser(Base):
    __tablename__ = 'admin_users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), nullable=True)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
