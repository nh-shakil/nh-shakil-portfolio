import React from 'react';
import { StarRating } from './StarRating';

export function ProjectRatingBadge({
  averageRating = null,
  reviewCount = 0,
  className = '',
}) {
  const count = Number(reviewCount) || 0;
  const hasReviews = count > 0 && averageRating != null;
  const avgLabel = hasReviews ? Number(averageRating).toFixed(1) : '0.0';

  return (
    <div
      className={`inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 shadow-lg shadow-black/25 backdrop-blur-md ${className}`}
      aria-label={hasReviews ? `${avgLabel} out of 5 from ${count} reviews` : 'No reviews yet'}
    >
      <StarRating value={hasReviews ? Math.round(Number(averageRating)) : 0} size="sm" />
      <span className="text-xs font-semibold tabular-nums text-white">{avgLabel}</span>
      <span className="text-[11px] text-white/55">({count})</span>
    </div>
  );
}
