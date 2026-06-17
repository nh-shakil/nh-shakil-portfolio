import React from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium tracking-tight transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black touch-manipulation active:scale-[0.98]';

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

  const compProps =
    Comp === 'a'
      ? { href, onClick, ...rest }
      : { onClick, ...rest };

  return (
    <div className={className.includes('w-full') ? 'w-full' : undefined}>
      <Comp
        {...compProps}
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </Comp>
    </div>
  );
}

