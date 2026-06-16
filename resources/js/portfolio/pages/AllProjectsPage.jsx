import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { ProjectCarousel } from '../components/projects/ProjectCarousel';
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </div>

      <Section
        id="all-projects"
        eyebrow="Projects"
        title="All Projects"
        desc="Projects are managed from your admin panel and loaded dynamically via the Laravel API."
      >
        {state.loading ? (
          <div className="text-sm text-white/60">Loading…</div>
        ) : state.error ? (
          <div className="text-sm text-rose-100">{state.error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
                variants={variants.fadeUp(i)}
              >
                <Card className="p-5 sm:p-6">
                  {p.images?.length ? (
                    <ProjectCarousel images={p.images} title={p.title} />
                  ) : null}

                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-lg font-semibold text-white">{p.title}</div>
                      {p.excerpt ? (
                        <div className="mt-2 text-sm text-white/70">{p.excerpt}</div>
                      ) : p.description ? (
                        <div className="mt-2 text-sm text-white/70 line-clamp-3">
                          {p.description}
                        </div>
                      ) : null}
                    </div>
                    {p.isFeatured ? (
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                        Featured
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(p.techStack ?? []).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    {p.liveUrl ? (
                      <Button
                        href={p.liveUrl}
                        variant="primary"
                        className="w-full sm:w-auto"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live <FiExternalLink className="h-4 w-4" />
                      </Button>
                    ) : null}
                    {p.githubUrl ? (
                      <Button
                        href={p.githubUrl}
                        variant="ghost"
                        className="w-full sm:w-auto"
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub <FiGithub className="h-4 w-4" />
                      </Button>
                    ) : null}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}

