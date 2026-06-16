import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiInstagram } from 'react-icons/fi';

export function Footer({ site }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative py-14">
      <div className="container-shell">
        <div className="rounded-[var(--radius-2xl)] glass-strong px-6 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <div className="text-lg font-semibold tracking-tight text-white">
                {site.name}
              </div>
              <div className="mt-2 text-sm text-white/70">{site.title}</div>
              <div className="mt-4 text-sm leading-relaxed text-white/65">
                I build fast, SEO-friendly web apps and reliable APIs with Laravel, React, and
                Flutter—focused on clean UX and maintainable code.
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="text-xs font-medium tracking-wide text-white/60">
                Quick links
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                {[
                  ['About', '#about'],
                  ['Skills', '#skills'],
                  ['Services', '#services'],
                  ['Projects', '#projects'],
                  ['Process', '#process'],
                  ['Timeline', '#timeline'],
                  ['Contact', '#contact'],
                  ['Top', '#top'],
                ].map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    className="rounded-xl px-3 py-2 text-white/70 transition hover:bg-white/6 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="text-xs font-medium tracking-wide text-white/60">Social</div>
              <div className="mt-4 flex items-center gap-2">
                <Social href={site.socials.github} label="GitHub" icon={FiGithub} />
                <Social href={site.socials.linkedin} label="LinkedIn" icon={FiLinkedin} />
                <Social href={site.socials.instagram} label="Instagram" icon={FiInstagram} />
                <Social href={site.socials.email} label="Email" icon={FiMail} />
              </div>
              <div className="mt-6 text-xs text-white/50">Built by {site.name}.</div>
            </div>
          </div>

          <div className="mt-10 h-px w-full bg-white/10" />
          <div className="mt-6 flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} {site.name}.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noreferrer' : undefined}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      <Icon className="h-4 w-4" />
    </a>
  );
}

