import React from 'react';
import { 
  Clock, 
  Smile, 
  ShieldCheck, 
  Map, 
  Plane, 
  Car, 
  MessageCircle, 
  HeartHandshake 
} from 'lucide-react';
import { WHY_CHOOSE_US, WhyChooseUsItem } from '../data/businessInfo';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconType: WhyChooseUsItem['icon']) => {
    switch (iconType) {
      case 'Clock':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'Smile':
        return <Smile className="w-5 h-5 text-amber-600" />;
      case 'Shield':
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case 'Map':
        return <Map className="w-5 h-5 text-amber-600" />;
      case 'PlaneTakeoff':
        return <Plane className="w-5 h-5 text-amber-600" />;
      case 'Car':
        return <Car className="w-5 h-5 text-amber-600" />;
      case 'MessageCircle':
        return <MessageCircle className="w-5 h-5 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-amber-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>Commitment to Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Dedicated to providing dependable, courteous, and hassle-free travel across Coimbatore and Tamil Nadu.
          </p>
        </div>

        {/* 8 Grid items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/20 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-start group"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-xs">
                <span className="group-hover:text-slate-950 transition-colors">
                  {getIcon(item.icon)}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-amber-800 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
