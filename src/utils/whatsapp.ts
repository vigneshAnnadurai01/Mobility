import { BUSINESS_INFO } from '../data/businessInfo';

export interface BookingFormData {
  name: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  travelDate: string;
  travelTime: string;
  tripType: string;
  passengers: string;
  bookingId?: string;
  routeType?: string;
  distanceKm?: number;
  travelTimeEst?: string;
}

const WHATSAPP_PHONE = '91' + BUSINESS_INFO.whatsapp;

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export function getGeneralEnquiryLink(): string {
  return buildWhatsAppLink("Hello, I would like to enquire about cab service.");
}

export function getServiceBookingLink(serviceTitle: string): string {
  const message = `Hello Aravindha's "v" Mobility, I would like to enquire about booking your *${serviceTitle}* cab service.`;
  return buildWhatsAppLink(message);
}

export function getVehicleBookingLink(): string {
  const message = `Hello Aravindha's "v" Mobility, I would like to enquire about booking your *Maruti Suzuki Ertiga* cab for my travel.`;
  return buildWhatsAppLink(message);
}

export function getDestinationBookingLink(destination: string): string {
  const message = `Hello Aravindha's "v" Mobility, I would like to enquire about a cab ride between Coimbatore and *${destination}*.`;
  return buildWhatsAppLink(message);
}

/**
 * Builds the WhatsApp message matching Feature 4 specification
 */
export function buildBookingEnquiryMessage(data: BookingFormData): string {
  const lines: string[] = [
    "Hello, I would like to book a cab."
  ];

  if (data.bookingId) {
    lines.push("");
    lines.push("Booking ID:");
    lines.push(data.bookingId);
  }

  lines.push("");
  lines.push("Name:");
  lines.push(data.name || 'Not specified');

  lines.push("");
  lines.push("Phone:");
  lines.push(data.phone || 'Not specified');

  lines.push("");
  lines.push("Pickup:");
  lines.push(data.pickupLocation || 'Coimbatore');

  lines.push("");
  lines.push("Destination:");
  lines.push(data.dropLocation || 'Tamil Nadu');

  lines.push("");
  lines.push("Date:");
  lines.push(data.travelDate || 'Earliest available');

  lines.push("");
  lines.push("Time:");
  lines.push(data.travelTime || 'Flexible');

  lines.push("");
  lines.push("Trip Type:");
  lines.push(data.tripType || 'One Way');

  lines.push("");
  lines.push("Passengers:");
  lines.push(data.passengers || '4');

  if (data.routeType) {
    lines.push("");
    lines.push("Preferred Route:");
    lines.push(data.routeType === 'toll_free' ? 'Toll-Free / Alternative Route' : 'Fastest Route');
  }

  if (data.distanceKm) {
    lines.push("");
    lines.push("Estimated Distance:");
    lines.push(`${data.distanceKm} km (${data.travelTimeEst || ''})`);
  }

  lines.push("");
  lines.push("Vehicle Preferred:");
  lines.push("Maruti Suzuki Ertiga (AC)");

  lines.push("");
  lines.push("Please confirm availability and trip details. Thank you!");

  return lines.join('\n');
}

export function getBookingEnquiryLink(data: BookingFormData): string {
  const text = buildBookingEnquiryMessage(data);
  return buildWhatsAppLink(text);
}
