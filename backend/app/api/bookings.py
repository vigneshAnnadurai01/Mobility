from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database.connection import get_db
from ..database.models import Booking
from ..schemas.booking import BookingCreate, BookingResponse, BookingStatusUpdate
from ..services.booking_service import generate_booking_id, check_double_booking_conflict
from .auth import get_current_admin

router = APIRouter(prefix="/api/bookings", tags=["Bookings"])

@router.post("", response_model=BookingResponse)
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    booking_id = generate_booking_id(db, data.date)
    has_conflict, conflict_msg = check_double_booking_conflict(db, data.date, data.time)

    booking = Booking(
        booking_id=booking_id,
        customer_name=data.customer_name,
        phone=data.phone,
        pickup=data.pickup,
        destination=data.destination,
        date=data.date,
        time=data.time,
        trip_type=data.trip_type,
        passengers=data.passengers,
        route_type=data.route_type or "fastest",
        distance_km=data.distance_km,
        travel_time=data.travel_time,
        estimated_toll=data.estimated_toll,
        notes=data.notes,
        status="Pending"
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    res = BookingResponse.from_orm(booking)
    res.has_conflict = has_conflict
    res.conflict_message = conflict_msg
    return res

@router.get("", response_model=List[BookingResponse])
def get_all_bookings(
    status_filter: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    date_filter: Optional[str] = Query(None),
    admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    query = db.query(Booking)
    if status_filter and status_filter.lower() != "all":
        query = query.filter(Booking.status == status_filter)
    if date_filter:
        query = query.filter(Booking.date == date_filter)
    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            (Booking.booking_id.ilike(s)) |
            (Booking.customer_name.ilike(s)) |
            (Booking.phone.ilike(s)) |
            (Booking.destination.ilike(s))
        )
    return query.order_by(Booking.created_at.desc()).all()

@router.get("/{booking_id}", response_model=BookingResponse)
def get_single_booking(booking_id: str, db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.patch("/{booking_id}", response_model=BookingResponse)
def update_booking_status(
    booking_id: str,
    update: BookingStatusUpdate,
    admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = update.status
    db.commit()
    db.refresh(booking)
    return booking
