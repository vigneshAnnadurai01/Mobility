from datetime import datetime
from typing import Optional, Tuple
from sqlalchemy.orm import Session
from ..database.models import Booking

def generate_booking_id(db: Session, date_str: Optional[str] = None) -> str:
    today_str = datetime.utcnow().strftime('%Y%m%d')
    prefix = f"AVM-{today_str}-"
    count = db.query(Booking).filter(Booking.booking_id.like(f"{prefix}%")).count()
    seq = count + 1
    return f"{prefix}{seq:03d}"

def check_double_booking_conflict(db: Session, date: str, time: str) -> Tuple[bool, Optional[str]]:
    existing_rides = db.query(Booking).filter(
        Booking.date == date,
        Booking.status.in_(['Confirmed', 'Pending'])
    ).all()

    if not existing_rides:
        return False, None

    req_time = time.strip()
    for ride in existing_rides:
        # If there is a confirmed booking on this date, or an existing booking at the same time
        if ride.status == 'Confirmed' or ride.time.strip() == req_time:
            return True, (
                'This time slot may already be booked. '
                'Please contact us for availability.'
            )

    if len(existing_rides) >= 3:
        return True, (
            'This time slot may already be booked. '
            'Please contact us for availability.'
        )

    return False, None
