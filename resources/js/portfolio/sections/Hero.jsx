import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { Button } from '../components/ui/Button';
import { variants } from '../lib/motion';

export function Hero({ site }) {
  return (
    <section id="top" className="relative overflow-hidden pt-14 sm:pt-16">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] glass-strong noise">
          <div className="absolute inset-0 overflow-hidden opacity-70">
            <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-40 left-10 h-[520px] w-[520px] rounded-full bg-fuchsia-500/16 blur-3xl" />
            <div className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-cyan-400/14 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-10 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <motion.h1
                initial="hidden"
                animate="show"
                variants={variants.fadeUp(0)}
                className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Hi, I’m <span className="gradient-text">{site.name}</span> —<br />
                {site.title}.
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="show"
                variants={variants.fadeUp(1)}
                className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg"
              >
                {site.tagline} <span className="text-white/80">Based in {site.location}.</span>
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                variants={variants.fadeUp(2)}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Button href={site.ctas.primary.href} variant="primary" className="w-full sm:w-auto">
                  {site.ctas.primary.label}
                  <FiArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={site.ctas.secondary.href}
                  variant="ghost"
                  className="w-full sm:w-auto"
                >
                  {site.ctas.secondary.label}
                </Button>
                <Button
                  href={site.cvUrl || site.socials.email}
                  variant="link"
                  className="w-full sm:w-auto"
                  {...(site.cvUrl ? { download: true, target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {site.cvUrl ? 'Download CV' : 'Request CV'} <FiDownload className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={variants.fadeUp(3)}
                className="mt-10 flex flex-wrap items-center gap-3"
              >
                <a
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  href={site.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
                <a
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <div className="h-6 w-px shrink-0 bg-white/10" />
                <p className="min-w-0 flex-1 text-sm text-white/60">
                  {site.hero?.availability ?? 'Available for freelance • Remote-friendly'}
                </p>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial="hidden"
                animate="show"
                variants={variants.scaleIn(0)}
                className="relative grid gap-4"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-white/10 bg-black/30 p-5 sm:p-6"
                >
                  <div className="absolute inset-0 rounded-[var(--radius-2xl)] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                  <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/14 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white/80">
                          {site.name}
                        </div>
                        <div className="mt-1 text-xl font-semibold text-white">
                          {site.title}
                        </div>
                        <div className="mt-2 text-sm text-white/65">{site.location}</div>
                      </div>

                      <div className="relative">
                        <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-r from-indigo-400/30 via-fuchsia-400/30 to-cyan-300/30 blur-xl" />
                        <div className="relative rounded-[28px] border border-white/15 bg-white/5 p-2">
                          <div className="relative aspect-[3/4] h-36 overflow-hidden rounded-[22px] ring-1 ring-white/10 sm:h-44">
                            <img
                              src={site.profileImage}
                              alt={`${site.name} profile photo`}
                              loading="eager"
                              fetchPriority="high"
                              decoding="async"
                              width={176}
                              height={234}
                              className="h-full w-full object-contain bg-black/30"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {(site.hero?.metrics ?? []).slice(0, 4).map((m) => (
                        <Metric key={m.label} label={m.label} value={m.value} />
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-medium tracking-wide text-white/60">
                        {site.hero?.noteTitle ?? 'Note'}
                      </div>
                      <div className="mt-2 text-sm text-white/75">
                        {site.hero?.note ??
                          'Clean code, practical architecture, and UI that feels fast—on mobile first.'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-medium text-white/60">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/90">{value}</div>
    </div>
  );
}

