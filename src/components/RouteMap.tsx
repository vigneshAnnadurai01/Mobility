import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface RouteMapProps {
  fromCoords: [number, number];
  toCoords: [number, number];
  fromName: string;
  toName: string;
  fastestCoords: [number, number][];
  tollFreeCoords?: [number, number][];
  activeRoute: 'fastest' | 'toll_free';
}

export const RouteMap: React.FC<RouteMapProps> = ({
  fromCoords,
  toCoords,
  fromName,
  toName,
  fastestCoords,
  tollFreeCoords,
  activeRoute,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet map
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView(fromCoords, 8);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
      routeLayersRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const layerGroup = routeLayersRef.current;
    if (!map || !layerGroup) return;

    layerGroup.clearLayers();

    // Custom marker icons
    const pickupIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: #10B981; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">A</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const dropIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: #EF4444; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; border: 2px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);">B</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    // Add markers
    L.marker(fromCoords, { icon: pickupIcon })
      .bindPopup(`<b>Pickup:</b> ${fromName}`)
      .addTo(layerGroup);

    L.marker(toCoords, { icon: dropIcon })
      .bindPopup(`<b>Destination:</b> ${toName}`)
      .addTo(layerGroup);

    // Draw Alternative / Toll-Free Route (if available)
    if (tollFreeCoords && tollFreeCoords.length > 0) {
      const isSelected = activeRoute === 'toll_free';
      const altLine = L.polyline(tollFreeCoords, {
        color: isSelected ? '#D97706' : '#94A3B8',
        weight: isSelected ? 6 : 4,
        opacity: isSelected ? 0.95 : 0.6,
        dashArray: isSelected ? undefined : '6, 6',
      }).bindPopup('<b>Alternative / Toll-Free Route</b>');
      altLine.addTo(layerGroup);
    }

    // Draw Fastest Route
    if (fastestCoords && fastestCoords.length > 0) {
      const isSelected = activeRoute === 'fastest';
      const fastLine = L.polyline(fastestCoords, {
        color: isSelected ? '#2563EB' : '#94A3B8',
        weight: isSelected ? 6 : 4,
        opacity: isSelected ? 0.95 : 0.6,
      }).bindPopup('<b>Fastest Route (Direct Highway)</b>');
      fastLine.addTo(layerGroup);
    }

    // Fit map bounds to show complete route
    const allPoints = [...fastestCoords, ...(tollFreeCoords || [])];
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [fromCoords, toCoords, fromName, toName, fastestCoords, tollFreeCoords, activeRoute]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-50">
      <div ref={mapContainerRef} className="w-full h-80 sm:h-96 z-10" />
      
      {/* Route Legend Overlay */}
      <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-md text-xs space-y-1.5 pointer-events-auto">
        <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
          Route Map
        </div>
        <div className="flex items-center gap-2 text-slate-700">
          <span className="w-4 h-1 bg-blue-600 rounded"></span>
          <span className={activeRoute === 'fastest' ? 'font-bold text-blue-700' : ''}>
            Fastest Route {activeRoute === 'fastest' && '(Selected)'}
          </span>
        </div>
        {tollFreeCoords && (
          <div className="flex items-center gap-2 text-slate-700">
            <span className="w-4 h-1 bg-amber-600 rounded border-dashed border-b"></span>
            <span className={activeRoute === 'toll_free' ? 'font-bold text-amber-700' : ''}>
              Toll-Free / Alt {activeRoute === 'toll_free' && '(Selected)'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
