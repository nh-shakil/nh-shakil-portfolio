import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { ProjectCard } from '../components/projects/ProjectCard';
import { apiGet } from '../lib/api';
import { variants } from '../lib/motion';

export function Projects({ site }) {
  const [state, setState] = useState({ loading: true, projects: [], error: '' });

  useEffect(() => {
    let alive = true;
    apiGet('/api/projects')
      .then((json) => {
        if (!alive) return;
        setState({ loading: false, projects: json.projects ?? [], error: '' });
      })
      .catch(() => {
        if (!alive) return;
        setState({ loading: false, projects: [], error: 'Could not load projects.' });
      });
    return () => {
      alive = false;
    };
  }, []);

  const items = (state.projects ?? []).slice(0, 4);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Recent work, shipped end-to-end"
      desc="A few representative builds showcasing premium UI, reliable APIs, and production-ready delivery."
    >
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 active:scale-[0.98] touch-manipulation"
        >
          View all projects
        </Link>
      </div>

      {state.loading ? (
        <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
          Loading projects…
        </div>
      ) : state.error ? (
        <div className="rounded-[var(--radius-2xl)] border border-rose-300/20 bg-rose-300/10 px-6 py-12 text-center text-sm text-rose-100">
          {state.error}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
          No projects yet. Add projects from the admin panel.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {items.map((p, i) => (
            <motion.div
              key={p.id ?? p.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.fadeUp(i)}
            >
              <ProjectCard project={p} layout="compact" />
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
