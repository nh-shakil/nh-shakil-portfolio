import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiLaravel,
  SiPhp,
  SiReact,
  SiFlutter,
  SiMysql,
  SiTailwindcss,
  SiPostman,
  SiGithub,
} from 'react-icons/si';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Progress } from '../components/ui/Progress';
import { variants } from '../lib/motion';

const iconMap = {
  Laravel: SiLaravel,
  PHP: SiPhp,
  React: SiReact,
  Flutter: SiFlutter,
  MySQL: SiMysql,
  'Tailwind CSS': SiTailwindcss,
  'REST API': SiPostman,
  'Git & GitHub': SiGithub,
};

export function Skills({ site }) {
  const [active, setActive] = useState(site.skills[0]?.name ?? 'Laravel');

  const activeSkill = useMemo(
    () => site.skills.find((s) => s.name === active) ?? site.skills[0],
    [site, active],
  );

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I use to ship production-ready products"
      desc="A curated set of technologies I’m comfortable with—optimized for performance, maintainability, and premium UX."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {site.skills.map((s, i) => {
              const Icon = iconMap[s.name];
              const isActive = s.name === active;
              return (
                <motion.button
                  key={s.name}
                  type="button"
                  onClick={() => setActive(s.name)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
                  variants={variants.scaleIn(i)}
                  className={`text-left transition ${
                    isActive ? 'translate-y-[-1px]' : ''
                  }`}
                >
                  <Card
                    className={`p-5 hover:bg-white/7 ${
                      isActive ? 'ring-1 ring-white/15 bg-white/7' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-white">{s.name}</div>
                        <div className="mt-1 text-xs text-white/60">
                          Proficiency score
                        </div>
                      </div>
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/90">
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={s.level} />
                    </div>
                  </Card>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          className="lg:col-span-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
          variants={variants.fadeUp(0)}
        >
          <Card className="p-6 sm:p-7">
            <div className="text-xs font-medium tracking-wide text-white/60">
              Highlighted skill
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">
              {activeSkill?.name}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              I use this skill to build clean, scalable systems with a premium UI polish—while keeping
              performance and accessibility as first-class goals.
            </p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-white/80">Confidence</div>
                <div className="text-sm font-semibold text-white">
                  {activeSkill?.level ?? 0}%
                </div>
              </div>
              <div className="mt-3">
                <Progress value={activeSkill?.level ?? 0} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Mini label="UI System" value="Reusable" />
              <Mini label="Code Quality" value="Maintainable" />
              <Mini label="Delivery" value="Fast" />
              <Mini label="DX" value="Clean" />
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs font-medium text-white/60">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/90">{value}</div>
    </div>
  );
}

