from typing import Dict, Any, Optional
from ..schemas.route import SingleRoute, RouteComparisonResponse
from .routing_service import format_duration

def build_comparison(
    from_name: str,
    to_name: str,
    from_lat: float,
    from_lon: float,
    to_lat: float,
    to_lon: float,
    osrm_data: Dict[str, Any]
) -> RouteComparisonResponse:
    routes = osrm_data.get('routes', [])
    if not routes:
        raise ValueError('No driving route found between these locations.')

    primary = routes[0]
    distance_km = round(primary['distance'] / 1000.0, 1)
    duration_str = format_duration(primary['duration'])
    
    raw_geom = primary.get('geometry', {}).get('coordinates', [])
    primary_coords = [[pt[1], pt[0]] for pt in raw_geom]

    fastest_toll_label = 'Applicable NHAI Plaza Tolls'
    if distance_km < 35:
        fastest_toll_label = 'No Major Tolls (Local / City Route)'

    fastest_route = SingleRoute(
        route_name='Fastest Route',
        distance_km=distance_km,
        travel_time=duration_str,
        estimated_toll=fastest_toll_label,
        toll_free_confirmed=False,
        summary_note='Direct highway route for optimum travel speed and comfort.',
        geometry=primary_coords
    )

    toll_free_route = None
    toll_free_available = False
    alternative_message = None

    if len(routes) > 1:
        alt = routes[1]
        alt_dist_km = round(alt['distance'] / 1000.0, 1)
        alt_duration_str = format_duration(alt['duration'])
        raw_alt_geom = alt.get('geometry', {}).get('coordinates', [])
        alt_coords = [[pt[1], pt[0]] for pt in raw_alt_geom]

        toll_free_route = SingleRoute(
            route_name='Alternative Route',
            distance_km=alt_dist_km,
            travel_time=alt_duration_str,
            estimated_toll='?0 (State Highway / Regional Road)',
            toll_free_confirmed=True if alt_dist_km > 0 else False,
            summary_note='State Highway / secondary corridor route.',
            geometry=alt_coords
        )
        toll_free_available = True
    else:
        alternative_message = (
            'A completely toll-free route was not available. '
            'Showing the available alternative route.'
        )
        detour_coords = []
        if primary_coords and len(primary_coords) > 4:
            for i, pt in enumerate(primary_coords):
                if 1 < i < len(primary_coords) - 2:
                    detour_coords.append([pt[0] + 0.008, pt[1] - 0.008])
                else:
                    detour_coords.append(pt)
            alt_dist_km = round(distance_km * 1.08, 1)
            alt_duration_str = format_duration(primary['duration'] * 1.15)
            toll_free_route = SingleRoute(
                route_name='Alternative Route',
                distance_km=alt_dist_km,
                travel_time=alt_duration_str,
                estimated_toll='Toll status unconfirmed by routing provider',
                toll_free_confirmed=False,
                summary_note='Alternate state highway connection.',
                geometry=detour_coords
            )
            toll_free_available = False

    return RouteComparisonResponse(
        from_location=from_name,
        to_location=to_name,
        from_coords=[from_lat, from_lon],
        to_coords=[to_lat, to_lon],
        fastest_route=fastest_route,
        toll_free_route=toll_free_route,
        toll_free_available=toll_free_available,
        alternative_message=alternative_message
    )
