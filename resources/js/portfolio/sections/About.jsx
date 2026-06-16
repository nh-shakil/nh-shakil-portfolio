import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiLayers, FiShield, FiZap } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { variants } from '../lib/motion';

export function About({ site }) {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={site.about.headline}
      desc="A quick snapshot of who I am, how I work, and what you can expect when we collaborate."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
          variants={variants.fadeUp(0)}
          className="lg:col-span-7"
        >
          <Card className="p-6 sm:p-8">
            <div className="text-sm font-medium text-white/75">{site.name}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {site.title}
            </div>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/70">
              {site.about.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
              <span className="h-2 w-2 rounded-full bg-emerald-300/70" />
              {site.about?.availability ?? 'Open to opportunities • Bangladesh • Remote-friendly'}
            </div>
          </Card>
        </motion.div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.fadeUp(1)}
            >
              <Feature
                icon={FiZap}
                title="Fast, SEO-friendly delivery"
                desc="Mobile-first pages, smart lazy loading, and clean semantics for strong Lighthouse scores."
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.fadeUp(2)}
            >
              <Feature
                icon={FiLayers}
                title="Reusable UI system"
                desc="Consistent spacing, typography, and component patterns—easy to maintain and extend."
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.fadeUp(3)}
            >
              <Feature
                icon={FiShield}
                title="Professional engineering"
                desc="Validation, security-minded APIs, and predictable data models with a clean architecture."
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {site.about.highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
            variants={variants.scaleIn(i)}
          >
            <Card className="p-5">
              <div className="text-xs font-medium tracking-wide text-white/60">
                {h.label}
              </div>
              <div className="mt-2 text-sm font-semibold text-white/90">{h.value}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs text-white/60">
                Explore <FiArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
        </div>
      </div>
    </Card>
  );
}

