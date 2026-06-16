function pickDefined(obj) {
  if (!obj) return {};
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== ''),
  );
}

export const defaultSite = {
  name: 'NH Shakil',
  title: 'Software Engineer & Full Stack Developer',
  location: 'Bangladesh',
  profileImage: '/uploads/profilephotos.jpeg',
  tagline:
    'I build clean, responsive web & mobile products with premium UI, reliable APIs, and scalable architecture.',
  socials: {
    github: 'https://github.com/nh-shakil',
    linkedin: 'https://www.linkedin.com/in/engrnhshakil/',
    facebook: 'https://www.facebook.com/Engr.nhshakil',
    instagram: 'https://www.instagram.com/nhshakil.ee/',
    website: 'https://nhshakil.softzen.net',
    company: 'https://softzen.net/',
    email: 'mailto:nhshakil.ee@gmail.com',
    whatsapp: 'https://wa.me/8801643894554',
  },
  hero: {
    availability: 'Available for freelance • Open to remote roles',
    metrics: [
      { label: 'Primary', value: 'Laravel (Backend) • REST API' },
      { label: 'Frontend', value: 'React • Tailwind' },
      { label: 'Mobile', value: 'Flutter' },
      { label: 'Workflow', value: 'Git • GitHub' },
    ],
    noteTitle: 'What I care about',
    note:
      'Clean code, practical architecture, and UI that feels fast—on mobile first.',
  },
  ctas: {
    primary: { label: 'View Projects', href: '#projects' },
    secondary: { label: 'Contact Me', href: '#contact' },
  },
  cvUrl: null,
  about: {
    headline: 'Building modern products end-to-end.',
    bio: [
      "I’m NH Shakil—an Electrical Engineer & Laravel Developer focused on clean, responsive, and unique solutions based on real client requirements.",
      'I build backend systems with Laravel, design scalable REST APIs, and integrate modern frontend tools for a premium product experience.',
      'I bridge software and engineering thinking to deliver practical, maintainable, real-world solutions.',
    ],
    availability: 'Open to opportunities • Bangladesh • Remote-friendly',
    highlights: [
      { label: 'Full Stack', value: 'Laravel • React • Flutter' },
      { label: 'API-First', value: 'REST • Auth • Integrations' },
      { label: 'Quality', value: 'Testing • DX • Performance' },
    ],
  },
  skills: [
    { name: 'Laravel', level: 92 },
    { name: 'PHP', level: 90 },
    { name: 'React', level: 88 },
    { name: 'Flutter', level: 82 },
    { name: 'MySQL', level: 86 },
    { name: 'Tailwind CSS', level: 90 },
    { name: 'REST API', level: 89 },
    { name: 'Git & GitHub', level: 91 },
  ],
  services: [
    {
      title: 'Web Development',
      desc: 'Responsive, accessible web apps with modern UI, strong performance, and scalable architecture.',
    },
    {
      title: 'Mobile App Development',
      desc: 'Flutter apps with consistent UX, robust state management, and smooth interactions.',
    },
    {
      title: 'API Development',
      desc: 'Laravel APIs with clean resources, validation, authentication, and integration-ready endpoints.',
    },
    {
      title: 'Admin Panel Development',
      desc: 'Secure dashboards with roles/permissions, data tables, analytics, and great usability.',
    },
  ],
  projects: [
    {
      name: 'Laravel + Flutter Tourism App',
      desc: 'Custom Admin Panel (Laravel) + Mobile App (Flutter) for exploring historical places and tours.',
      stack: ['Laravel', 'Flutter', 'REST API', 'MySQL'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      name: 'Audiotour / Audioguide Platform',
      desc: 'Android app + backend API for guided tours, content delivery, and admin management.',
      stack: ['Flutter', 'Laravel', 'API Development'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      name: 'Notification System (Users + Admin)',
      desc: 'A complete notification engine to support both users and admins with scalable structure.',
      stack: ['Laravel', 'REST API', 'Backend'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ],
  process: [
    {
      title: 'Discovery',
      desc: 'Clarify goals, constraints, users, and success metrics before writing code.',
    },
    {
      title: 'Design',
      desc: 'Create a clean system: components, motion rules, and information architecture.',
    },
    {
      title: 'Development',
      desc: 'Build with maintainable patterns, predictable state, and reusable UI blocks.',
    },
    {
      title: 'Testing',
      desc: 'Validate key flows, edge cases, accessibility, and performance budgets.',
    },
    {
      title: 'Deployment',
      desc: 'Ship with SEO, analytics readiness, and a reliable release checklist.',
    },
  ],
  timeline: [
    {
      type: 'experience',
      title: 'Back End Developer',
      org: 'Intigrad Technologies (Australia)',
      period: 'Jul 2025 — Present',
      desc: 'Backend web development with Laravel, API integration, and production-focused engineering practices.',
    },
    {
      type: 'experience',
      title: 'Instructor',
      org: 'Shahrasti Science and Technology Institute',
      period: 'Jan 2024 — Present',
      desc: 'Teaching and mentoring with a focus on practical skills, structured learning, and real-world examples.',
    },
    {
      type: 'education',
      title: 'Diploma in Electrical Engineering (Completed)',
      org: 'CCN Polytechnic Institute',
      period: '2020 — 2024',
      desc: 'Completed foundational engineering coursework with practical lab-based learning and project work.',
    },
    {
      type: 'education',
      title: 'BSc in Computer Science',
      org: 'University of South Asia',
      period: 'Ongoing',
      desc: 'Studying computer science with focus on software engineering, web technologies, and system design.',
    },
  ],
  contact: {
    headline: "Let’s build something premium.",
    desc: 'Send a message and I’ll reply with next steps, timeline, and a clear estimate.',
  },
};

export const site = defaultSite;

export function mergeSiteSettings(apiSite) {
  if (!apiSite) return defaultSite;

  const merged = {
    ...defaultSite,
    ...pickDefined({
      name: apiSite.name,
      title: apiSite.title,
      location: apiSite.location,
      tagline: apiSite.tagline,
      profileImage: apiSite.profileImage,
      cvUrl: apiSite.cvUrl,
    }),
    socials: { ...defaultSite.socials, ...pickDefined(apiSite.socials) },
    hero: {
      ...defaultSite.hero,
      ...pickDefined({
        availability: apiSite.hero?.availability,
        noteTitle: apiSite.hero?.noteTitle,
        note: apiSite.hero?.note,
      }),
      metrics:
        apiSite.hero?.metrics?.length > 0 ? apiSite.hero.metrics : defaultSite.hero.metrics,
    },
    ctas: {
      primary: { ...defaultSite.ctas.primary, ...pickDefined(apiSite.ctas?.primary) },
      secondary: { ...defaultSite.ctas.secondary, ...pickDefined(apiSite.ctas?.secondary) },
    },
    about: {
      ...defaultSite.about,
      ...pickDefined({
        headline: apiSite.about?.headline,
        availability: apiSite.about?.availability,
      }),
      bio: apiSite.about?.bio?.length > 0 ? apiSite.about.bio : defaultSite.about.bio,
    },
    contact: {
      ...defaultSite.contact,
      ...pickDefined({
        headline: apiSite.contact?.headline,
        desc: apiSite.contact?.desc,
      }),
    },
    timeline:
      Array.isArray(apiSite.timeline) && apiSite.timeline.length > 0
        ? apiSite.timeline
        : defaultSite.timeline,
  };

  return merged;
}

