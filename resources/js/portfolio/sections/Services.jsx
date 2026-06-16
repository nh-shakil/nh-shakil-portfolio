import React from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiCode, FiDatabase, FiSmartphone } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { variants } from '../lib/motion';

const icons = [FiCode, FiSmartphone, FiDatabase, FiBox];

export function Services({ site }) {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="High-impact services for modern products"
      desc="From clean APIs to premium UIs—everything is built with a mobile-first, performance-focused mindset."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.services.map((s, i) => {
          const Icon = icons[i] ?? FiCode;
          return (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.scaleIn(i)}
              className="h-full"
            >
              <Card className="group h-full p-6 transition hover:bg-white/7">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90 transition group-hover:bg-white/10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-base font-semibold text-white">{s.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{s.desc}</div>
                <div className="mt-5 h-px w-full bg-white/10" />
                <div className="mt-4 text-xs font-medium tracking-wide text-white/60">
                  Premium UX • Clean code • Smooth motion
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

