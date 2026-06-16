import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX, FiInstagram } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '#process' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ site }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  const socials = useMemo(
    () => [
      { href: site.socials.github, label: 'GitHub', icon: FiGithub },
      { href: site.socials.linkedin, label: 'LinkedIn', icon: FiLinkedin },
      { href: site.socials.instagram, label: 'Instagram', icon: FiInstagram },
      { href: site.socials.email, label: 'Email', icon: FiMail },
    ],
    [site],
  );

  return (
    <header className="sticky top-0 z-50">
      <div className="container-shell">
        <div className="mt-4 rounded-[var(--radius-2xl)] glass-strong">
          <div className="flex items-center justify-between px-4 py-3 sm:px-5">
            <Link to="/" className="group inline-flex items-center gap-2">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/7 ring-1 ring-white/10">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-white">
                  {site.name}
                </div>
                <div className="text-[11px] text-white/60">{site.title}</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((it) => (
                it.href.startsWith('#') ? (
                  <a
                    key={it.href}
                    href={onHome ? it.href : `/${it.href}`}
                    className="rounded-full px-3 py-2 text-sm text-white/75 transition hover:bg-white/6 hover:text-white"
                  >
                    {it.label}
                  </a>
                ) : (
                  <Link
                    key={it.href}
                    to={it.href}
                    className="rounded-full px-3 py-2 text-sm text-white/75 transition hover:bg-white/6 hover:text-white"
                  >
                    {it.label}
                  </Link>
                )
              ))}
            </nav>

            <div className="hidden items-center gap-2 sm:flex">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href?.startsWith('http') ? '_blank' : undefined}
                  rel={s.href?.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}

              {onHome ? (
                <Button href="#contact" variant="primary" className="ml-1">
                  Let’s Talk
                </Button>
              ) : (
                <Button as={Link} to="/" variant="primary" className="ml-1">
                  Home
                </Button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/90 transition hover:bg-white/10 lg:hidden"
            >
              {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-white/10 lg:hidden"
              >
                <div className="px-4 py-3">
                  <div className="grid grid-cols-2 gap-2">
                    {navItems.map((it) => (
                      it.href.startsWith('#') ? (
                        <a
                          key={it.href}
                          href={onHome ? it.href : `/${it.href}`}
                          onClick={() => setOpen(false)}
                          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          {it.label}
                        </a>
                      ) : (
                        <Link
                          key={it.href}
                          to={it.href}
                          onClick={() => setOpen(false)}
                          className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          {it.label}
                        </Link>
                      )
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {onHome ? (
                      <Button href="#contact" variant="primary" className="flex-1">
                        Contact
                      </Button>
                    ) : (
                      <Button as={Link} to="/" variant="primary" className="flex-1">
                        Home
                      </Button>
                    )}
                    <Button as={Link} to="/projects" variant="ghost" className="flex-1">
                      Projects
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

