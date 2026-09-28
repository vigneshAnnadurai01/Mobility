import React from 'react';
import { MapPin, Clock, Car } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 sm:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          {/* Subtle background ambient warmth */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span>About Us</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {BUSINESS_INFO.name}
            </h2>

            {/* Exact required wording */}
            <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
              {BUSINESS_INFO.aboutText}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We focus on prompt response times, comfortable vehicles, courteous communication, and safe driving habits. Whether you need a short city trip or an extensive tour across Tamil Nadu, we ensure your journey is comfortable from start to finish.
            </p>

            {/* Grounded Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center flex-shrink-0 text-amber-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Availability</div>
                  <div className="text-sm font-bold text-slate-900">24/7 Operations</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center flex-shrink-0 text-amber-700">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Vehicle</div>
                  <div className="text-sm font-bold text-slate-900">Maruti Suzuki Ertiga</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center flex-shrink-0 text-amber-700">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Operational Base</div>
                  <div className="text-sm font-bold text-slate-900">Coimbatore, Tamil Nadu</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
