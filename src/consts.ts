import { profile } from './data/profile';

export const SITE = {
  title: `${profile.name} — ${profile.title}`,
  description:
    'Notes from Joy on computer vision, edge AI, messy datasets, and shipping things that work outside the demo.',
  url: 'https://timmermansjoy.github.io',
  author: profile.name,
  locale: 'en',
} as const;
