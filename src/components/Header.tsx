import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, MessageSquare, Lock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { getGeneralEnquiryLink } from '../utils/whatsapp';

interface HeaderProps {
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Route Calculator', href: '#route-calculator' },
    { name: 'Our Vehicle', href: '#vehicle' },
    { name: 'Destinations', href: '#service-area' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-3'
          : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/60 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Aravindha's 'v' Mobility Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-slate-950 font-black text-xl tracking-tighter">V</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                Aravindha's <span className="text-amber-600">"v"</span> Mobility
              </span>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                Cab Service • Coimbatore &amp; TN
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-500 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
                title="Admin Portal"
                aria-label="Admin Portal"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            <a
              href={getGeneralEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 transition-all shadow-xs"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-current" />
              <span>WhatsApp</span>
            </a>

            <a
              href={BUSINESS_INFO.whatsappLinks.call}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex sm:hidden items-center gap-2">
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
                title="Admin"
              >
                <Lock className="w-4 h-4" />
              </button>
            )}

            <a
              href={BUSINESS_INFO.whatsappLinks.call}
              className="p-2 rounded-lg bg-amber-500 text-slate-950 shadow-sm"
              aria-label="Call Now"
            >
              <Phone className="w-4 h-4 fill-current" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl text-left">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-amber-600 hover:bg-amber-50/60 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href={BUSINESS_INFO.whatsappLinks.call}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
            >
              <Phone className="w-4 h-4 fill-current" />
              <span>Call: {BUSINESS_INFO.phoneFormatted}</span>
            </a>
            <a
              href={getGeneralEnquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Us: {BUSINESS_INFO.whatsappFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
