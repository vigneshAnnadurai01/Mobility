from pydantic import BaseModel
from typing import List, Optional, Any

class RouteRequest(BaseModel):
    from_location: str
    to_location: str

class LocationResult(BaseModel):
    name: str
    lat: float
    lon: float

class SingleRoute(BaseModel):
    route_name: str
    distance_km: float
    travel_time: str
    estimated_toll: str
    toll_free_confirmed: bool
    summary_note: Optional[str] = None
    geometry: List[List[float]]  # [[lat, lon], ...]

class RouteComparisonResponse(BaseModel):
    from_location: str
    to_location: str
    from_coords: List[float]  # [lat, lon]
    to_coords: List[float]    # [lat, lon]
    fastest_route: SingleRoute
    toll_free_route: Optional[SingleRoute] = None
    toll_free_available: bool
    alternative_message: Optional[str] = None
