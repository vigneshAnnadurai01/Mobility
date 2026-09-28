export interface SingleRoute {
  route_name: string;
  distance_km: number;
  travel_time: string;
  estimated_toll: string;
  toll_free_confirmed: boolean;
  summary_note?: string;
  geometry: [number, number][]; // [lat, lon]
}

export interface RouteComparisonResponse {
  from_location: string;
  to_location: string;
  from_coords: [number, number];
  to_coords: [number, number];
  fastest_route: SingleRoute;
  toll_free_route?: SingleRoute;
  toll_free_available: boolean;
  alternative_message?: string;
}

export interface BookingPayload {
  customer_name: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  trip_type: string;
  passengers: string;
  route_type?: string;
  distance_km?: number;
  travel_time?: string;
  estimated_toll?: string;
  notes?: string;
}

export interface BookingResult {
  id: number;
  booking_id: string;
  customer_name: string;
  phone: string;
  pickup: string;
  destination: string;
  date: string;
  time: string;
  trip_type: string;
  passengers: string;
  route_type?: string;
  distance_km?: number;
  travel_time?: string;
  estimated_toll?: string;
  status: string;
  has_conflict: boolean;
  conflict_message?: string;
  created_at: string;
}

export interface ReviewPayload {
  customer_name: string;
  phone?: string;
  rating: number;
  review_type?: string; // 'review' or 'complaint'
  review_text: string;
}

export interface ReviewItem {
  id: number;
  customer_name: string;
  phone?: string;
  rating: number;
  review_type: string;
  review_text: string;
  status: string;
  created_at: string;
}

export interface AdminSummaryData {
  today_enquiries: number;
  upcoming_trips: number;
  completed_trips: number;
  cancelled_trips: number;
  pending_reviews: number;
  total_bookings: number;
}

export async function calculateRoute(fromLocation: string, toLocation: string): Promise<RouteComparisonResponse> {
  const res = await fetch('/api/route', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from_location: fromLocation, to_location: toLocation })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to calculate route');
  }
  return res.json();
}

export async function createBooking(data: BookingPayload): Promise<BookingResult> {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to save booking enquiry');
  }
  return res.json();
}

export async function submitReview(data: ReviewPayload): Promise<ReviewItem> {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit review');
  }
  return res.json();
}

export async function getPublicReviews(): Promise<ReviewItem[]> {
  const res = await fetch('/api/reviews');
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export async function adminLogin(username: string, password: string): Promise<{ access_token: string; username: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Invalid login credentials');
  }
  return res.json();
}

export async function getAdminSummary(token: string): Promise<AdminSummaryData> {
  const res = await fetch('/api/auth/summary', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export async function getAdminBookings(token: string, statusFilter?: string, search?: string, dateFilter?: string): Promise<BookingResult[]> {
  const params = new URLSearchParams();
  if (statusFilter && statusFilter !== 'All') params.append('status_filter', statusFilter);
  if (search) params.append('search', search);
  if (dateFilter) params.append('date_filter', dateFilter);

  const res = await fetch(`/api/bookings?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function updateBookingStatus(token: string, bookingId: string, status: string): Promise<BookingResult> {
  const res = await fetch(`/api/bookings/${bookingId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update booking status');
  return res.json();
}

export async function getAdminReviews(token: string): Promise<ReviewItem[]> {
  const res = await fetch('/api/reviews/admin', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Failed to fetch reviews for admin');
  return res.json();
}

export async function moderateReview(token: string, reviewId: number, status: string, notes?: string): Promise<ReviewItem> {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status, admin_notes: notes })
  });
  if (!res.ok) throw new Error('Failed to moderate review');
  return res.json();
}
