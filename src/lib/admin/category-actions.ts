'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { revalidateBlogCache } from '@/lib/db/revalidate-public';
import { requireStaff } from '@/lib/admin/require-staff';
import { categorySchema } from '@/lib/validations/cms';

export async function createCategoryAction(formData: FormData) {
  await requireStaff();
  const data = categorySchema.parse({
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
  });
  await prisma.category.create({ data: data });
  revalidatePath('/admin/categories');
  revalidatePath('/blog');
  revalidateBlogCache();
  redirect('/admin/categories');
}

export async function updateCategoryAction(id: string, formData: FormData) {
  await requireStaff();
  const data = categorySchema.parse({
    slug: String(formData.get('slug') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
  });
  await prisma.category.update({ where: { id }, data });
  revalidatePath('/admin/categories');
  revalidatePath('/blog');
  revalidateBlogCache();
  redirect('/admin/categories');
}

export async function deleteCategoryAction(id: string) {
  await requireStaff();
  await prisma.category.delete({ where: { id } });
  revalidatePath('/admin/categories');
  revalidatePath('/blog');
  revalidateBlogCache();
  redirect('/admin/categories');
}
