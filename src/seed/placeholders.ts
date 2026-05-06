import { AppDto, ExperienceDto, PostDto, ProfileDto, SkillDto } from '../types/content';

export const placeholderProfile: ProfileDto = {
  fullName: 'Beck Maldin',
  title: 'Software Engineer',
  bio: 'I build polished full-stack products with practical UX and robust backend systems.',
  location: 'Remote',
  email: 'hello@example.com'
};

export const placeholderSkills: SkillDto[] = [
  { name: 'TypeScript', category: 'language', level: 'advanced' },
  { name: 'Node.js', category: 'backend', level: 'advanced' },
  { name: 'React', category: 'frontend', level: 'advanced' }
];

export const placeholderExperience: ExperienceDto[] = [
  {
    company: 'Example Co',
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
    url: 'https://example.com/apps/portfolio-web'
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
