import React, { useEffect, useMemo } from 'react';
import Lenis from 'lenis';
import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/layout/SiteShell';
import { HomePage } from './pages/HomePage';
import { AllProjectsPage } from './pages/AllProjectsPage';
import { AllGalleryPage } from './pages/AllGalleryPage';
import { AllBlogPage } from './pages/AllBlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { useSite } from './hooks/useSite';
import { prefersReducedMotion } from './lib/a11y';

function AppLoader() {
  return (
    <div className="container-shell py-16">
      <div className="rounded-[26px] border border-white/10 bg-white/5 px-6 py-10 text-white/80">
        <div className="text-lg font-semibold text-white">Loading…</div>
        <div className="mt-2 text-sm text-white/60">Preparing the portfolio experience.</div>
      </div>
    </div>
  );
}

export function App() {
  const { site, loading } = useSite();
  const reduceMotion = prefersReducedMotion();

  const motionConfig = useMemo(
    () => ({
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    }),
    [reduceMotion],
  );

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      touchMultiplier: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduceMotion]);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <MotionConfig transition={motionConfig.transition}>
      <BrowserRouter>
        <SiteShell site={site}>
          <Routes>
            <Route path="/" element={<HomePage site={site} />} />
            <Route path="/projects" element={<AllProjectsPage site={site} />} />
            <Route path="/gallery" element={<AllGalleryPage site={site} loading={false} />} />
            <Route path="/blog" element={<AllBlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SiteShell>
      </BrowserRouter>
    </MotionConfig>
  );
}
