import React from 'react';
import { Link } from 'react-router-dom';

const base =
  'inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black touch-manipulation active:scale-[0.98]';

const variants = {
  primary: 'bg-white text-black hover:bg-white/90',
  ghost: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
};

export function ButtonLink({ to, variant = 'primary', className = '', children }) {
  return (
    <Link to={to} className={`${base} ${variants[variant] ?? variants.primary} ${className}`}>
      {children}
    </Link>
  );
}
