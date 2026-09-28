import httpx
from typing import List, Tuple, Optional, Dict, Any

NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'
OSRM_URL = 'https://router.project-osrm.org/route/v1/driving'

HEADERS = {
    'User-Agent': 'AravindhasVMobilityCabService/1.0 (contact: info@aravindhamobility.com)'
}

async def geocode_location(query: str) -> Optional[Tuple[float, float, str]]:
    clean_query = query.strip()
    search_q = clean_query
    if 'india' not in clean_query.lower() and 'tamil nadu' not in clean_query.lower():
        search_q = f"{clean_query}, Tamil Nadu, India"

    params = {
        'q': search_q,
        'format': 'json',
        'limit': 1,
        'addressdetails': 1
    }

    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            res = await client.get(NOMINATIM_URL, params=params, headers=HEADERS)
            data = res.json()
            if data and len(data) > 0:
                item = data[0]
                return float(item['lat']), float(item['lon']), item.get('display_name', clean_query)
        except Exception:
            pass

        try:
            params['q'] = clean_query
            res = await client.get(NOMINATIM_URL, params=params, headers=HEADERS)
            data = res.json()
            if data and len(data) > 0:
                item = data[0]
                return float(item['lat']), float(item['lon']), item.get('display_name', clean_query)
        except Exception:
            pass

    return None

def format_duration(seconds: float) -> str:
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    if hours > 0:
        return f"{hours} hr {minutes} min"
    return f"{minutes} min"

async def fetch_osrm_route(from_lat: float, from_lon: float, to_lat: float, to_lon: float) -> Optional[Dict[str, Any]]:
    coords = f"{from_lon},{from_lat};{to_lon},{to_lat}"
    url = f"{OSRM_URL}/{coords}"
    params = {
        'overview': 'full',
        'geometries': 'geojson',
        'alternatives': 'true',
        'steps': 'true'
    }

    async with httpx.AsyncClient(timeout=12.0) as client:
        try:
            res = await client.get(url, params=params, headers=HEADERS)
            if res.status_code == 200:
                return res.json()
        except Exception:
            pass
    return None
