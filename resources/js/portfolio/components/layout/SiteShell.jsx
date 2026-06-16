import React from 'react';
import { Navbar } from './Navbar';

export function SiteShell({ site, children }) {
  return (
    <div className="relative min-h-screen">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-fade" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute top-28 -left-36 h-[520px] w-[520px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <Navbar site={site} />

      <main id="content" className="relative">
        {children}
      </main>
    </div>
  );
}

