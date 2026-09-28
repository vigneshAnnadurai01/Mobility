import React, { useState } from 'react';
import { 
  Users, 
  Wind, 
  HeartHandshake, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Camera, 
  UploadCloud,
  Sparkles
} from 'lucide-react';
import { getVehicleBookingLink } from '../utils/whatsapp';

export const VehicleSection: React.FC = () => {
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
    }
  };

  return (
    <section id="vehicle" className="py-16 sm:py-24 bg-slate-50 relative border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Dedicated Fleet</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Maruti Suzuki Ertiga
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Travel in relaxed comfort with our spacious Maruti Suzuki Ertiga. Perfectly maintained for city commutes and long-distance Tamil Nadu travel.
          </p>
        </div>

        {/* Vehicle Showcase Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-xl shadow-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
            
            {/* Left: Vehicle Image & Photo Upload Helper */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10] border border-slate-200 group shadow-md">
                <img
                  src={customPhotoUrl || '/images/ertiga.jpg'}
                  alt="Maruti Suzuki Ertiga cab operated by Aravindha's 'v' Mobility"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Maruti Suzuki Ertiga</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 flex items-center justify-between text-xs text-white">
                  <span>Air Conditioned Multi-Purpose Vehicle</span>
                  <span className="text-emerald-400 font-bold">Ready for Travel</span>
                </div>
              </div>

              {/* Owner Vehicle Photo Upload / Replace Notice */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Showing Maruti Suzuki Ertiga. You can also preview your actual vehicle photo:</span>
                </div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold whitespace-nowrap shadow-xs transition-colors">
                  <UploadCloud className="w-3.5 h-3.5 text-amber-600" />
                  <span>{customPhotoUrl ? 'Change Photo' : 'Upload Vehicle Photo'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Right: Specifications & Key Attributes */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Spacious, Reliable &amp; Well-Maintained
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                  Engineered for a smooth passenger experience across state highways and hill roads alike. Spotlessly sanitized before every journey.
                </p>
              </div>

              {/* Verified Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Feature 1 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span>Comfortable Seating</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Comfortable family-friendly seating designed for relaxing road trips.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <Wind className="w-4 h-4 text-amber-600" />
                    <span>Air Conditioning</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Dual AC vents providing chilled airflow for all passengers.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <HeartHandshake className="w-4 h-4 text-amber-600" />
                    <span>Suitable for Family Travel</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Spacious cabin ideal for elderly family members, luggage, and kids.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>Local &amp; Outstation Trips</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Dependable highway performance and easy city navigation.
                  </p>
                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={getVehicleBookingLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all text-base transform hover:-translate-y-0.5"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Book Ertiga</span>
                </a>

                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 text-sm shadow-xs transition-all"
                >
                  <span>Quick Enquiry Form</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
