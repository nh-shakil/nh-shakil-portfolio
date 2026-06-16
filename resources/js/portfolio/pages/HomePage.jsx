import React, { useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Services } from '../sections/Services';
import { Projects } from '../sections/Projects';
import { Process } from '../sections/Process';
import { Timeline } from '../sections/Timeline';
import { SuccessGallery } from '../sections/SuccessGallery';
import { Contact } from '../sections/Contact';
import { Footer } from '../sections/Footer';

export function HomePage({ site }) {
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '');
    if (!hash) return;

    const timer = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Hero site={site} />
      <About site={site} />
      <Skills site={site} />
      <Services site={site} />
      <Projects site={site} />
      <Process site={site} />
      <Timeline site={site} />
      <SuccessGallery site={site} />
      <Contact site={site} />
      <Footer site={site} />
    </>
  );
}
