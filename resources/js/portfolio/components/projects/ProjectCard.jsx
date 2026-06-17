import React from 'react';
import { FiExternalLink, FiGithub, FiStar } from 'react-icons/fi';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ButtonLink } from '../ui/ButtonLink';
import { Tag } from '../ui/Tag';
import { ProjectCarousel } from './ProjectCarousel';
import { ProjectRatingBadge } from './ProjectRatingBadge';

export function ProjectCard({ project, layout = 'compact' }) {
  const images = project?.images ?? [];
  const isCompact = layout === 'compact';

  return (
    <Card className="group overflow-hidden">
      {images.length ? (
        <div className="relative p-3 pb-0 sm:p-4 sm:pb-0">
          <div className="pointer-events-none absolute left-5 top-5 z-10 sm:left-6 sm:top-6">
            <ProjectRatingBadge
              averageRating={project.averageRating}
              reviewCount={project.reviewCount}
            />
          </div>
          <ProjectCarousel
            images={images}
            title={project.title}
            aspectClass="aspect-[16/10]"
            autoPlay={images.length > 1}
          />
        </div>
      ) : (
        <div className="border-b border-white/10 px-4 pt-4 sm:px-5">
          <ProjectRatingBadge
            averageRating={project.averageRating}
            reviewCount={project.reviewCount}
          />
        </div>
      )}

      <div className="relative overflow-hidden p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-20 -right-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        <div className="relative min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3
                  className={`truncate font-semibold tracking-tight text-white ${
                    isCompact ? 'text-base' : 'text-lg'
                  }`}
                >
                  {project.title}
                </h3>
                {project.isFeatured ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/75">
                    <FiStar className="h-3.5 w-3.5" />
                    Featured
                  </span>
                ) : null}
              </div>

              {project.excerpt ? (
                <p
                  className={`mt-2 text-sm leading-relaxed text-white/70 ${
                    isCompact ? 'line-clamp-2' : 'line-clamp-3'
                  }`}
                >
                  {project.excerpt}
                </p>
              ) : !isCompact && project.description ? (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/70">
                  {project.description}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(project.techStack ?? []).slice(0, isCompact ? 4 : 6).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {project.slug ? (
              <ButtonLink
                to={`/projects/${project.slug}#reviews`}
                variant="primary"
                className="col-span-2"
              >
                Review
              </ButtonLink>
            ) : null}

            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                variant="ghost"
                className={`min-h-11 w-full touch-manipulation ${project.githubUrl ? '' : 'col-span-2'}`}
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
                className={`min-h-11 w-full touch-manipulation ${project.liveUrl ? '' : 'col-span-2'}`}
                target="_blank"
                rel="noreferrer"
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
