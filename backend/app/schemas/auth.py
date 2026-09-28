from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'
    username: str

class AdminSummary(BaseModel):
    today_enquiries: int
    upcoming_trips: int
    completed_trips: int
    cancelled_trips: int
    pending_reviews: int
    total_bookings: int
