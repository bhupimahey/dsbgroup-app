'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { serviceCategorySchema } from '@/lib/validations/cms';

function revalidateServiceCategoryPaths() {
  revalidatePath('/admin/service-categories');
  revalidatePath('/admin/newsletters');
}

export async function createServiceCategoryAction(formData: FormData) {
  await requireStaff();
  const data = serviceCategorySchema.parse({
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
    active: formData.get('active') === 'on',
  });
  await prisma.serviceCategory.create({
    data: {
      slug: data.slug,
      name: data.name,
      sortOrder: data.sortOrder ?? 0,
      active: data.active ?? true,
    },
  });
  revalidateServiceCategoryPaths();
  redirect('/admin/service-categories');
}

export async function updateServiceCategoryAction(id: string, formData: FormData) {
  await requireStaff();
  const data = serviceCategorySchema.parse({
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
    active: formData.get('active') === 'on',
  });
  await prisma.serviceCategory.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      sortOrder: data.sortOrder ?? 0,
      active: data.active ?? true,
    },
  });
  revalidateServiceCategoryPaths();
  redirect('/admin/service-categories');
}

export async function deleteServiceCategoryAction(id: string) {
  await requireStaff();
  await prisma.serviceCategory.delete({ where: { id } });
  revalidateServiceCategoryPaths();
  redirect('/admin/service-categories');
}
