import React, { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { apiGet } from '../lib/api';

export function BlogPostPage() {
  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, post: null, error: '' });

  useEffect(() => {
    let alive = true;
    setState({ loading: true, post: null, error: '' });

    apiGet(`/api/blog-posts/${slug}`)
      .then((json) => {
        if (!alive) return;
        setState({ loading: false, post: json.post ?? null, error: '' });
      })
      .catch(() => {
        if (!alive) return;
        setState({ loading: false, post: null, error: 'Post not found.' });
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  const { post } = state;

  return (
    <div className="pt-6">
      <div className="container-shell flex flex-wrap items-center gap-2">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          <FiArrowLeft className="h-4 w-4" />
          All posts
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
        >
          Home
        </Link>
      </div>

      <Section eyebrow="Blog" title={post?.title ?? 'Blog post'} desc={post?.excerpt ?? ''}>
        {state.loading ? (
          <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
            Loading post…
          </div>
        ) : state.error || !post ? (
          <div className="rounded-[var(--radius-2xl)] border border-rose-300/20 bg-rose-300/10 px-6 py-12 text-center text-sm text-rose-100">
            {state.error || 'Post not found.'}
          </div>
        ) : (
          <Card className="overflow-hidden">
            {post.coverUrl ? (
              <div className="aspect-[16/9] overflow-hidden">
                <img src={post.coverUrl} alt={post.title} className="h-full w-full object-cover" />
              </div>
            ) : null}
            <div className="p-6 sm:p-8">
              {post.publishedAt ? (
                <div className="text-xs text-white/50">{post.publishedAt}</div>
              ) : null}
              <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/75">
                {post.content || post.excerpt}
              </div>
            </div>
          </Card>
        )}
      </Section>
    </div>
  );
}
