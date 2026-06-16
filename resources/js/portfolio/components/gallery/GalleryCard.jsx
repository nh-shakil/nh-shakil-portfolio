import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ProjectCarousel } from '../projects/ProjectCarousel';
import { variants } from '../../lib/motion';

export function GalleryCard({ item, index = 0 }) {
  const images = item.images ?? [];
  if (!images.length) return null;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px -30% 0px' }}
      variants={variants.fadeUp(index)}
    >
      <Card className="overflow-hidden">
        <ProjectCarousel
          images={images}
          title={item.title || 'Gallery'}
          aspectClass="aspect-[4/3]"
          autoPlay={images.length > 1}
        />
        {(item.title || item.caption) && (
          <div className="border-t border-white/10 p-4">
            {item.title ? <div className="text-sm font-semibold text-white">{item.title}</div> : null}
            {item.caption ? (
              <div className="mt-1 text-xs leading-relaxed text-white/70">{item.caption}</div>
            ) : null}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
