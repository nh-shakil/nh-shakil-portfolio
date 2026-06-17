import React from 'react';
import { FiStar } from 'react-icons/fi';

export function StarRating({ value = 0, onChange, size = 'md', className = '' }) {
  const stars = [1, 2, 3, 4, 5];
  const iconClass = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  const interactive = typeof onChange === 'function';

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={interactive ? 'Rating' : `${value} out of 5 stars`}
    >
      {stars.map((star) => {
        const filled = star <= value;

        if (interactive) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              aria-label={`${star} star${star === 1 ? '' : 's'}`}
              className={`rounded p-0.5 transition ${
                filled ? 'text-amber-300' : 'text-white/25 hover:text-amber-200/70'
              }`}
            >
              <FiStar className={`${iconClass} ${filled ? 'fill-current' : ''}`} />
            </button>
          );
        }

        return (
          <FiStar
            key={star}
            className={`${iconClass} ${filled ? 'fill-amber-300 text-amber-300' : 'text-white/20'}`}
          />
        );
      })}
    </div>
  );
}
