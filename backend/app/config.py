import os

class Settings:
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'sqlite:///./cab_mobility.db')
    SECRET_KEY: str = os.getenv('SECRET_KEY', 'aravindha_v_mobility_secure_jwt_secret_key_2026')
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours
    ADMIN_USERNAME: str = os.getenv('ADMIN_USERNAME', 'admin')
    ADMIN_PASSWORD: str = os.getenv('ADMIN_PASSWORD', 'admin@aravindha2026')
    ROUTING_API_KEY: str = os.getenv('ROUTING_API_KEY', '')
    GEOCODING_API_KEY: str = os.getenv('GEOCODING_API_KEY', '')

settings = Settings()
