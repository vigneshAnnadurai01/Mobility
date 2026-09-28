from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database.connection import get_db
from ..schemas.review import ReviewCreate, ReviewResponse, ReviewStatusUpdate
from ..services.review_service import (
    create_review,
    get_approved_reviews,
    get_all_reviews_admin,
    update_review_status
)
from .auth import get_current_admin

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])

@router.post("", response_model=ReviewResponse)
def submit_review(data: ReviewCreate, db: Session = Depends(get_db)):
    if not data.customer_name.strip() or not data.review_text.strip():
        raise HTTPException(status_code=400, detail="Name and Review text are required.")
    review = create_review(db, data)
    return review

@router.get("", response_model=List[ReviewResponse])
def list_public_reviews(db: Session = Depends(get_db)):
    # Only approved reviews appear publicly
    return get_approved_reviews(db)

@router.get("/admin", response_model=List[ReviewResponse])
def list_all_reviews_for_admin(admin=Depends(get_current_admin), db: Session = Depends(get_db)):
    return get_all_reviews_admin(db)

@router.patch("/{review_id}", response_model=ReviewResponse)
def moderate_review(
    review_id: int,
    update: ReviewStatusUpdate,
    admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    review = update_review_status(db, review_id, update.status, update.admin_notes)
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    return review
