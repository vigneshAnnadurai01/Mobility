from fastapi import APIRouter, HTTPException, Query
from typing import List
from ..schemas.route import RouteRequest, RouteComparisonResponse, LocationResult
from ..services.routing_service import geocode_location, fetch_osrm_route
from ..services.toll_service import build_comparison

router = APIRouter(prefix="/api/route", tags=["Routing"])

@router.get("/autocomplete", response_model=List[LocationResult])
async def autocomplete_locations(q: str = Query(..., min_length=2)):
    # Autocomplete using geocoder
    loc = await geocode_location(q)
    if loc:
        return [LocationResult(name=loc[2], lat=loc[0], lon=loc[1])]
    return []

@router.post("", response_model=RouteComparisonResponse)
async def calculate_route_endpoint(req: RouteRequest):
    if not req.from_location.strip() or not req.to_location.strip():
        raise HTTPException(status_code=400, detail="From and To locations cannot be empty.")

    origin = await geocode_location(req.from_location)
    if not origin:
        raise HTTPException(
            status_code=404,
            detail=f"Unable to find location for '{req.from_location}'. Please check spelling or enter a nearby city/landmark."
        )

    dest = await geocode_location(req.to_location)
    if not dest:
        raise HTTPException(
            status_code=404,
            detail=f"Unable to find location for '{req.to_location}'. Please check spelling or enter a nearby city/landmark."
        )

    osrm_res = await fetch_osrm_route(origin[0], origin[1], dest[0], dest[1])
    if not osrm_res or not osrm_res.get("routes"):
        raise HTTPException(
            status_code=400,
            detail="Unable to calculate road route between these locations. Please verify travel points."
        )

    try:
        comparison = build_comparison(
            from_name=req.from_location,
            to_name=req.to_location,
            from_lat=origin[0],
            from_lon=origin[1],
            to_lat=dest[0],
            to_lon=dest[1],
            osrm_data=osrm_res
        )
        return comparison
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
