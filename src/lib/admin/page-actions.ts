'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { pageSchema } from '@/lib/validations/cms';

function parsePageForm(formData: FormData) {
  return pageSchema.parse({
    slug: String(formData.get('slug') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    body: String(formData.get('body') ?? ''),
    metaTitle: String(formData.get('metaTitle') ?? ''),
    metaDescription: String(formData.get('metaDescription') ?? ''),
    metaKeywords: String(formData.get('metaKeywords') ?? ''),
    imagePath: String(formData.get('imagePath') ?? ''),
    published: formData.get('published') === 'on',
  });
}

export async function createPageAction(formData: FormData) {
  await requireStaff();
  const data = parsePageForm(formData);

  await prisma.page.create({
    data: {
      slug: data.slug,
      title: data.title,
      body: data.body,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      metaKeywords: data.metaKeywords || null,
      imagePath: data.imagePath || null,
      published: data.published ?? false,
    },
  });

  revalidatePath('/admin/pages');
  redirect('/admin/pages');
}

export async function updatePageAction(id: string, formData: FormData) {
  await requireStaff();
  const data = parsePageForm(formData);

  await prisma.page.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      body: data.body,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      metaKeywords: data.metaKeywords || null,
      imagePath: data.imagePath || null,
      published: data.published ?? false,
    },
  });

  revalidatePath('/admin/pages');
  redirect('/admin/pages');
}

export async function deletePageAction(id: string) {
  await requireStaff();
  await prisma.page.delete({ where: { id } });
  revalidatePath('/admin/pages');
  redirect('/admin/pages');
}
