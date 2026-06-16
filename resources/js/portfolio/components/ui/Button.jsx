import React from 'react';
import { motion } from 'framer-motion';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

export function Button({
  as: Comp = 'a',
  href,
  onClick,
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const styles =
    variant === 'primary'
      ? 'bg-white text-black hover:bg-white/90'
      : variant === 'ghost'
        ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
        : 'bg-transparent text-white/80 hover:text-white';

  return (
    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }}>
      <Comp
        href={href}
        onClick={onClick}
        className={`${base} ${styles} ${className}`}
        {...rest}
      >
        {children}
      </Comp>
    </motion.div>
  );
}

