import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, ChevronDown, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getPublicReviews, ReviewItem } from '../utils/api';
import { ReviewModal } from '../components/ReviewModal';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const fetchReviews = async () => {
    try {
      const data = await getPublicReviews();
      setReviews(data);
    } catch (err) {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 4);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
            <span>Genuine Customer Voices</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Have you travelled with Aravindha's "v" Mobility? Share your experience with us.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Leave a Review / Complaint</span>
            </button>
          </div>
        </div>

        {/* Display Reviews / Empty State */}
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            Loading verified reviews...
          </div>
        ) : reviews.length === 0 ? (
          /* Feature 9 Requirement: Initially display empty prompt */
          <div className="max-w-xl mx-auto p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Be the first to share your experience!</h3>
              <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                We believe in 100% genuine transparency. Every review displayed here is submitted by our real passengers and verified by our management.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-xs"
            >
              <span>Leave a Review</span>
            </button>
          </div>
        ) : (
          /* Feature 10 Requirement: Display approved reviews */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {displayedReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                      <span className="text-[11px] font-bold text-slate-500 ml-1.5">
                        {rev.rating}.0
                      </span>
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-slate-800 leading-relaxed italic">
                      "{rev.review_text}"
                    </p>
                  </div>

                  {/* Customer Name */}
                  <div className="pt-4 mt-3 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">
                      {rev.customer_name}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Rider</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Reviews Button */}
            {reviews.length > 4 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 transition-colors shadow-xs"
                >
                  <span>{showAll ? 'Show Fewer Reviews' : `View All ${reviews.length} Reviews`}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${showAll ? 'rotate-180' : ''}`} />
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Review & Complaint Modal */}
      <ReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={fetchReviews}
      />
    </section>
  );
};
