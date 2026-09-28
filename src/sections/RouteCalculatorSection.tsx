import React, { useState } from 'react';
import { 
  Calculator, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Navigation, 
  AlertCircle, 
  Check, 
  HelpCircle,
  Loader2,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { calculateRoute, RouteComparisonResponse, SingleRoute } from '../utils/api';
import { RouteMap } from '../components/RouteMap';

interface RouteCalculatorSectionProps {
  onSelectRoute?: (routeData: {
    pickup: string;
    destination: string;
    routeType: 'fastest' | 'toll_free';
    distanceKm: number;
    travelTime: string;
    estimatedToll: string;
  }) => void;
}

export const RouteCalculatorSection: React.FC<RouteCalculatorSectionProps> = ({ onSelectRoute }) => {
  const [fromLoc, setFromLoc] = useState('Coimbatore');
  const [toLoc, setToLoc] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RouteComparisonResponse | null>(null);
  const [activeRouteType, setActiveRouteType] = useState<'fastest' | 'toll_free'>('fastest');

  const popularDestinations = [
    'Ooty',
    'Chennai',
    'Madurai',
    'Trichy',
    'Salem',
    'Kodaikanal',
    'Rameswaram',
    'Pollachi'
  ];

  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fromLoc.trim() || !toLoc.trim()) {
      setError('Please provide both Pickup (From) and Destination (To) locations.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await calculateRoute(fromLoc, toLoc);
      setResult(data);
      setActiveRouteType('fastest');
    } catch (err: any) {
      setError(err.message || 'Failed to calculate route. Please try another location.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyRoute = (route: SingleRoute, type: 'fastest' | 'toll_free') => {
    setActiveRouteType(type);
    if (onSelectRoute && result) {
      onSelectRoute({
        pickup: result.from_location,
        destination: result.to_location,
        routeType: type,
        distanceKm: route.distance_km,
        travelTime: route.travel_time,
        estimatedToll: route.estimated_toll
      });
      // Scroll to booking form
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="route-calculator" className="py-16 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            <span>Smart Trip Planner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Route Distance &amp; Toll Calculator
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Calculate real driving distance, estimated travel time, and compare fastest highway vs toll-free routes.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 shadow-lg shadow-slate-200/50 mb-10">
          <form onSubmit={handleCalculate} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              
              {/* From Location */}
              <div className="md:col-span-5 space-y-1.5 text-left">
                <label htmlFor="fromLocation" className="block text-xs font-bold text-slate-700">
                  From (Pickup Location)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="fromLocation"
                    value={fromLoc}
                    onChange={(e) => setFromLoc(e.target.value)}
                    placeholder="Enter pickup location (e.g. Coimbatore)"
                    required
                    className="w-full pl-10 pr-3 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

              {/* Arrow divider */}
              <div className="md:col-span-2 hidden md:flex items-center justify-center pt-5">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* To Location */}
              <div className="md:col-span-5 space-y-1.5 text-left">
                <label htmlFor="toLocation" className="block text-xs font-bold text-slate-700">
                  To (Destination)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-500">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="toLocation"
                    value={toLoc}
                    onChange={(e) => setToLoc(e.target.value)}
                    placeholder="Enter destination (e.g. Ooty, Chennai, Madurai)"
                    required
                    className="w-full pl-10 pr-3 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-xs"
                  />
                </div>
              </div>

            </div>

            {/* Quick destination suggestion buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-left">
              <span className="text-xs font-semibold text-slate-500">Quick Destination:</span>
              {popularDestinations.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => {
                    setToLoc(dest);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 text-xs font-medium text-slate-700 hover:text-amber-800 transition-colors shadow-xs"
                >
                  {dest}
                </button>
              ))}
            </div>

            {/* Submit / Calculate Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-md shadow-amber-500/25 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Calculating Road Distance &amp; Tolls...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5 fill-current" />
                    <span>Calculate Route</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3 text-left">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Route Calculation Error</div>
                  <div className="text-xs mt-0.5">{error}</div>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Calculation Results & Comparison */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* Route Summary Card */}
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/60 text-left space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                    Route Summary
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                    {result.from_location} &rarr; {result.to_location}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Fastest: {result.fastest_route.distance_km} km
                  </span>
                  {result.toll_free_route && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      Alt: {result.toll_free_route.distance_km} km
                    </span>
                  )}
                </div>
              </div>

              {/* Notice if completely toll-free unavailable */}
              {result.alternative_message && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Toll-Free Route Notice:</div>
                    <div>{result.alternative_message}</div>
                  </div>
                </div>
              )}

              {/* Side-by-side comparison table (as specified in Feature 2) */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/80">
                      <th className="py-3 px-4 text-xs font-bold text-slate-600 uppercase">
                        Feature
                      </th>
                      <th className="py-3 px-4 text-xs font-bold text-blue-700 uppercase bg-blue-50/50">
                        Fastest Route
                      </th>
                      <th className="py-3 px-4 text-xs font-bold text-amber-800 uppercase bg-amber-50/50">
                        {result.toll_free_available ? 'Toll-Free Route' : 'Alternative Route'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        Distance
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-blue-700 text-base bg-blue-50/30">
                        {result.fastest_route.distance_km} km
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-amber-800 text-base bg-amber-50/30">
                        {result.toll_free_route ? `${result.toll_free_route.distance_km} km` : 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        Travel Time
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 bg-blue-50/30">
                        {result.fastest_route.travel_time}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800 bg-amber-50/30">
                        {result.toll_free_route ? result.toll_free_route.travel_time : 'N/A'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        Estimated Toll
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs bg-blue-50/30">
                        {result.fastest_route.estimated_toll}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs bg-amber-50/30 font-medium">
                        {result.toll_free_route ? result.toll_free_route.estimated_toll : '?0'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        Action
                      </td>
                      <td className="py-3.5 px-4 bg-blue-50/30">
                        <button
                          type="button"
                          onClick={() => handleApplyRoute(result.fastest_route, 'fastest')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            activeRouteType === 'fastest'
                              ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                              : 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-300'
                          }`}
                        >
                          Use Fastest Route
                        </button>
                      </td>
                      <td className="py-3.5 px-4 bg-amber-50/30">
                        {result.toll_free_route ? (
                          <button
                            type="button"
                            onClick={() => handleApplyRoute(result.toll_free_route!, 'toll_free')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                              activeRouteType === 'toll_free'
                                ? 'bg-amber-600 text-white ring-2 ring-amber-400'
                                : 'bg-white hover:bg-amber-50 text-amber-800 border border-amber-300'
                            }`}
                          >
                            Use Toll-Free Route
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">Unavailable</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Interactive Route Map (Feature 3) */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-amber-600" />
                    <span>Interactive Driving Route Map</span>
                  </h4>
                  <span className="text-xs text-slate-500">
                    Pinch to zoom / pan on mobile
                  </span>
                </div>

                <RouteMap
                  fromCoords={result.from_coords}
                  toCoords={result.to_coords}
                  fromName={result.from_location}
                  toName={result.to_location}
                  fastestCoords={result.fastest_route.geometry}
                  tollFreeCoords={result.toll_free_route?.geometry}
                  activeRoute={activeRouteType}
                />
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
