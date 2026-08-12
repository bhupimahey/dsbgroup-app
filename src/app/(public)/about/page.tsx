import { notFound } from 'next/navigation';
import AboutPageContent from '@/components/about/AboutPageContent';
import { cmsPageMetadata } from '@/lib/cms-page';
import { getPublishedPageBySlug } from '@/lib/cms/cache';
import { getTeamMembers } from '@/lib/db/public-data';
import { resolveAboutPageContent } from '@/lib/site/about-page-content';
import '@/styles/about-page.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return cmsPageMetadata('about');
}

export default async function AboutPage() {
  const [page, teamMembers] = await Promise.all([
    getPublishedPageBySlug('about'),
    getTeamMembers(),
  ]);

  if (!page) {
    notFound();
  }

  const content = resolveAboutPageContent(page);

  return <AboutPageContent content={content} teamMembers={teamMembers} />;
}
