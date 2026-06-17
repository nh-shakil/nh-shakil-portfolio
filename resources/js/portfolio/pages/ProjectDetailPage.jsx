import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { ProjectCarousel } from '../components/projects/ProjectCarousel';
import { ProjectReviews } from '../components/projects/ProjectReviews';
import { StarRating } from '../components/projects/StarRating';
import { apiGet } from '../lib/api';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, project: null, error: '' });

  useEffect(() => {
    let alive = true;
    setState({ loading: true, project: null, error: '' });

    apiGet(`/api/projects/${slug}`)
      .then((json) => {
        if (!alive) return;
        setState({ loading: false, project: json.project ?? null, error: '' });
      })
      .catch(() => {
        if (!alive) return;
        setState({ loading: false, project: null, error: 'Project not found.' });
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!state.project || state.loading) return;
    if (window.location.hash !== '#reviews') return;

    const timer = window.setTimeout(() => {
      document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [state.loading, state.project]);

  const { project } = state;

  return (
    <div className="pt-6">
      <div className="container-shell flex flex-wrap items-center gap-2">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <FiArrowLeft className="h-4 w-4" />
          All projects
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          Home
        </Link>
      </div>

      <Section
        eyebrow="Project"
        title={project?.title ?? 'Project'}
        desc={project?.excerpt ?? ''}
      >
        {state.loading ? (
          <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
            Loading project…
          </div>
        ) : state.error || !project ? (
          <div className="rounded-[var(--radius-2xl)] border border-rose-300/20 bg-rose-300/10 px-6 py-12 text-center text-sm text-rose-100">
            {state.error || 'Project not found.'}
          </div>
        ) : (
          <div className="space-y-8">
            <Card className="overflow-hidden">
              {project.images?.length ? (
                <div className="p-4 pb-0 sm:p-6 sm:pb-0">
                  <ProjectCarousel images={project.images} title={project.title} />
                </div>
              ) : null}

              <div className="p-6 sm:p-8">
                {project.averageRating ? (
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <StarRating value={Math.round(project.averageRating)} />
                    <span className="text-sm text-white/70">
                      {project.averageRating} · {project.reviewCount ?? 0} review
                      {(project.reviewCount ?? 0) === 1 ? '' : 's'}
                    </span>
                  </div>
                ) : null}

                {project.description ? (
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/75">
                    {project.description}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.techStack ?? []).map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  {project.liveUrl ? (
                    <Button href={project.liveUrl} variant="primary" target="_blank" rel="noreferrer">
                      Live <FiExternalLink className="h-4 w-4" />
                    </Button>
                  ) : null}
                  {project.githubUrl ? (
                    <Button href={project.githubUrl} variant="ghost" target="_blank" rel="noreferrer">
                      GitHub <FiGithub className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card>

            <ProjectReviews slug={project.slug} reviews={project.reviews ?? []} />
          </div>
        )}
      </Section>
    </div>
  );
}
