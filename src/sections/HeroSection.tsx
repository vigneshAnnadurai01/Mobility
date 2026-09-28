import React from 'react';
import { ArrowRight, Phone, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralEnquiryLink } from '../utils/whatsapp';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-sky-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 24/7 Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>24/7 Cab Service</span>
              <span className="text-amber-300">�</span>
              <span>Coimbatore &amp; Tamil Nadu</span>
            </div>

            {/* Main H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Reliable Cab Service Across{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
                Tamil Nadu
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Comfortable and reliable cab services from Coimbatore to destinations across Tamil Nadu.
            </p>

            {/* Key feature pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-4 pt-1 text-xs sm:text-sm text-slate-700">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Maruti Suzuki Ertiga
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Family-Friendly AC Comfort
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Airport &amp; Outstation Trips
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 text-base"
              >
                <span>Book a Cab</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href={getGeneralEnquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-700/25 transition-all text-base border border-emerald-500/30"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappLinks.call}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition-all text-base sm:hidden"
              >
                <Phone className="w-4 h-4 text-amber-600 fill-current" />
                <span>Call {BUSINESS_INFO.phoneFormatted}</span>
              </a>
            </div>

            {/* Notice / Pricing pill */}
            <div className="pt-2 text-xs text-slate-500 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Pricing: <strong className="text-slate-800">{BUSINESS_INFO.pricingNote}</strong></span>
              <span className="text-slate-400">�</span>
              <span>Prompt reply on WhatsApp &amp; Call</span>
            </div>
          </div>

          {/* Right Column: Maruti Suzuki Ertiga Vehicle Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Vehicle Card Container */}
              <div className="relative rounded-2xl bg-white border border-slate-200/90 p-3 sm:p-4 shadow-xl shadow-slate-200/60">
                
                {/* Vehicle Header Tag */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                      OUR VEHICLE
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Maruti Suzuki Ertiga
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Clean &amp; Sanitised
                  </span>
                </div>

                {/* Vehicle Image */}
                <div className="relative mt-3 rounded-xl overflow-hidden bg-slate-100 aspect-[16/9] group border border-slate-200">
                  <img
                    src="/images/ertiga.jpg"
                    alt="Maruti Suzuki Ertiga cab operated by Aravindha's 'v' Mobility in Coimbatore and Tamil Nadu"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  
                  {/* Subtle vehicle overlay label */}
                  <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-white">Maruti Suzuki Ertiga</span>
                    <span className="text-amber-400 font-medium">Family-Friendly AC</span>
                  </div>
                </div>

                {/* Vehicle Key Highlights */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
                    <div className="text-[11px] text-slate-500">Seating</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">Family-friendly</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-left">
                    <div className="text-[11px] text-slate-500">Comfort</div>
                    <div className="text-xs font-bold text-slate-800 mt-0.5">Full AC Cabin</div>
                  </div>
                </div>

                {/* Callout */}
                <div className="mt-3 text-center">
                  <a
                    href="#vehicle"
                    className="text-xs text-amber-700 hover:text-amber-800 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <span>View full vehicle features &amp; details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
