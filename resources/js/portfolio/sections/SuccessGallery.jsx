import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { GalleryCard } from '../components/gallery/GalleryCard';

const HOME_PREVIEW_COUNT = 3;

export function SuccessGallery({ site }) {
  const items = site.gallery ?? [];
  if (!items.length) return null;

  const preview = items.slice(0, HOME_PREVIEW_COUNT);
  const hasMore = items.length > HOME_PREVIEW_COUNT;

  return (
    <Section
      id="gallery"
      eyebrow="Success Gallery"
      title="Proof of work, milestones, and wins"
      desc="Certificates, project highlights, and moments that show real progress."
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-white/60">
          Showing {preview.length} of {items.length} highlights
        </div>
        {hasMore ? (
          <Link
            to="/gallery"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            View all gallery
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((item, i) => (
          <GalleryCard key={item.id ?? i} item={item} index={i} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <Link
            to="/gallery"
            className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10"
          >
            View all ({items.length})
          </Link>
        </div>
      ) : null}
    </Section>
  );
}
