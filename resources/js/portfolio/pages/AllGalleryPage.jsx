import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { GalleryCard } from '../components/gallery/GalleryCard';

export function AllGalleryPage({ site, loading = false }) {
  const items = site.gallery ?? [];

  return (
    <div className="pt-6">
      <div className="container-shell">
        <Link
          to="/#gallery"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>

      <Section
        eyebrow="Success Gallery"
        title="All highlights"
        desc="Every milestone, certificate, and success moment in one place."
      >
        {loading ? (
          <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
            Loading gallery…
          </div>
        ) : items.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <GalleryCard key={item.id ?? i} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
            No gallery items yet. Add cards from the admin panel.
          </div>
        )}
      </Section>
    </div>
  );
}
