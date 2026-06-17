import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { Tag } from '../components/ui/Tag';
import { Link } from 'react-router-dom';
import { StarRating } from '../components/projects/StarRating';
import { apiGet } from '../lib/api';
import { variants } from '../lib/motion';
import { ProjectCarousel } from '../components/projects/ProjectCarousel';

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
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <motion.div
              key={p.id ?? p.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
              variants={variants.fadeUp(i)}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}

function ProjectCard({ project }) {
  const images = project?.images ?? [];

  return (
    <Card className="group overflow-hidden">
      {images.length ? (
        <div className="p-4 pb-0">
          <ProjectCarousel
            images={images}
            title={project.title}
            aspectClass="aspect-[16/10]"
            autoPlay={images.length > 1}
          />
        </div>
      ) : null}

      <div className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-20 -right-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-base font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                {project.isFeatured ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/75">
                    <FiStar className="h-3.5 w-3.5" />
                    Featured
                  </span>
                ) : null}
              </div>
              {project.excerpt ? (
                <p className="mt-2 text-sm leading-relaxed text-white/70 line-clamp-2">
                  {project.excerpt}
                </p>
              ) : null}
              {project.reviewCount > 0 ? (
                <div className="mt-2 flex items-center gap-2">
                  <StarRating value={Math.round(project.averageRating ?? 0)} size="sm" />
                  <span className="text-xs text-white/55">({project.reviewCount})</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(project.techStack ?? []).slice(0, 4).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {project.slug ? (
              <>
                <ButtonLink to={`/projects/${project.slug}#reviews`} variant="primary" className="w-full">
                  ★ Leave a review
                </ButtonLink>
                <ButtonLink to={`/projects/${project.slug}`} variant="ghost" className="w-full">
                  View project details
                </ButtonLink>
              </>
            ) : null}
            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                variant={project.slug ? 'ghost' : 'primary'}
                className="w-full"
                target={project.liveUrl?.startsWith('http') ? '_blank' : undefined}
                rel={project.liveUrl?.startsWith('http') ? 'noreferrer' : undefined}
              >
                Live <FiExternalLink className="h-4 w-4" />
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button
                href={project.githubUrl}
                variant="ghost"
                className="w-full"
                target={project.githubUrl?.startsWith('http') ? '_blank' : undefined}
                rel={project.githubUrl?.startsWith('http') ? 'noreferrer' : undefined}
              >
                GitHub <FiGithub className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
