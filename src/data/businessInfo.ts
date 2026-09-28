export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: 'MapPin' | 'Compass' | 'Plane' | 'ArrowRight' | 'Repeat' | 'Car';
  highlight: string;
}

export interface VehicleFeature {
  title: string;
  description: string;
  icon: 'Users' | 'Wind' | 'ShieldCheck' | 'Luggage' | 'MapPin' | 'HeartHandshake';
}

export interface WhyChooseUsItem {
  title: string;
  description: string;
  icon: 'Clock' | 'Smile' | 'Shield' | 'Map' | 'PlaneTakeoff' | 'Car' | 'MessageCircle' | 'HeartHandshake';
}

export interface DestinationItem {
  name: string;
  type: 'Hub' | 'Hill Station' | 'Metro' | 'City' | 'Heritage';
  tag?: string;
  landmark: string;
  image: string;
  popularNote?: string;
}

export const BUSINESS_INFO = {
  name: "Aravindha's \"v\" Mobility",
  shortName: "Aravindha's Mobility",
  brandMark: "v Mobility",
  phone: "7824983827",
  phoneFormatted: "+91 78249 83827",
  whatsapp: "7824983827",
  whatsappFormatted: "+91 78249 83827",
  primaryLocation: "Coimbatore, Tamil Nadu",
  serviceArea: "Coimbatore and all over Tamil Nadu",
  workingHours: "24/7 Available",
  pricingNote: "Contact for pricing",
  vehicleName: "Maruti Suzuki Ertiga",
  vehicleTagline: "Comfortable family-friendly seating with air conditioning",
  tagline: "Comfortable and reliable cab services from Coimbatore to destinations across Tamil Nadu.",
  aboutText: "Aravindha's \"v\" Mobility provides cab services from Coimbatore to destinations across Tamil Nadu, including local travel, airport transfers, one-way trips, round trips and outstation travel.",
  whatsappLinks: {
    generalChat: "https://wa.me/917824983827?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20cab%20service.",
    call: "tel:+917824983827"
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'local-cab',
    title: 'Local Cab',
    tagline: 'Within Coimbatore City & Suburbs',
    description: 'Comfortable local transportation within Coimbatore for shopping, hospital visits, family outings, and meetings.',
    iconName: 'MapPin',
    highlight: 'Point-to-point & hourly travel within city'
  },
  {
    id: 'outstation-cab',
    title: 'Outstation Cab',
    tagline: 'Across All Tamil Nadu',
    description: 'Travel across Tamil Nadu with comfortable long-distance cab service designed for hassle-free interstate and intercity trips.',
    iconName: 'Compass',
    highlight: 'Smooth highway journeys to any Tamil Nadu destination'
  },
  {
    id: 'airport-transfer',
    title: 'Airport Pickup & Drop',
    tagline: 'Coimbatore Airport (CJB) & Others',
    description: 'Reliable airport transportation with punctual pickups and drops so you never miss a flight or wait after landing.',
    iconName: 'Plane',
    highlight: 'Punctual 24/7 airport connections'
  },
  {
    id: 'one-way-trip',
    title: 'One Way Trip',
    tagline: 'Pay Only for One Direction',
    description: 'Convenient one-way travel between destinations across Tamil Nadu without having to pay unnecessary return charges.',
    iconName: 'ArrowRight',
    highlight: 'Affordable single destination transfers'
  },
  {
    id: 'round-trip',
    title: 'Round Trip',
    tagline: 'Same-day or Multi-day Tours',
    description: 'Flexible round-trip cab services for family vacations, temple tours, business visits, and weekend getaways.',
    iconName: 'Repeat',
    highlight: 'Dedicated vehicle at your schedule throughout the journey'
  },
  {
    id: 'custom-booking',
    title: 'Custom Cab Booking / Enquiry',
    tagline: 'Tailored Travel Plans',
    description: 'Contact us for customized travel requirements, multi-city itineraries, special family events, or emergency rides.',
    iconName: 'Car',
    highlight: 'Personalized route planning & transparent pricing'
  }
];

