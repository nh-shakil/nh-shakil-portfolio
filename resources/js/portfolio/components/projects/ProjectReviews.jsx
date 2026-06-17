import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { StarRating } from './StarRating';
import { apiPost } from '../../lib/api';

const inputClass =
  'mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30';

export function ProjectReviews({ slug, reviews = [], onReviewAdded, compact = false }) {
  const [items, setItems] = useState(reviews);
  const [form, setForm] = useState({ name: '', rating: 0, comment: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    setItems(reviews);
  }, [reviews]);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.rating < 1) {
      setStatus({ state: 'error', message: 'Please select a star rating.' });
      return;
    }

    setStatus({ state: 'loading', message: '' });

    try {
      const data = await apiPost(`/api/projects/${slug}/reviews`, form);
      const review = data?.review;
      if (review) {
        setItems((prev) => [review, ...prev]);
        onReviewAdded?.(review);
      }
      setForm({ name: '', rating: 0, comment: '' });
      setStatus({
        state: 'success',
        message: data?.message || 'Review submitted. Thank you!',
      });
    } catch (err) {
      const fieldErrors = err.errors ? Object.values(err.errors).flat().join(' ') : '';
      setStatus({
        state: 'error',
        message: fieldErrors || err.message || 'Could not submit review.',
      });
    }
  };

  return (
    <div id="reviews" className="scroll-mt-28 space-y-6">
      <Card className={`border border-amber-300/15 bg-gradient-to-b from-amber-300/10 to-transparent ${compact ? 'p-5' : 'p-6 sm:p-8'}`}>
        <div className="flex items-center gap-2 text-amber-100">
          <span className="text-lg">★</span>
          <div className="text-sm font-semibold text-white">Leave a review</div>
        </div>
        <div className="mt-1 text-xs text-white/60">Name, star rating, and comment.</div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-medium text-white/60">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              maxLength={120}
              placeholder="Your name"
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-white/60">Rating</label>
            <div className="mt-2">
              <StarRating value={form.rating} onChange={(rating) => setForm((p) => ({ ...p, rating }))} />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-white/60">Comment</label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={onChange}
              required
              rows={4}
              maxLength={2000}
              placeholder="Write your review…"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button as="button" type="submit" variant="primary" disabled={status.state === 'loading'}>
              Submit review <FiSend className="h-4 w-4" />
            </Button>
            {status.message ? (
              <p
                className={`text-sm ${
                  status.state === 'error'
                    ? 'text-rose-100'
                    : status.state === 'success'
                      ? 'text-emerald-100'
                      : 'text-white/60'
                }`}
              >
                {status.message}
              </p>
            ) : null}
          </div>
        </form>
      </Card>

      <div>
        <div className="text-sm font-semibold text-white">
          Reviews {items.length ? `(${items.length})` : ''}
        </div>

        {items.length === 0 ? (
          <div className="mt-4 rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-8 text-sm text-white/60">
            No reviews yet. Be the first to share feedback.
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((review) => (
              <Card key={review.id ?? `${review.name}-${review.createdAt}`} className="p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-sm font-semibold text-white">{review.name}</div>
                  <StarRating value={review.rating} size="sm" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{review.comment}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
