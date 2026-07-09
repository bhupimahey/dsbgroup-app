export const PUBLIC_CACHE_TAGS = {
  blog: 'public-blog',
  articles: 'public-articles',
  newsletters: 'public-newsletters',
  offices: 'public-offices',
  services: 'public-services',
  home: 'public-home',
  faq: 'public-faq',
  team: 'public-team',
} as const;

export type PublicCacheTag = (typeof PUBLIC_CACHE_TAGS)[keyof typeof PUBLIC_CACHE_TAGS];
