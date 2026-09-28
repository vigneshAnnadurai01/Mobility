import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Phone, 
  MapPin, 
  Star, 
  MessageSquare, 
  LogOut,
  RefreshCw,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { 
  adminLogin, 
  getAdminSummary, 
  getAdminBookings, 
  updateBookingStatus, 
  getAdminReviews, 
  moderateReview,
  AdminSummaryData,
  BookingResult,
  ReviewItem
} from '../utils/api';
import { BookingCalendar } from './BookingCalendar';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('avm_admin_token'));
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  // Tabs: 'bookings' | 'calendar' | 'reviews'
  const [activeTab, setActiveTab] = useState<'bookings' | 'calendar' | 'reviews'>('bookings');

  // Data states
  const [summary, setSummary] = useState<AdminSummaryData | null>(null);
  const [bookings, setBookings] = useState<BookingResult[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filter & Search states
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async (activeAuthToken: string) => {
    setLoadingData(true);
    try {
      const [sum, bList, rList] = await Promise.all([
        getAdminSummary(activeAuthToken),
        getAdminBookings(activeAuthToken, statusFilter, searchQuery),
        getAdminReviews(activeAuthToken)
      ]);
      setSummary(sum);
      setBookings(bList);
      setReviews(rList);
    } catch (err: any) {
      if (err.message.includes('Unauthorized') || err.message.includes('expired')) {
        handleLogout();
      }
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadData(token);
    }
  }, [token, statusFilter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setAuthError(null);
    try {
      const res = await adminLogin(username, password);
      sessionStorage.setItem('avm_admin_token', res.access_token);
      setToken(res.access_token);
      loadData(res.access_token);
    } catch (err: any) {
      setAuthError(err.message || 'Incorrect credentials');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('avm_admin_token');
    setToken(null);
    setSummary(null);
    setBookings([]);
    setReviews([]);
    setPassword('');
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    if (!token) return;
    try {
      await updateBookingStatus(token, bookingId, newStatus);
      loadData(token);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleModerate = async (reviewId: number, newStatus: string) => {
    if (!token) return;
    try {
      await moderateReview(token, reviewId, newStatus);
      loadData(token);
    } catch (err: any) {
      alert(err.message || 'Failed to moderate review');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-auto">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
              V
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Aravindha's "v" Mobility — Management Portal
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                Admin Dashboard &amp; Dispatcher
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!token ? (
          /* Login Screen (Feature 5) */
          <div className="p-8 sm:p-12 max-w-md mx-auto my-8 text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Admin Sign In</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your credentials to manage cab bookings, calendars, and reviews.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="admin"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-500"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={loggingIn}
                className="w-full py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors disabled:opacity-50"
              >
                {loggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-center">
                Default credentials: <strong>admin</strong> / <strong>admin@aravindha2026</strong>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Summary Cards Row (Feature 5) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-left">
                <span className="text-[11px] font-bold text-blue-700 uppercase">Today's Enquiries</span>
                <div className="text-2xl font-black text-blue-900 mt-1">
                  {summary ? summary.today_enquiries : 0}
                </div>
                <span className="text-[10px] text-blue-600 font-medium">Total Bookings: {summary?.total_bookings || 0}</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left">
                <span className="text-[11px] font-bold text-amber-800 uppercase">Upcoming Trips</span>
                <div className="text-2xl font-black text-amber-900 mt-1">
                  {summary ? summary.upcoming_trips : 0}
                </div>
                <span className="text-[10px] text-amber-700 font-medium">Confirmed slots</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-left">
                <span className="text-[11px] font-bold text-emerald-800 uppercase">Completed Trips</span>
                <div className="text-2xl font-black text-emerald-900 mt-1">
                  {summary ? summary.completed_trips : 0}
                </div>
                <span className="text-[10px] text-emerald-700 font-medium">Fulfilled rides</span>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-left">
                <span className="text-[11px] font-bold text-rose-800 uppercase">Cancelled Trips</span>
                <div className="text-2xl font-black text-rose-900 mt-1">
                  {summary ? summary.cancelled_trips : 0}
                </div>
                <span className="text-[10px] text-rose-700 font-medium">Pending reviews: {summary?.pending_reviews || 0}</span>
              </div>

            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ?? Bookings Management ({bookings.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('calendar')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'calendar'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ?? Booking Calendar
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors relative ${
                  activeTab === 'reviews'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ? Review &amp; Complaints Moderation
                {summary && summary.pending_reviews > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-red-500 text-white">
                    {summary.pending_reviews}
                  </span>
                )}
              </button>
            </div>

            {/* TAB 1: BOOKINGS MANAGEMENT (Feature 6) */}
            {activeTab === 'bookings' && (
              <div className="space-y-4 text-left">
                
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search ID, Customer, Phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && token) loadData(token);
                      }}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                          statusFilter === st
                            ? 'bg-amber-500 text-slate-950 shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => token && loadData(token)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Refresh"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop Bookings Table */}
                <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                      <tr>
                        <th className="py-3 px-3.5">Booking ID</th>
                        <th className="py-3 px-3.5">Customer</th>
                        <th className="py-3 px-3.5">Phone</th>
                        <th className="py-3 px-3.5">Route</th>
                        <th className="py-3 px-3.5">Date &amp; Time</th>
                        <th className="py-3 px-3.5">Trip Type</th>
                        <th className="py-3 px-3.5">Status</th>
                        <th className="py-3 px-3.5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-400">
                            No bookings matching filter.
                          </td>
                        </tr>
                      ) : (
                        bookings.map((b) => (
                          <tr key={b.booking_id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3.5 font-mono font-bold text-slate-900">
                              {b.booking_id}
                            </td>
                            <td className="py-3 px-3.5 font-semibold text-slate-800">
                              {b.customer_name}
                            </td>
                            <td className="py-3 px-3.5">
                              <a href={`tel:${b.phone}`} className="text-amber-800 font-semibold hover:underline">
                                {b.phone}
                              </a>
                            </td>
                            <td className="py-3 px-3.5 text-slate-700">
                              <span className="font-medium">{b.pickup}</span> &rarr; <span className="font-bold">{b.destination}</span>
                              {b.distance_km && (
                                <div className="text-[10px] text-slate-400">
                                  {b.distance_km} km ({b.route_type})
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                              <div>{b.date}</div>
                              <div className="text-[10px] text-slate-400 font-semibold">{b.time}</div>
                            </td>
                            <td className="py-3 px-3.5 text-slate-700">
                              <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                                {b.trip_type}
                              </span>
                            </td>
                            <td className="py-3 px-3.5">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                                b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                b.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                            <td className="py-3 px-3.5">
                              <select
                                value={b.status}
                                onChange={(e) => handleStatusChange(b.booking_id, e.target.value)}
                                className="px-2 py-1 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 focus:outline-none focus:border-amber-500 font-semibold"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Friendly Responsive Cards (as requested for mobile) */}
                <div className="lg:hidden space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.booking_id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2.5 text-xs"
                    >
                      <div className="flex items-center justify-between font-mono font-bold">
                        <span className="text-slate-900">{b.booking_id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                          b.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-slate-700">
                        <div>
                          <strong>Customer:</strong> {b.customer_name} (
                          <a href={`tel:${b.phone}`} className="text-amber-800 underline font-bold">
                            {b.phone}
                          </a>
                          )
                        </div>
                        <div>
                          <strong>Route:</strong> {b.pickup} &rarr; {b.destination}
                        </div>
                        <div>
                          <strong>Schedule:</strong> {b.date} at {b.time} ({b.trip_type})
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">Update Status:</span>
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.booking_id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs bg-slate-50 text-slate-800 font-semibold"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* TAB 2: BOOKING CALENDAR (Feature 7) */}
            {activeTab === 'calendar' && (
              <BookingCalendar bookings={bookings} />
            )}

            {/* TAB 3: REVIEW MODERATION (Feature 9 & 10) */}
            {activeTab === 'reviews' && (
              <div className="space-y-4 text-left">
                <div className="border-b border-slate-200 pb-2">
                  <h3 className="font-bold text-sm text-slate-900">
                    Customer Reviews &amp; Complaints Moderation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Approve genuine customer reviews before they appear on the public website, or address urgent complaints.
                  </p>
                </div>

                {reviews.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">
                    No reviews submitted yet.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((r) => (
                      <div
                        key={r.id}
                        className={`p-4 rounded-2xl border ${
                          r.review_type === 'complaint'
                            ? 'bg-rose-50/60 border-rose-300'
                            : 'bg-white border-slate-200'
                        } shadow-xs space-y-2.5 text-xs`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{r.customer_name}</span>
                            {r.phone && (
                              <a href={`tel:${r.phone}`} className="text-amber-800 font-semibold underline">
                                {r.phone}
                              </a>
                            )}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              r.review_type === 'complaint' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {r.review_type}
                            </span>
                          </div>

                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            r.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                            r.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {r.status}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${s <= r.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                          <span className="text-[11px] text-slate-500 font-bold ml-1">
                            {r.rating}/5
                          </span>
                        </div>

                        {/* Review text */}
                        <p className="text-slate-800 italic bg-white/70 p-2.5 rounded-xl border border-slate-100">
                          "{r.review_text}"
                        </p>

                        {/* Actions */}
                        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                          <span className="text-[10px] text-slate-400">
                            Submitted: {new Date(r.created_at).toLocaleDateString()}
                          </span>

                          <div className="flex items-center gap-2">
                            {r.status !== 'Approved' && (
                              <button
                                type="button"
                                onClick={() => handleModerate(r.id, 'Approved')}
                                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                              >
                                Approve for Public
                              </button>
                            )}

                            {r.status !== 'Rejected' && (
                              <button
                                type="button"
                                onClick={() => handleModerate(r.id, 'Rejected')}
                                className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs"
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
