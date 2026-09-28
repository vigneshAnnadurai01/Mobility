import React from 'react';
import { Car, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/businessInfo';
import { getGeneralEnquiryLink, getServiceBookingLink } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 pb-20 sm:pb-8 pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center shadow-md">
                <span className="text-slate-950 font-black text-lg">V</span>
              </div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                Aravindha's <span className="text-amber-600">"v"</span> Mobility
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Cab services from Coimbatore across Tamil Nadu. Dedicated to comfortable, reliable, and family-friendly road transportation.
            </p>

            <div className="text-xs text-amber-800 font-bold flex items-center gap-1.5">
              <Car className="w-4 h-4 text-amber-600" />
              <span>Maruti Suzuki Ertiga � 24/7 Service</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#hero" className="hover:text-amber-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#vehicle" className="hover:text-amber-600 transition-colors">
                  Vehicle (Maruti Ertiga)
                </a>
              </li>
              <li>
                <a href="#service-area" className="hover:text-amber-600 transition-colors">
                  Popular Destinations
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-600 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services List */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={getServiceBookingLink(s.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-600 transition-colors inline-flex items-center gap-1"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Connect 24/7
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-500 block font-medium">Phone:</span>
                <a
                  href={BUSINESS_INFO.whatsappLinks.call}
                  className="font-bold text-slate-900 hover:text-amber-600 transition-colors"
                >
                  {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>

              <div>
                <span className="text-xs text-slate-500 block font-medium">WhatsApp:</span>
                <a
                  href={getGeneralEnquiryLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                >
                  {BUSINESS_INFO.whatsappFormatted}
                </a>
              </div>

              <div>
                <span className="text-xs text-slate-500 block font-medium">Service Area:</span>
                <span className="text-slate-700 font-medium">Coimbatore &amp; Tamil Nadu</span>
              </div>

              <div>
                <span className="text-xs text-slate-500 block font-medium">Pricing:</span>
                <span className="text-amber-800 font-bold">{BUSINESS_INFO.pricingNote}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <p className="text-slate-500">
            Professional cab service in Coimbatore and across Tamil Nadu.
          </p>
        </div>

      </div>
    </footer>
  );
};
