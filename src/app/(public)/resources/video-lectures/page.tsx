import { cmsPageMetadata, renderCmsPage } from '@/lib/cms-page';

export const revalidate = 60;

export async function generateMetadata() {
  return cmsPageMetadata('video-lectures');
}

export default async function VideoLecturesPage() {
  return renderCmsPage('video-lectures');
}
