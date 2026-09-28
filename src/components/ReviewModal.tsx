import React, { useState } from 'react';
import { X, Star, Send, AlertCircle, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { submitReview } from '../utils/api';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmitted }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [type, setType] = useState<'review' | 'complaint'>('review');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !reviewText.trim()) {
      setError('Please provide your name and review details.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await submitReview({
        customer_name: name,
        phone: phone || undefined,
        rating,
        review_type: type,
        review_text: reviewText
      });
      setSuccess(true);
      if (onSubmitted) onSubmitted();
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {type === 'complaint' ? 'Complaint Received for Immediate Action' : 'Review Submitted Successfully'}
            </h3>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              {type === 'complaint'
                ? 'Thank you for notifying us. Our management will review your complaint and contact you directly for immediate resolution.'
                : 'Thank you for sharing your experience! Your genuine review will appear publicly after admin verification.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Customer Feedback &amp; Support
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Share Your Experience
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Have you travelled with Aravindha's "v" Mobility? We value your honest feedback.
              </p>
            </div>

            {/* Type Toggle: Review vs Complaint */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                type="button"
                onClick={() => setType('review')}
                className={`py-2 rounded-lg transition-colors ${
                  type === 'review'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ? Travel Review
              </button>
              <button
                type="button"
                onClick={() => setType('complaint')}
                className={`py-2 rounded-lg transition-colors ${
                  type === 'complaint'
                    ? 'bg-red-50 text-red-700 shadow-xs border border-red-200'
                    : 'text-slate-600 hover:text-red-600'
                }`}
              >
                ?? Complaint (Immediate Action)
              </button>
            </div>

            {/* Rating Stars */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating !== null ? hoverRating : rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-1">
              <label htmlFor="revName" className="block text-xs font-bold text-slate-700">
                Your Name <span className="text-amber-600">*</span>
              </label>
              <input
                type="text"
                id="revName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand Sivakumar"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-500"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label htmlFor="revPhone" className="block text-xs font-bold text-slate-700">
                Phone Number {type === 'complaint' && <span className="text-red-500">* (for resolution)</span>}
              </label>
              <input
                type="tel"
                id="revPhone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 7824983827"
                required={type === 'complaint'}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-500"
              />
            </div>

            {/* Review / Complaint Text */}
            <div className="space-y-1">
              <label htmlFor="revDetails" className="block text-xs font-bold text-slate-700">
                {type === 'complaint' ? 'Complaint Details' : 'Your Review'} <span className="text-amber-600">*</span>
              </label>
              <textarea
                id="revDetails"
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={
                  type === 'complaint'
                    ? 'Please describe the issue in detail so we can resolve it immediately...'
                    : 'Describe your ride experience, vehicle comfort, punctuality, etc.'
                }
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:bg-white focus:border-amber-500"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-colors disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting...' : 'Submit Feedback'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
