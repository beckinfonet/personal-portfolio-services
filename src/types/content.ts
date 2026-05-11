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

// Mirror of portfolio-web/lib/types.ts ShippedApp (paired-commit / D-19).
export type AppDto = {
  name: string;
  platforms: Array<'ios' | 'android'>;
  appStoreUrl?: string;       // required when platforms includes 'ios'
  googlePlayUrl?: string;     // required when platforms includes 'android'
  role: string;
  year: string;
  summary?: string;
};

// Mirror of portfolio-web/lib/types.ts Writing (paired-commit / D-19).
export type PostDto = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;       // "April 2026" — uppercased on render
  readTime: string;   // "5 min read"
  link: string;       // https URL to full post
};

// Mirror of portfolio-web/lib/types.ts Project (paired-commit / D-19).
export type ProjectDto = {
  name: string;
  year: string;
  status: string;     // "shipped" | "active" | "archived"
  summary: string;
  tech: string[];
  role: string;
  link: string;       // https URL
};
