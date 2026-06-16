import React from 'react';
import { motion } from 'framer-motion';
import { FiCompass, FiPenTool, FiCode, FiCheckCircle, FiUploadCloud } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { variants } from '../lib/motion';

const iconByTitle = {
  Discovery: FiCompass,
  Design: FiPenTool,
  Development: FiCode,
  Testing: FiCheckCircle,
  Deployment: FiUploadCloud,
};

export function Process({ site }) {
  return (
    <Section
      id="process"
      eyebrow="Work Process"
      title="A simple process that keeps delivery predictable"
      desc="Clear steps, clean communication, and a strong focus on quality from day one."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {site.process.map((p, i) => {
          const Icon = iconByTitle[p.title] ?? FiCompass;
          return (
            <motion.div
              key={p.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.scaleIn(i)}
              className="h-full"
            >
              <Card className="h-full p-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-medium text-white/50">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="mt-4 text-base font-semibold text-white">{p.title}</div>
                <div className="mt-2 text-sm leading-relaxed text-white/70">{p.desc}</div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

