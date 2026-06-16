import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { apiGet } from '../lib/api';
import { variants } from '../lib/motion';

export function AllBlogPage() {
  const [state, setState] = useState({ loading: true, posts: [], error: '' });

  useEffect(() => {
    let alive = true;
    apiGet('/api/blog-posts')
      .then((json) => {
        if (!alive) return;
        setState({ loading: false, posts: json.posts ?? [], error: '' });
      })
      .catch(() => {
        if (!alive) return;
        setState({ loading: false, posts: [], error: 'Could not load blog posts.' });
      });
    return () => {
      alive = false;
    };
  }, []);

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
        eyebrow="Blog"
        title="Articles & notes"
        desc="Published posts from the admin panel."
      >
        {state.loading ? (
          <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
            Loading posts…
          </div>
        ) : state.error ? (
          <div className="rounded-[var(--radius-2xl)] border border-rose-300/20 bg-rose-300/10 px-6 py-12 text-center text-sm text-rose-100">
            {state.error}
          </div>
        ) : state.posts.length === 0 ? (
          <div className="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 px-6 py-12 text-center text-sm text-white/65">
            No published posts yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {state.posts.map((post, i) => (
              <motion.div
                key={post.id ?? post.slug}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
                variants={variants.fadeUp(i)}
              >
                <Card className="overflow-hidden">
                  {post.coverUrl ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    {post.publishedAt ? (
                      <div className="text-xs text-white/50">{post.publishedAt}</div>
                    ) : null}
                    <h3 className="mt-2 text-lg font-semibold text-white">{post.title}</h3>
                    {post.excerpt ? (
                      <p className="mt-2 text-sm leading-relaxed text-white/70">{post.excerpt}</p>
                    ) : null}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
                    >
                      Read more <FiArrowRight className="h-4 w-4" />
                    </Link>
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
