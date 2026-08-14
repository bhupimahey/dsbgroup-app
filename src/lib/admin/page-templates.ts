import type { PageEditorKind } from '@/lib/admin/page-editor-kind';

export type { PageEditorKind };

export async function getPageEditorKind(slug: string): Promise<PageEditorKind> {
  const { prisma } = await import('@/lib/db');
  if (slug === 'about') return 'about';
  if (slug === 'services') return 'services-index';
  if (slug === 'nbfc') return 'nbfc';
  if (slug === 'about-hr-labour-law' || slug === 'hr-labour-laws') return 'hr-labour';
  const service = await prisma.serviceCategory.findUnique({ where: { slug }, select: { id: true } });
  if (service) return 'service-detail';
  return 'standard';
}
