import React from 'react';

export function Card({ className = '', children }) {
  return <div className={`glass rounded-[var(--radius-xl)] ${className}`}>{children}</div>;
}

