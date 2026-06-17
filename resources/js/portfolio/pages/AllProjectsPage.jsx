import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { ProjectCard } from '../components/projects/ProjectCard';
import { apiGet } from '../lib/api';
import { variants } from '../lib/motion';

export function AllProjectsPage({ site }) {
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

  const projects = useMemo(() => state.projects, [state.projects]);

  return (
    <div className="pt-6">
      <div className="container-shell">
        <Link
          to="/"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 active:scale-[0.98] touch-manipulation"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>

      <Section
        id="all-projects"
        eyebrow="Projects"
        title="All Projects"
        desc="Browse builds, ratings, and leave your review."
      >
        {state.loading ? (
          <div className="text-sm text-white/60">Loading…</div>
        ) : state.error ? (
          <div className="text-sm text-rose-100">{state.error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
                variants={variants.fadeUp(i)}
              >
                <ProjectCard project={p} layout="full" />
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
