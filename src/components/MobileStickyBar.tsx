import React from 'react';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralEnquiryLink } from '../utils/whatsapp';

export const MobileStickyBar: React.FC = () => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center gap-2 shadow-2xl">
      <a
        href={BUSINESS_INFO.whatsappLinks.call}
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs bg-amber-500 active:bg-amber-600 text-slate-950 shadow-md transition-colors"
      >
        <Phone className="w-4 h-4 fill-current" />
        <span>Call Now</span>
      </a>

      <a
        href={getGeneralEnquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-bold text-xs bg-emerald-600 active:bg-emerald-700 text-white shadow-md transition-colors border border-emerald-400/30"
      >
        <MessageSquare className="w-4 h-4 fill-current" />
        <span>WhatsApp</span>
      </a>

      <a
        href="#booking"
        className="px-3 py-3 rounded-xl bg-slate-100 active:bg-slate-200 text-amber-700 border border-slate-300 flex items-center justify-center shadow-xs"
        aria-label="Book a cab"
      >
        <Calendar className="w-4 h-4" />
      </a>
    </div>
  );
};
