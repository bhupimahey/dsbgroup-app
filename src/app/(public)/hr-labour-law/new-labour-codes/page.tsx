import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 300;

export async function generateMetadata() {
  return cmsPageMetadata('new-labour-codes-compliance');
}

export default async function NewLabourCodesPage() {
  return renderCmsPage('new-labour-codes-compliance');
}
