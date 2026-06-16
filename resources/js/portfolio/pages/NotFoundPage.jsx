import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export function NotFoundPage() {
  return (
    <div className="container-shell py-20">
      <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center">
        <div className="text-2xl font-semibold text-white">Page not found</div>
        <p className="mt-3 text-sm text-white/65">The page you’re looking for doesn’t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
