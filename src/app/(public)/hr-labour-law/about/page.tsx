import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  return cmsPageMetadata('about-hr-labour-law');
}

export default async function AboutHrLabourLawPage() {
  return renderCmsPage('about-hr-labour-law');
}
