import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return cmsPageMetadata('achievements');
}

export default async function AchievementsPage() {
  return renderCmsPage('achievements');
}
