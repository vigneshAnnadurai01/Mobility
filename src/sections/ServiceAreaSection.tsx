import React from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Compass, 
  ArrowUpRight, 
  Info,
  Car,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { SERVICE_DESTINATIONS } from '../data/businessInfo';
import { getDestinationBookingLink } from '../utils/whatsapp';

export const ServiceAreaSection: React.FC = () => {
  const mapsLink = "https://www.google.com/maps/search/?api=1&query=Coimbatore%2C+Tamil+Nadu";

  return (
    <section id="service-area" className="py-16 sm:py-24 bg-slate-50 relative border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Famous Places &amp; Routes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Popular Service Destinations
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Serving Coimbatore and famous destinations across Tamil Nadu with our comfortable Maruti Suzuki Ertiga.
          </p>
        </div>

        {/* Famous Places / Destinations Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {SERVICE_DESTINATIONS.map((dest, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-amber-400"
            >
              <div>
                {/* Destination Famous Place Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={dest.image}
                    alt={`${dest.landmark} in ${dest.name}, Tamil Nadu`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category Tag Badge */}
                  {dest.tag && (
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-800 shadow-sm border border-slate-200">
                      {dest.tag}
                    </div>
                  )}

                  {/* Famous Place Name overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/85 via-slate-950/50 to-transparent p-3 pt-6 text-left">
                    <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span className="truncate">{dest.landmark}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {dest.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {dest.type}
                    </span>
                  </div>

                  {dest.popularNote && (
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {dest.popularNote}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button: Enquire via WhatsApp */}
              <div className="p-4 pt-0">
                <a
                  href={getDestinationBookingLink(dest.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-300 hover:border-emerald-600 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  <span>Enquire Cab</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Informational Clarification Alert */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Service Coverage Note:</strong> The above cities and famous places are popular examples and not an exhaustive list. We provide comfortable cab services from Coimbatore to any village, town, pilgrimage site, or city across all districts of Tamil Nadu.
          </p>
        </div>

        {/* Coimbatore Hub & Interactive Map Block */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl shadow-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Description */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Base Hub: Coimbatore</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Centrally Positioned in Coimbatore
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our base in Coimbatore allows prompt pickups from any locality, hotel, Coimbatore Railway Station, or Coimbatore International Airport (CJB). We connect seamlessly to all state highways for prompt travel.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 text-amber-400" />
                  <span>Open Coimbatore in Google Maps</span>
                </a>

                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
                >
                  <Car className="w-4 h-4" />
                  <span>Custom Route Enquiry</span>
                </a>
              </div>
            </div>

            {/* Right Map Embed */}
            <div className="lg:col-span-6">
              <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner relative">
                <iframe
                  title="Aravindha's 'v' Mobility - Coimbatore and Tamil Nadu Service Area"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.4417316715!2d76.88483281249998!3d11.0139625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
