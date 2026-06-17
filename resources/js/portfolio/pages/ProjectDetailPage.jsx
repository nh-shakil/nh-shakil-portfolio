import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tag } from '../components/ui/Tag';
import { ProjectCarousel } from '../components/projects/ProjectCarousel';
import { ProjectReviews } from '../components/projects/ProjectReviews';
import { ProjectRatingBadge } from '../components/projects/ProjectRatingBadge';
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
                <div className="relative p-3 pb-0 sm:p-6 sm:pb-0">
                  <div className="pointer-events-none absolute left-5 top-5 z-10 sm:left-8 sm:top-8">
                    <ProjectRatingBadge
                      averageRating={project.averageRating}
                      reviewCount={project.reviewCount}
                    />
                  </div>
                  <ProjectCarousel images={project.images} title={project.title} />
                </div>
              ) : (
                <div className="border-b border-white/10 px-5 pt-5 sm:px-8">
                  <ProjectRatingBadge
                    averageRating={project.averageRating}
                    reviewCount={project.reviewCount}
                  />
                </div>
              )}

              <div className="p-5 sm:p-8">
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

                <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-row">
                  {project.liveUrl ? (
                    <Button
                      href={project.liveUrl}
                      variant="primary"
                      className="min-h-11 w-full touch-manipulation sm:w-auto"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live <FiExternalLink className="h-4 w-4" />
                    </Button>
                  ) : null}
                  {project.githubUrl ? (
                    <Button
                      href={project.githubUrl}
                      variant="ghost"
                      className="min-h-11 w-full touch-manipulation sm:w-auto"
                      target="_blank"
                      rel="noreferrer"
                    >
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
