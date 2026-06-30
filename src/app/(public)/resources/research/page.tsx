import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 60;

export async function generateMetadata() {
  return cmsPageMetadata('research');
}

export default async function ResearchPage() {
  return renderCmsPage('research');
}
