'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { serviceCategorySchema } from '@/lib/validations/cms';

function revalidateServiceCategoryPaths(slug?: string) {
  revalidatePath('/admin/service-categories');
  revalidatePath('/admin/newsletters');
  revalidatePath('/services');
  revalidatePath('/');
  if (slug) revalidatePath(`/pages/${slug}`);
}

function parseForm(formData: FormData) {
  return serviceCategorySchema.parse({
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    teaser: String(formData.get('teaser') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    imagePath: String(formData.get('imagePath') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
    active: formData.get('active') === 'on',
  });
}

function fieldValue(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function createServiceCategoryAction(formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  await prisma.serviceCategory.create({
    data: {
      slug: data.slug,
      name: data.name,
      teaser: fieldValue(data.teaser),
      description: fieldValue(data.description),
      imagePath: fieldValue(data.imagePath),
      sortOrder: data.sortOrder ?? 0,
      active: data.active ?? true,
    },
  });
  revalidateServiceCategoryPaths(data.slug);
  redirect('/admin/service-categories');
}

export async function updateServiceCategoryAction(id: string, formData: FormData) {
  await requireStaff();
  const data = parseForm(formData);
  await prisma.serviceCategory.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      teaser: fieldValue(data.teaser),
      description: fieldValue(data.description),
      imagePath: fieldValue(data.imagePath),
      sortOrder: data.sortOrder ?? 0,
      active: data.active ?? true,
    },
  });
  revalidateServiceCategoryPaths(data.slug);
  redirect('/admin/service-categories');
}

export async function deleteServiceCategoryAction(id: string) {
  await requireStaff();
  const record = await prisma.serviceCategory.findUnique({ where: { id }, select: { slug: true } });
  await prisma.serviceCategory.delete({ where: { id } });
  revalidateServiceCategoryPaths(record?.slug);
  redirect('/admin/service-categories');
}
