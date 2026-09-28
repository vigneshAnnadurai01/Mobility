from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class BookingCreate(BaseModel):
    customer_name: str
    phone: str
    pickup: str
    destination: str
    date: str
    time: str
    trip_type: str
    passengers: str
    route_type: Optional[str] = 'fastest'
    distance_km: Optional[float] = None
    travel_time: Optional[str] = None
    estimated_toll: Optional[str] = None
    notes: Optional[str] = None

class BookingStatusUpdate(BaseModel):
    status: str  # Pending, Confirmed, Completed, Cancelled

class BookingResponse(BaseModel):
    id: int
    booking_id: str
    customer_name: str
    phone: str
    pickup: str
    destination: str
    date: str
    time: str
    trip_type: str
    passengers: str
    route_type: Optional[str]
    distance_km: Optional[float]
    travel_time: Optional[str]
    estimated_toll: Optional[str]
    status: str
    has_conflict: bool = False
    conflict_message: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
