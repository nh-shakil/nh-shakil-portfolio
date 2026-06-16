import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useReducedMotionPref } from '../../lib/a11y';

export function ProjectCarousel({
  images = [],
  title = '',
  aspectClass = 'aspect-[16/10]',
  autoPlay = false,
  autoPlayInterval = 4500,
}) {
  const safe = useMemo(() => (Array.isArray(images) ? images : []), [images]);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotionPref();

  useEffect(() => {
    if (!autoPlay || safe.length <= 1 || reducedMotion || paused) return;

    const timer = window.setInterval(() => {
      setIdx((i) => (i + 1) % safe.length);
    }, autoPlayInterval);

    return () => window.clearInterval(timer);
  }, [autoPlay, autoPlayInterval, paused, reducedMotion, safe.length]);

  if (safe.length === 0) return null;
  const current = safe[Math.max(0, Math.min(safe.length - 1, idx))];

  const prev = () => setIdx((i) => (i - 1 + safe.length) % safe.length);
  const next = () => setIdx((i) => (i + 1) % safe.length);

  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-black/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={`relative ${aspectClass} w-full`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current.url}
            src={current.url}
            alt={current.alt || `${title} image`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35 }}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-black/35" />
      </div>

      {safe.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-white/90 backdrop-blur transition hover:bg-black/55"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-white/90 backdrop-blur transition hover:bg-black/55"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 backdrop-blur">
              {safe.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 w-1.5 rounded-full transition ${
                    i === idx ? 'bg-white/90' : 'bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

