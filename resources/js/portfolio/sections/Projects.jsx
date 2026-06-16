import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { Link } from 'react-router-dom';
import { apiGet } from '../lib/api';
import { variants } from '../lib/motion';

export function Projects({ site }) {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    let alive = true;
    apiGet('/api/projects?featured=1')
      .then((json) => {
        if (!alive) return;
        setProjects(json.projects ?? []);
      })
      .catch(() => {
        if (!alive) return;
        setProjects([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  const items =
    projects && Array.isArray(projects) && projects.length
      ? projects
      : site.projects.map((p) => ({
          id: p.name,
          title: p.name,
          excerpt: p.desc,
          techStack: p.stack,
          liveUrl: p.demoUrl,
          githubUrl: p.githubUrl,
          isFeatured: !!p.featured,
          images: [],
        }));

  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Selected work with premium UI + strong engineering"
      desc="A few representative builds showcasing API-first backend work, premium UI, and production-ready delivery."
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-white/60">Managed from admin panel</div>
        <Link
          to="/projects"
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          View all projects
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {items.map((p, i) => (
          <motion.div
            key={p.id ?? p.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
            variants={variants.fadeUp(i)}
            className={p.isFeatured ? 'lg:col-span-6' : 'lg:col-span-6'}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative p-6 sm:p-7">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute -top-24 -right-20 h-64 w-64 rounded-full bg-indigo-500/12 blur-3xl" />
          <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {project.title}
                </h3>
                {project.isFeatured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/75">
                    <FiStar className="h-3.5 w-3.5" />
                    Featured
                  </span>
                )}
              </div>
              {project.excerpt ? (
                <p className="mt-2 text-sm leading-relaxed text-white/70">{project.excerpt}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {(project.techStack ?? []).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                variant="primary"
                className="w-full sm:w-auto"
                target={project.liveUrl?.startsWith('http') ? '_blank' : undefined}
                rel={project.liveUrl?.startsWith('http') ? 'noreferrer' : undefined}
              >
                Live Demo <FiExternalLink className="h-4 w-4" />
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button
                href={project.githubUrl}
                variant="ghost"
                className="w-full sm:w-auto"
                target={project.githubUrl?.startsWith('http') ? '_blank' : undefined}
                rel={project.githubUrl?.startsWith('http') ? 'noreferrer' : undefined}
              >
                GitHub <FiGithub className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />
      <div className="flex items-center justify-between px-6 py-4 text-xs text-white/60 sm:px-7">
        <span>Premium UI • Glass surfaces • Smooth motion</span>
        <span className="opacity-0 transition group-hover:opacity-100">View details →</span>
      </div>
    </Card>
  );
}

