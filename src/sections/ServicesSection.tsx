import React from 'react';
import { 
  MapPin, 
  Compass, 
  Plane, 
  ArrowRight, 
  Repeat, 
  Car, 
  MessageSquare, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/businessInfo';
import { getServiceBookingLink } from '../utils/whatsapp';

export const ServicesSection: React.FC = () => {
  const getIcon = (iconName: ServiceItem['iconName']) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-amber-600" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-amber-600" />;
      case 'Plane':
        return <Plane className="w-6 h-6 text-amber-600" />;
      case 'ArrowRight':
        return <ArrowRight className="w-6 h-6 text-amber-600" />;
      case 'Repeat':
        return <Repeat className="w-6 h-6 text-amber-600" />;
      case 'Car':
        return <Car className="w-6 h-6 text-amber-600" />;
      default:
        return <Car className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>Our Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Cab Services
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Whether you need a quick ride within Coimbatore or a safe outstation journey across Tamil Nadu, our Ertiga cab is ready 24/7.
          </p>
        </div>

        {/* Services Grid (6 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-200 hover:border-amber-400 p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/80 group hover:-translate-y-1"
            >
              <div>
                {/* Card Icon & Tagline */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-sm">
                    <span className="group-hover:text-slate-950 transition-colors">
                      {getIcon(service.iconName)}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
                    {service.tagline}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-amber-700 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Highlight */}
                <div className="mb-6 py-2 px-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-amber-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{service.highlight}</span>
                </div>
              </div>

              {/* Book Now Button (Opens WhatsApp) */}
              <div className="pt-2 border-t border-slate-200/80">
                <a
                  href={getServiceBookingLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white border border-emerald-300 hover:border-emerald-600 shadow-sm transition-all duration-200"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Book Now</span>
                  <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
