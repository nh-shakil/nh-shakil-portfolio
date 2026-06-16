import React from 'react';

export function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75 ${className}`}
    >
      {children}
    </span>
  );
}

