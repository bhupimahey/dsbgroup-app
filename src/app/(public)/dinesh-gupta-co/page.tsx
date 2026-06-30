import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 60;

export async function generateMetadata() {
  return cmsPageMetadata('dinesh-gupta');
}

export default async function DineshGuptaCoPage() {
  return renderCmsPage('dinesh-gupta');
}
