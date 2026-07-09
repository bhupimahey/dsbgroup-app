import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('about-hr-labour-law');
}

export default async function AboutHrLabourLawPage() {
  return renderCmsPage('about-hr-labour-law');
}
