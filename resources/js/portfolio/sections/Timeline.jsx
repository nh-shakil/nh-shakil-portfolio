import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiBriefcase } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Tag } from '../components/ui/Tag';
import { variants } from '../lib/motion';

export function Timeline({ site }) {
  const items = site.timeline ?? [];

  return (
    <Section
      id="timeline"
      eyebrow="Experience & Education"
      title="A modern timeline of my journey"
      desc="Roles, milestones, and progress across backend development, teaching, and education."
    >
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-0 h-full w-px bg-white/10 sm:left-6" />

        <div className="space-y-4">
          {items.map((t, i) => (
            <motion.div
              key={`${t.type}-${t.title}-${i}`}
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
                    <div className="mt-1 text-sm text-white/65">
                      {t.org}
                      {t.employmentType ? ` · ${t.employmentType}` : ''}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-white/55">{t.period}</div>
                </div>

                {t.location ? (
                  <div className="mt-2 text-xs text-white/50">{t.location}</div>
                ) : null}

                {t.desc ? (
                  <div className="mt-3 text-sm leading-relaxed text-white/70">{t.desc}</div>
                ) : null}

                {Array.isArray(t.skills) && t.skills.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.skills.map((skill) => (
                      <Tag key={skill}>{skill}</Tag>
                    ))}
                  </div>
                ) : null}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
