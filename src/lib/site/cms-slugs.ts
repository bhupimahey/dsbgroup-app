/** CMS page slugs managed in /admin/pages — used for seeding and public routes. */
export const CMS_SLUG = {
  about: 'about',
  achievements: 'achievements',
  nbfc: 'nbfc',
  ucbs: 'ucbs',
  dineshGupta: 'dinesh-gupta',
  aboutHrLabourLaw: 'about-hr-labour-law',
  newLabourCodes: 'new-labour-codes-compliance',
  hrLabourLaws: 'hr-labour-laws',
  research: 'research',
  podcasts: 'podcasts',
  videoLectures: 'video-lectures',
  disclaimer: 'disclaimer',
  privacy: 'privacy',
  terms: 'terms',
  careers: 'careers',
} as const;

export type CmsSlug = (typeof CMS_SLUG)[keyof typeof CMS_SLUG];
