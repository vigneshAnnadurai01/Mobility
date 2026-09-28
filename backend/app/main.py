from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.connection import engine, Base, SessionLocal
from .database.models import AdminUser
from .config import settings
from .services.auth_service import get_password_hash
from .api import auth, routes, bookings, reviews

# Initialize DB tables
Base.metadata.create_all(bind=engine)

# Seed default admin if table is empty
db = SessionLocal()
try:
    if db.query(AdminUser).count() == 0:
        admin_user = AdminUser(
            username=settings.ADMIN_USERNAME,
            password_hash=get_password_hash(settings.ADMIN_PASSWORD)
        )
        db.add(admin_user)
        db.commit()
finally:
    db.close()

app = FastAPI(
    title="Aravindha's \"v\" Mobility API",
    description="Cab booking, real routing, toll comparison, reviews and admin moderation backend.",
    version="1.0.0"
)

# Enable CORS for local dev
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(routes.router)
app.include_router(bookings.router)
app.include_router(reviews.router)
app.include_router(auth.router)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Aravindha's \"v\" Mobility Backend",
        "working_hours": "24/7",
        "vehicle": "Maruti Suzuki Ertiga"
    }
