'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { normalizeYoutubeEmbedUrl } from '@/lib/youtube-embed';
import { textTestimonialSchema, videoTestimonialSchema } from '@/lib/validations/cms';

function revalidateTestimonialPaths() {
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  revalidatePath('/testimonials');
}

function parseVideoForm(formData: FormData) {
  const parsed = videoTestimonialSchema.parse({
    title: String(formData.get('title') ?? '').trim(),
    embedUrl: String(formData.get('embedUrl') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
    published: formData.get('published') === 'on',
  });

  return {
    title: parsed.title,
    embedUrl: normalizeYoutubeEmbedUrl(parsed.embedUrl),
    sortOrder: parsed.sortOrder ?? 0,
    published: parsed.published ?? true,
  };
}

function parseTextForm(formData: FormData) {
  const parsed = textTestimonialSchema.parse({
    quote: String(formData.get('quote') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    role: String(formData.get('role') ?? '').trim(),
    imagePath: String(formData.get('imagePath') ?? ''),
    sortOrder: formData.get('sortOrder') || 0,
    published: formData.get('published') === 'on',
  });

  return {
    quote: parsed.quote,
    name: parsed.name,
    role: parsed.role,
    imagePath: parsed.imagePath || null,
    sortOrder: parsed.sortOrder ?? 0,
    published: parsed.published ?? true,
  };
}

export async function createVideoTestimonialAction(formData: FormData) {
  await requireStaff();
  await prisma.videoTestimonial.create({ data: parseVideoForm(formData) });
  revalidateTestimonialPaths();
  redirect('/admin/testimonials');
}

export async function updateVideoTestimonialAction(id: string, formData: FormData) {
  await requireStaff();
  await prisma.videoTestimonial.update({ where: { id }, data: parseVideoForm(formData) });
  revalidateTestimonialPaths();
  redirect('/admin/testimonials');
}

export async function deleteVideoTestimonialAction(id: string) {
  await requireStaff();
  await prisma.videoTestimonial.delete({ where: { id } });
  revalidateTestimonialPaths();
  redirect('/admin/testimonials');
}

export async function createTextTestimonialAction(formData: FormData) {
  await requireStaff();
  await prisma.textTestimonial.create({ data: parseTextForm(formData) });
  revalidateTestimonialPaths();
  redirect('/admin/testimonials');
}

export async function updateTextTestimonialAction(id: string, formData: FormData) {
  await requireStaff();
  await prisma.textTestimonial.update({ where: { id }, data: parseTextForm(formData) });
  revalidateTestimonialPaths();
  redirect('/admin/testimonials');
}

export async function deleteTextTestimonialAction(id: string) {
  await requireStaff();
  await prisma.textTestimonial.delete({ where: { id } });
  revalidateTestimonialPaths();
  redirect('/admin/testimonials');
}
