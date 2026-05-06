export type ProfileDto = {
  fullName: string;
  title: string;
  bio: string;
  location: string;
  email: string;
};

export type SkillDto = {
  name: string;
  category: string;
  level: string;
};

export type ExperienceDto = {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  highlights: string[];
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
