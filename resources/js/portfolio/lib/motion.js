export const easings = {
  premium: [0.22, 1, 0.36, 1],
};

export const variants = {
  fadeUp: (i = 0) => ({
    hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.06 * i },
    },
  }),
  fade: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  scaleIn: (i = 0) => ({
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { delay: 0.05 * i } },
  }),
};

