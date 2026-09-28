import React from 'react';
import { 
  Phone, 
  MessageSquare, 
  Clock, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralEnquiryLink } from '../utils/whatsapp';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact Us
          </h2>
          <p className="text-slate-600 text-base">
            Reach out directly by phone or WhatsApp for quick cab enquiries, fares, and instant ride scheduling.
          </p>
        </div>

        {/* Contact Info Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xl shadow-slate-200/60 space-y-8">
          
          {/* Top Brand Name */}
          <div className="text-center sm:text-left border-b border-slate-200 pb-6">
            <span className="text-xs font-bold tracking-wider text-amber-700 uppercase">
              Registered Cab Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {BUSINESS_INFO.name}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Reliable Maruti Suzuki Ertiga cab service operating from Coimbatore across Tamil Nadu.
            </p>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Phone */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <Phone className="w-4 h-4 text-amber-600" />
                <span>Phone</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 tracking-wide">
                {BUSINESS_INFO.phoneFormatted}
              </div>
              <div className="text-[11px] text-slate-500">Direct voice call</div>
            </div>

            {/* WhatsApp */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 tracking-wide">
                {BUSINESS_INFO.whatsappFormatted}
              </div>
              <div className="text-[11px] text-slate-500">Instant chat &amp; quote</div>
            </div>

            {/* Service Area */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Service Area</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900">
                Coimbatore &amp; Tamil Nadu
              </div>
              <div className="text-[11px] text-slate-500">All districts covered</div>
            </div>

            {/* Availability */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Availability</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900">
                24/7 Operations
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold">Open round-the-clock</div>
            </div>

          </div>

          {/* Pricing Note */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-800">
            <div>
              <span className="text-slate-600 font-medium">Pricing Policy:</span>{' '}
              <strong className="text-amber-900 font-bold">{BUSINESS_INFO.pricingNote}</strong>
              <span className="text-slate-500 hidden sm:inline"> � Custom quotes based on your exact route &amp; duration.</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-white text-slate-800 text-xs font-semibold border border-slate-200 shadow-xs">
              Vehicle: Maruti Suzuki Ertiga (AC)
            </span>
          </div>

          {/* Action Buttons: Call Now & WhatsApp Now */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            
            <a
              href={BUSINESS_INFO.whatsappLinks.call}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-xl shadow-amber-500/25 transition-all text-base transform hover:-translate-y-0.5"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>Call Now</span>
            </a>

            <a
              href={getGeneralEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-700/20 border border-emerald-500/30 transition-all text-base transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>WhatsApp Now</span>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
