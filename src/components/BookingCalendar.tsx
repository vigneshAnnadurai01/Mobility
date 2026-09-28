import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, User, Phone, CheckCircle2 } from 'lucide-react';
import { BookingResult } from '../utils/api';

interface BookingCalendarProps {
  bookings: BookingResult[];
  onSelectBooking?: (booking: BookingResult) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings, onSelectBooking }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calendar logic
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Map bookings by date string (YYYY-MM-DD)
  const bookingsByDate: { [dateStr: string]: BookingResult[] } = {};
  bookings.forEach((b) => {
    if (!bookingsByDate[b.date]) {
      bookingsByDate[b.date] = [];
    }
    bookingsByDate[b.date].push(b);
  });

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const selectedDayBookings = selectedDateStr ? (bookingsByDate[selectedDateStr] || []) : [];

  return (
    <div className="space-y-6">
      
      {/* Calendar Header with Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-amber-600" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {monthNames[month]} {year}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm overflow-hidden">
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {daysOfWeek.map((d) => (
            <div key={d} className="py-1 text-xs font-bold text-slate-500 uppercase">
              {d}
            </div>
          ))}
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarDays.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="h-16 sm:h-20 rounded-xl bg-slate-50/50" />;
            }

            const monthStr = String(month + 1).padStart(2, '0');
            const dayStr = String(day).padStart(2, '0');
            const fullDateStr = `${year}-${monthStr}-${dayStr}`;
            const dayBookings = bookingsByDate[fullDateStr] || [];
            const isSelected = selectedDateStr === fullDateStr;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDateStr(fullDateStr)}
                className={`h-16 sm:h-20 p-1.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400'
                    : dayBookings.length > 0
                    ? 'border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-amber-800' : 'text-slate-800'}`}>
                    {day}
                  </span>
                  {dayBookings.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </div>

                {dayBookings.length > 0 ? (
                  <div className="text-[10px] font-semibold text-emerald-800 leading-tight">
                    ? {dayBookings.length} {dayBookings.length === 1 ? 'booking' : 'bookings'}
                  </div>
                ) : (
                  <span className="text-[9px] text-slate-400">Available</span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* Selected Day Bookings Detail View */}
      {selectedDateStr && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-amber-600" />
              <span>Bookings for {selectedDateStr} ({selectedDayBookings.length})</span>
            </h4>
            <button
              onClick={() => setSelectedDateStr(null)}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              Clear selection
            </button>
          </div>

          {selectedDayBookings.length === 0 ? (
            <p className="text-xs text-slate-500 py-2">
              No bookings scheduled for this date. The Ertiga is completely free.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {selectedDayBookings.map((b) => (
                <div
                  key={b.booking_id}
                  onClick={() => onSelectBooking && onSelectBooking(b)}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/50 hover:border-amber-300 transition-colors cursor-pointer space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-mono font-bold text-slate-900">
                    <span>{b.booking_id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                      b.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      b.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-700">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">{b.customer_name}</span> ({b.phone})
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      <span>{b.pickup} &rarr; {b.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Time: {b.time} • Type: {b.trip_type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

