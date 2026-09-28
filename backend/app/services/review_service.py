from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from ..database.models import Review
from ..schemas.review import ReviewCreate

def create_review(db: Session, data: ReviewCreate) -> Review:
    review = Review(
        customer_name=data.customer_name,
        phone=data.phone,
        rating=max(1, min(5, data.rating)),
        review_type=data.review_type or 'review',
        review_text=data.review_text,
        status='Pending',
        created_at=datetime.utcnow()
    )
    db.add(review)
    db.commit()
    db.refresh(review)
    return review

def get_approved_reviews(db: Session) -> List[Review]:
    return db.query(Review).filter(Review.status == 'Approved').order_by(Review.created_at.desc()).all()

def get_all_reviews_admin(db: Session) -> List[Review]:
    return db.query(Review).order_by(Review.created_at.desc()).all()

def update_review_status(db: Session, review_id: int, new_status: str, admin_notes: Optional[str] = None) -> Optional[Review]:
    review = db.query(Review).filter(Review.id == review_id).first()
    if not review:
        return None
    review.status = new_status
    if admin_notes:
        review.admin_notes = admin_notes
    if new_status == 'Approved':
        review.approved_at = datetime.utcnow()
    db.commit()
    db.refresh(review)
    return review
