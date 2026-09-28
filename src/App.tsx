import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './sections/HeroSection';
import { RouteCalculatorSection } from './sections/RouteCalculatorSection';
import { BookingSection } from './sections/BookingSection';
import { ServicesSection } from './sections/ServicesSection';
import { VehicleSection } from './sections/VehicleSection';
import { ServiceAreaSection } from './sections/ServiceAreaSection';
import { ReviewsSection } from './sections/ReviewsSection';
import { WhyChooseUsSection } from './sections/WhyChooseUsSection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AdminDashboard } from './components/AdminDashboard';

export function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<{
    pickup: string;
    destination: string;
    routeType: 'fastest' | 'toll_free';
    distanceKm: number;
    travelTime: string;
    estimatedToll: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header */}
      <Header onOpenAdmin={() => setAdminOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Route Distance & Toll Calculator (Feature 1, 2, 3) */}
        <RouteCalculatorSection onSelectRoute={(data) => setSelectedRoute(data)} />

        {/* 3. Quick Booking Enquiry Form with Booking ID & Double-booking check (Feature 4, 8) */}
        <BookingSection prefillRoute={selectedRoute} />

        {/* 4. Services Section */}
        <ServicesSection />

        {/* 5. Our Vehicle (Maruti Suzuki Ertiga) */}
        <VehicleSection />

        {/* 6. Popular Service Destinations with Famous Places Photos */}
        <ServiceAreaSection />

        {/* 7. Customer Reviews & Immediate Action Complaints (Feature 9, 10) */}
        <ReviewsSection />

        {/* 8. Why Choose Us */}
        <WhyChooseUsSection />

        {/* 9. About Us */}
        <AboutSection />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Persistent WhatsApp Floating Button */}
      <FloatingWhatsApp />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar />

      {/* Admin Management Dashboard Modal (Feature 5, 6, 7) */}
      <AdminDashboard isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
}

export default App;
