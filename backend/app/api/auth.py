from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from datetime import datetime
from ..database.connection import get_db
from ..database.models import AdminUser, Booking, Review
from ..schemas.auth import LoginRequest, TokenResponse, AdminSummary
from ..services.auth_service import verify_password, create_access_token, decode_access_token, get_password_hash
from ..config import settings

router = APIRouter(prefix="/api/auth", tags=["Auth"])

def get_current_admin(authorization: str = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication token"
        )
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session expired or invalid token"
        )
    user = db.query(AdminUser).filter(AdminUser.username == payload["sub"]).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin user not found"
        )
    return user

@router.post("/login", response_model=TokenResponse)
def login(creds: LoginRequest, db: Session = Depends(get_db)):
    # Check default config fallback or DB user
    user = db.query(AdminUser).filter(AdminUser.username == creds.username).first()
    if not user:
        # Check if matching config default admin
        if creds.username == settings.ADMIN_USERNAME and creds.password == settings.ADMIN_PASSWORD:
            # Seed to DB
            user = AdminUser(
                username=settings.ADMIN_USERNAME,
                password_hash=get_password_hash(settings.ADMIN_PASSWORD)
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password"
            )
    else:
        if not verify_password(creds.password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password"
            )

    token = create_access_token({"sub": user.username})
    return TokenResponse(access_token=token, token_type="bearer", username=user.username)

@router.get("/summary", response_model=AdminSummary)
def get_dashboard_summary(admin: AdminUser = Depends(get_current_admin), db: Session = Depends(get_db)):
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    
    today_enquiries = db.query(Booking).filter(Booking.date == today_str).count()
    upcoming_trips = db.query(Booking).filter(Booking.status == "Confirmed").count()
    completed_trips = db.query(Booking).filter(Booking.status == "Completed").count()
    cancelled_trips = db.query(Booking).filter(Booking.status == "Cancelled").count()
    pending_reviews = db.query(Review).filter(Review.status == "Pending").count()
    total_bookings = db.query(Booking).count()

    return AdminSummary(
        today_enquiries=today_enquiries,
        upcoming_trips=upcoming_trips,
        completed_trips=completed_trips,
        cancelled_trips=cancelled_trips,
        pending_reviews=pending_reviews,
        total_bookings=total_bookings
    )
