import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { getGeneralEnquiryLink } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 hidden sm:flex items-center gap-2 bg-white border border-emerald-300 text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-xl animate-bounce duration-1000">
          <span className="font-medium">Chat with us on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-700 focus:outline-none"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getGeneralEnquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-700/40 border-2 border-emerald-200 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Chat on WhatsApp with Aravindha's 'v' Mobility"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 group-hover:opacity-60 blur-sm animate-ping pointer-events-none" />
        <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10" />
      </a>
    </div>
  );
};
