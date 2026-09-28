import React, { useState, useEffect } from 'react';
import { 
  Send, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  Phone, 
  User, 
  Compass, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MessageSquare
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { BookingFormData, getBookingEnquiryLink } from '../utils/whatsapp';
import { createBooking } from '../utils/api';

interface BookingSectionProps {
  prefillRoute?: {
    pickup: string;
    destination: string;
    routeType: 'fastest' | 'toll_free';
    distanceKm: number;
    travelTime: string;
    estimatedToll: string;
  } | null;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ prefillRoute }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    pickupLocation: 'Coimbatore',
    dropLocation: '',
    travelDate: '',
    travelTime: '08:00',
    tripType: 'One Way',
    passengers: '4'
  });

  const [bookingId, setBookingId] = useState<string | null>(null);
  const [hasConflict, setHasConflict] = useState(false);
  const [conflictMsg, setConflictMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefillRoute) {
      setFormData((prev) => ({
        ...prev,
        pickupLocation: prefillRoute.pickup || prev.pickupLocation,
        dropLocation: prefillRoute.destination || prev.dropLocation,
        routeType: prefillRoute.routeType,
        distanceKm: prefillRoute.distanceKm,
        travelTimeEst: prefillRoute.travelTime,
      }));
    }
  }, [prefillRoute]);

  const tripTypes = [
    'Local',
    'One Way',
    'Round Trip',
    'Outstation',
    'Airport Pickup',
    'Airport Drop'
  ];

  const passengerOptions = [
    '1 Passenger',
    '2 Passengers',
    '3 Passengers',
    '4 Passengers',
    '5 Passengers',
    '6 Passengers',
    '7 Passengers',
    'Family with Luggage'
  ];

  const quickRoutes = [
    { label: 'Coimbatore → Ooty', pickup: 'Coimbatore', drop: 'Ooty', type: 'Outstation' },
    { label: 'Coimbatore → Airport (CJB)', pickup: 'Coimbatore City', drop: 'Coimbatore Airport (CJB)', type: 'Airport Drop' },
    { label: 'Airport → City / Hotel', pickup: 'Coimbatore Airport (CJB)', drop: 'Coimbatore City', type: 'Airport Pickup' },
    { label: 'Coimbatore → Madurai', pickup: 'Coimbatore', drop: 'Madurai', type: 'One Way' },
    { label: 'Coimbatore → Chennai', pickup: 'Coimbatore', drop: 'Chennai', type: 'One Way' },
    { label: 'Coimbatore → Pollachi', pickup: 'Coimbatore', drop: 'Pollachi', type: 'Round Trip' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickRoute = (route: typeof quickRoutes[0]) => {
    setFormData((prev) => ({
      ...prev,
      pickupLocation: route.pickup,
      dropLocation: route.drop,
      tripType: route.type
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Call backend to record booking & generate dynamic Booking ID (AVM-YYYYMMDD-XXX)
      const res = await createBooking({
        customer_name: formData.name,
        phone: formData.phone,
        pickup: formData.pickupLocation,
        destination: formData.dropLocation,
        date: formData.travelDate,
        time: formData.travelTime,
        trip_type: formData.tripType,
        passengers: formData.passengers,
        route_type: formData.routeType,
        distance_km: formData.distanceKm,
        travel_time: formData.travelTimeEst,
      });

      setBookingId(res.booking_id);
      setHasConflict(res.has_conflict);
      setConflictMsg(res.conflict_message || null);
      setSubmitted(true);

      // 2. Build WhatsApp deep link with Booking ID included
      const updatedFormData = {
        ...formData,
        bookingId: res.booking_id
      };

      const waLink = getBookingEnquiryLink(updatedFormData);
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } catch (err: any) {
      // If backend offline, generate fallback ID client-side
      const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const fallbackId = `AVM-${todayStr}-${Math.floor(100 + Math.random() * 900)}`;
      setBookingId(fallbackId);
      setSubmitted(true);

      const updatedFormData = {
        ...formData,
        bookingId: fallbackId
      };
      const waLink = getBookingEnquiryLink(updatedFormData);
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Fast &amp; Direct Booking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quick Booking Enquiry
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Fill in your travel details below. A unique Booking ID will be generated and you will connect straight to our WhatsApp at <strong>{BUSINESS_INFO.phoneFormatted}</strong>.
          </p>
        </div>

        {/* Selected Route Badge (if from calculator) */}
        {formData.distanceKm && (
          <div className="mb-6 p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs sm:text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Selected Route: <strong>{formData.pickupLocation} &rarr; {formData.dropLocation}</strong> ({formData.distanceKm} km, ~{formData.travelTimeEst})</span>
            </div>
            <span className="font-bold text-blue-700 capitalize">
              {formData.routeType === 'toll_free' ? 'Toll-Free Route' : 'Fastest Route'}
            </span>
          </div>
        )}

        {/* Quick Route Shortcuts */}
        <div className="mb-6">
          <div className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Popular Route Shortcuts (Tap to auto-fill):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickRoutes.map((route, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleQuickRoute(route)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 text-slate-700 hover:text-amber-800 hover:border-amber-300 shadow-sm transition-all cursor-pointer"
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Form Card */}
        <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl shadow-slate-200/60">
          
          {/* Double Booking Warning (Feature 8) */}
          {hasConflict && (
            <div className="mb-6 p-4 rounded-xl bg-amber-50 border-2 border-amber-400 text-amber-900 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">Slot Availability Notice</div>
                <div className="text-xs sm:text-sm mt-0.5">
                  {conflictMsg || "This time slot may already be booked. Please contact us for availability."}
                </div>
              </div>
            </div>
          )}

          {/* Booking Confirmation Box (Feature 4) */}
          {submitted && bookingId && (
            <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Booking Enquiry Received</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200 text-sm">
                <span className="text-xs text-slate-500 block">Booking Reference ID:</span>
                <span className="font-mono text-base font-extrabold text-emerald-700">{bookingId}</span>
              </div>
              <p className="text-xs text-slate-600">
                We will contact you shortly to confirm your trip. Opening WhatsApp with pre-filled enquiry.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="name" className="block text-xs font-bold text-slate-700">
                  Your Name <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="phone" className="block text-xs font-bold text-slate-700">
                  Phone Number <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 7824983827"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Pickup & Drop Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="pickupLocation" className="block text-xs font-bold text-slate-700">
                  Pickup Location <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    required
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    placeholder="e.g. Gandhipuram, Coimbatore"
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="dropLocation" className="block text-xs font-bold text-slate-700">
                  Drop Location <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-600">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="dropLocation"
                    name="dropLocation"
                    required
                    value={formData.dropLocation}
                    onChange={handleChange}
                    placeholder="e.g. Ooty, Chennai, Madurai, Airport..."
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Travel Date & Travel Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="travelDate" className="block text-xs font-bold text-slate-700">
                  Travel Date <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    required
                    min={today}
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="travelTime" className="block text-xs font-bold text-slate-700">
                  Travel Time <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <input
                    type="time"
                    id="travelTime"
                    name="travelTime"
                    required
                    value={formData.travelTime}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Row 4: Trip Type & Number of Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 text-left">
                <label htmlFor="tripType" className="block text-xs font-bold text-slate-700">
                  Trip Type <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Car className="w-4 h-4" />
                  </div>
                  <select
                    id="tripType"
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  >
                    {tripTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="passengers" className="block text-xs font-bold text-slate-700">
                  Number of Passengers <span className="text-amber-600">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <select
                    id="passengers"
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
                  >
                    {passengerOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Vehicle Assigned Notice */}
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">Vehicle Allocated:</span>
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-amber-700" />
                Maruti Suzuki Ertiga (AC MPV)
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 shadow-xl shadow-emerald-700/20 border border-emerald-500/30 flex items-center justify-center gap-3 text-base sm:text-lg transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-5 h-5 fill-current" />
                <span>{isSubmitting ? 'Generating Booking ID...' : 'Send Booking Enquiry on WhatsApp'}</span>
              </button>
            </div>

            {/* Info footer */}
            <div className="text-center space-y-1 pt-1">
              <p className="text-xs text-slate-500">
                Direct WhatsApp link to <strong>{BUSINESS_INFO.whatsappFormatted}</strong>. Generates official Booking ID reference.
              </p>
              <p className="text-[11px] text-slate-400">
                {BUSINESS_INFO.pricingNote}  Transparent pricing with no hidden charges.
              </p>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