export const VEHICLE_DETAILS = {
  name: "Maruti Suzuki Ertiga",
  subtitle: "Premium Multi-Purpose Vehicle (MPV)",
  description: "Travel in complete peace of mind in our well-maintained Maruti Suzuki Ertiga. Engineered for spacious ride quality, supreme air-conditioned comfort, and ample luggage space for families and travelers.",
  features: [
    {
      title: "Comfortable Seating",
      description: "Comfortable family-friendly seating with ample legroom for relaxed journeys.",
      icon: "Users"
    },
    {
      title: "Air Conditioning",
      description: "Effective climate control keeping every row cool in Tamil Nadu heat.",
      icon: "Wind"
    },
    {
      title: "Family Travel Ready",
      description: "Suitable for family travel, elder comfort, luggage storage, and children.",
      icon: "HeartHandshake"
    },
    {
      title: "Local & Outstation Trips",
      description: "Equally smooth for congested city traffic and extended highway travel.",
      icon: "MapPin"
    },
    {
      title: "Luggage Space",
      description: "Accommodates suitcases and travel bags neatly in the dedicated boot space.",
      icon: "Luggage"
    },
    {
      title: "Safety & Cleanliness",
      description: "Hygienic, sanitised interiors driven with care and passenger safety first.",
      icon: "ShieldCheck"
    }
  ]
};

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    title: "24/7 Availability",
    description: "Round-the-clock booking and cab dispatch for early morning flights or late night trips.",
    icon: "Clock"
  },
  {
    title: "Comfortable Travel",
    description: "Enjoy chilled air conditioning and smooth suspension in our well-cared Ertiga.",
    icon: "Smile"
  },
  {
    title: "Reliable Service",
    description: "Committed to on-time arrivals, courteous communication, and dependable pickups.",
    icon: "Shield"
  },
  {
    title: "Tamil Nadu Coverage",
    description: "Direct service connecting Coimbatore with cities, towns, and scenic spots across the state.",
    icon: "Map"
  },
  {
    title: "Airport Transfers",
    description: "Dedicated airport pickup and drop assistance at Coimbatore International Airport (CJB).",
    icon: "PlaneTakeoff"
  },
  {
    title: "Local & Outstation Trips",
    description: "From quick hospital/shopping runs in Coimbatore to weekend hill station trips.",
    icon: "Car"
  },
  {
    title: "Easy Booking Through WhatsApp",
    description: "No complex forms or apps. Instant chat confirmation and route consultation on WhatsApp.",
    icon: "MessageCircle"
  },
  {
    title: "Customer-Focused Service",
    description: "Friendly, polite support that accommodates your stops, schedule, and passenger comfort.",
    icon: "HeartHandshake"
  }
];

export const SERVICE_DESTINATIONS: DestinationItem[] = [
  { 
    name: "Coimbatore", 
    type: "Hub", 
    tag: "Primary Hub", 
    landmark: "Adiyogi Shiva & Marudhamalai",
    image: "/images/destinations/coimbatore.jpg",
    popularNote: "City rides, Airport (CJB) & local sightseeing"
  },
  { 
    name: "Ooty", 
    type: "Hill Station", 
    tag: "Queen of Hills", 
    landmark: "Nilgiri Tea Gardens & Lake",
    image: "/images/destinations/ooty.jpg",
    popularNote: "Scenic hill route, Doddabetta & tea estates"
  },
  { 
    name: "Madurai", 
    type: "Heritage", 
    tag: "Temple City", 
    landmark: "Meenakshi Amman Temple",
    image: "/images/destinations/madurai.jpg",
    popularNote: "Heritage tour, temple darshan & family trips"
  },
  { 
    name: "Chennai", 
    type: "Metro", 
    tag: "State Capital", 
    landmark: "Chennai Central & Marina Beach",
    image: "/images/destinations/chennai.jpg",
    popularNote: "One-way drop & business corridor travel"
  },
  { 
    name: "Kodaikanal", 
    type: "Hill Station", 
    tag: "Princess of Hills", 
    landmark: "Kodai Star Lake & Pine Forests",
    image: "/images/destinations/kodaikanal.jpg",
    popularNote: "Refreshing cool climate & family holidays"
  },
  { 
    name: "Rameswaram", 
    type: "Heritage", 
    tag: "Pilgrim Corridor", 
    landmark: "Pamban Sea Bridge & Temple",
    image: "/images/destinations/rameswaram.jpg",
    popularNote: "Dhanushkodi, Pamban bridge & coastal tour"
  },
  { 
    name: "Kanyakumari", 
    type: "Heritage", 
    tag: "Southern Tip", 
    landmark: "Vivekananda Rock Memorial",
    image: "/images/destinations/kanyakumari.jpg",
    popularNote: "Tri-sea confluence & sunrise/sunset viewpoint"
  },
  { 
    name: "Trichy", 
    type: "City", 
    tag: "Central Hub", 
    landmark: "Rockfort Ucchi Pillayar",
    image: "/images/destinations/trichy.jpg",
    popularNote: "Srirangam temple & central highway corridor"
  },
  { 
    name: "Palani", 
    type: "Heritage", 
    tag: "Pilgrim Center", 
    landmark: "Palani Murugan Hill Temple",
    image: "/images/destinations/palani.jpg",
    popularNote: "Direct devotional trip & hassle-free return"
  },
  { 
    name: "Pollachi", 
    type: "City", 
    tag: "Anamalai Gateway", 
    landmark: "Topslip & Coconut Groves",
    image: "/images/destinations/pollachi.jpg",
    popularNote: "Nature getaway, Valparai route & village farms"
  },
  { 
    name: "Salem", 
    type: "City", 
    tag: "Highway Junction", 
    landmark: "Yercaud Lake & Ghat Road",
    image: "/images/destinations/salem.jpg",
    popularNote: "Expressway connectivity & Yercaud hills"
  },
  { 
    name: "Erode", 
    type: "City", 
    tag: "Express Route", 
    landmark: "Bhavani Sangameshwarar",
    image: "/images/destinations/tamilnadu.jpg",
    popularNote: "Commercial visits & textile trade route"
  },
  { 
    name: "Tiruppur", 
    type: "City", 
    tag: "Textile Corridor", 
    landmark: "Knitwear Hub & Noyyal",
    image: "/images/destinations/tamilnadu.jpg",
    popularNote: "Fast business transfers from Coimbatore"
  },
  { 
    name: "Other Tamil Nadu destinations", 
    type: "City", 
    tag: "Any Destination", 
    landmark: "Complete Tamil Nadu Coverage",
    image: "/images/destinations/tamilnadu.jpg",
    popularNote: "Custom routes to any town or district on request"
  }
];
