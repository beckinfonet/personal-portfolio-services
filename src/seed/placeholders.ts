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
    company: 'Independent',
    role: 'Sr. Software Engineer',
    period: '2022 - present',
    summary: 'Building developer tools and AI-assisted engineering workflows across full-stack TypeScript and infrastructure projects.'
  }
];

export const placeholderApps: AppDto[] = [
  {
    name: 'Demo App',
    platforms: ['ios', 'android'],
    appStoreUrl: 'https://apps.apple.com/us/app/demo/id000000000',
    googlePlayUrl: 'https://play.google.com/store/apps/details?id=com.demo.app',
    role: 'lead',
    year: '2024',
    summary: 'Fallback when Mongo is unseeded. Real apps live in src/seed/apps.json.'
  }
];

export const placeholderPosts: PostDto[] = [
  {
    title: 'Designing APIs That Age Well',
    slug: 'designing-apis-that-age-well',
    excerpt: 'A practical approach to stable API contracts over time.',
    date: '2025-12-01',
    readTime: '7 min read',
    link: 'https://github.com/beckinfonet'
  }
];
