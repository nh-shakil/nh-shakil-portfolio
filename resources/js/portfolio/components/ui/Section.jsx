import React from 'react';
import { motion, useInView } from 'framer-motion';
import { variants } from '../../lib/motion';

export function Section({ id, eyebrow, title, desc, children, className = '' }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { margin: '-10% 0px -35% 0px', once: true });

  return (
    <section id={id} ref={ref} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="container-shell">
        {(eyebrow || title || desc) && (
          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={variants.fadeUp(0)}
            className="max-w-2xl"
          >
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <span>{eyebrow}</span>
              </div>
            )}
            {title && (
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {desc && <p className="mt-4 text-pretty text-base text-white/70">{desc}</p>}
          </motion.div>
        )}

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

