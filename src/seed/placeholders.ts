import { AppDto, ExperienceDto, PostDto, ProfileDto, StackCategoryDto } from '../types/content';

export const placeholderProfile: ProfileDto = {
  name: 'Bakytbek Tatibekov',
  shortName: 'Bakytbek',
  initials: 'BT',
  role: 'Sr. Software Engineer',
  location: 'Remote — open globally',
  email: 'beckprograms@gmail.com',
  resumeUrl: '/resume.pdf',
  bio: {
    short: 'Senior software engineer focused on developer tools, infrastructure, and TypeScript-first web apps.',
    long: [
      'I build pragmatic systems — clean data models, RSC-first frontends, and CI gates that catch regressions before they ship.',
      'Currently exploring agentic developer workflows and the seam between AI tooling and traditional engineering practice.'
    ]
  },
  highlights: [
    { value: '12+', label: 'years engineering' },
    { value: '4',   label: 'apps shipped' },
    { value: 'OSS', label: 'open-source contributor' }
  ],
  socials: [
    { label: 'GitHub',   handle: '@beckinfonet', url: 'https://github.com/beckinfonet',     kind: 'github' },
    { label: 'LinkedIn', handle: 'in/bakytbek',  url: 'https://linkedin.com/in/bakytbek',  kind: 'linkedin' }
  ]
};

export const placeholderStack: StackCategoryDto[] = [
  { category: 'languages', items: ['TypeScript', 'Python', 'Swift'] },
  { category: 'frameworks', items: ['Next.js', 'React', 'React Native'] },
  { category: 'cloud', items: ['AWS'] },
  { category: 'ai', items: ['LangChain', 'agentic systems'] }
];

export const placeholderExperience: ExperienceDto[] = [
  {
    company: 'Acme Studio',
    role: 'Full Stack Engineer',
    startDate: '2022-01-01',
    endDate: 'Present',
    highlights: ['Led API modernization', 'Improved CI reliability']
  }
];

export const placeholderApps: AppDto[] = [
  {
    name: 'Portfolio Web',
    description: 'Personal portfolio website built with modern frontend tooling.',
    stack: ['React', 'TypeScript', 'Vite'],
    url: 'https://github.com/beckinfonet/portfolio-web'
  }
];

export const placeholderPosts: PostDto[] = [
  {
    title: 'Designing APIs That Age Well',
    slug: 'designing-apis-that-age-well',
    excerpt: 'A practical approach to stable API contracts over time.',
    publishedAt: '2025-12-01'
  },
  {
    title: 'Type-Safe Backend Patterns',
    slug: 'type-safe-backend-patterns',
    excerpt: 'Patterns that improve confidence and speed in Node services.',
    publishedAt: '2025-10-15'
  },
  {
    title: 'Testing Express Controllers',
    slug: 'testing-express-controllers',
    excerpt: 'How to keep tests focused on behavior and contract shape.',
    publishedAt: '2025-08-03'
  },
  {
    title: 'Pragmatic Mongo Modeling',
    slug: 'pragmatic-mongo-modeling',
    excerpt: 'Schema choices that keep data flexible without chaos.',
    publishedAt: '2025-06-21'
  }
];
