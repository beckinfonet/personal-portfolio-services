// Mirror of portfolio-web/lib/types.ts Profile (paired-commit / D-19).
export type ProfileDto = {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  resumeUrl: string;
  bio: { short: string; long: string[] };
  highlights: Array<{ value: string; label: string }>;
  socials: Array<{
    label: string;
    handle: string;
    url: string;
    kind: 'github' | 'linkedin' | 'mastodon' | 'bluesky' | 'x' | 'email' | 'other';
  }>;
};

// Mirror of portfolio-web/lib/types.ts StackCategory (paired-commit / D-19).
export type StackCategoryDto = {
  category: string;
  items: string[];
};

// Mirror of portfolio-web/lib/types.ts Experience (paired-commit / D-19).
export type ExperienceDto = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export type AppDto = {
  name: string;
  description: string;
  stack: string[];
  url: string;
};

export type PostDto = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
};
