import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiBriefcase } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { variants } from '../lib/motion';

export function Timeline({ site }) {
  return (
    <Section
      id="timeline"
      eyebrow="Experience & Education"
      title="A modern timeline of my journey"
      desc="A clean vertical layout that highlights roles, milestones, and progress."
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-0 h-full w-px bg-white/10 sm:left-6" />

        <div className="space-y-4">
          {site.timeline.map((t, i) => (
            <motion.div
              key={`${t.type}-${t.title}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.fadeUp(i)}
              className="relative pl-10 sm:pl-16"
            >
              <div className="absolute left-0 top-6 sm:left-3">
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80">
                  {t.type === 'education' ? (
                    <FiBookOpen className="h-4 w-4" />
                  ) : (
                    <FiBriefcase className="h-4 w-4" />
                  )}
                </div>
              </div>

              <Card className="p-6 sm:p-7">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <div className="text-base font-semibold text-white">{t.title}</div>
                    <div className="mt-1 text-sm text-white/65">{t.org}</div>
                  </div>
                  <div className="text-xs font-medium text-white/55">{t.period}</div>
                </div>
                <div className="mt-3 text-sm leading-relaxed text-white/70">{t.desc}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

