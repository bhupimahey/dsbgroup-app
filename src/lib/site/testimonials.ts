import { prisma } from '@/lib/db';
import type { TextTestimonial, VideoTestimonial } from '@/lib/site/testimonials-content';

function hasTestimonialModels(): boolean {
  return (
    typeof prisma.videoTestimonial?.findMany === 'function' &&
    typeof prisma.textTestimonial?.findMany === 'function'
  );
}

export async function getPublishedVideoTestimonials(): Promise<VideoTestimonial[]> {
  if (!hasTestimonialModels()) return [];

  try {
    return await prisma.videoTestimonial.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: { title: true, embedUrl: true },
    });
  } catch {
    return [];
  }
}

export async function getPublishedTextTestimonials(): Promise<TextTestimonial[]> {
  if (!hasTestimonialModels()) return [];

  try {
    const rows = await prisma.textTestimonial.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: { quote: true, name: true, role: true, imagePath: true },
    });

    return rows.map(({ quote, name, role, imagePath }) => ({
      quote,
      name,
      role,
      imagePath: imagePath ?? undefined,
    }));
  } catch {
    return [];
  }
}
