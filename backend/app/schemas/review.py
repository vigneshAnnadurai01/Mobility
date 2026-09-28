from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    customer_name: str
    phone: Optional[str] = None
    rating: int
    review_type: Optional[str] = 'review'  # review or complaint
    review_text: str

class ReviewStatusUpdate(BaseModel):
    status: str  # Pending, Approved, Rejected
    admin_notes: Optional[str] = None

class ReviewResponse(BaseModel):
    id: int
    customer_name: str
    phone: Optional[str] = None
    rating: int
    review_type: str
    review_text: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
