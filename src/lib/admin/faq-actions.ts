'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { faqCategorySchema, faqItemSchema } from '@/lib/validations/cms';

function revalidateFaqPaths() {
  revalidatePath('/admin/faq');
  revalidatePath('/admin/faq/categories');
  revalidatePath('/faq');
}

export async function createFaqCategoryAction(formData: FormData) {
  await requireStaff();
  const data = faqCategorySchema.parse({
    name: String(formData.get('name') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
  });
  await prisma.faqCategory.create({
    data: { name: data.name, sortOrder: data.sortOrder ?? 0 },
  });
  revalidateFaqPaths();
  redirect('/admin/faq/categories');
}

export async function updateFaqCategoryAction(id: string, formData: FormData) {
  await requireStaff();
  const data = faqCategorySchema.parse({
    name: String(formData.get('name') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
  });
  await prisma.faqCategory.update({
    where: { id },
    data: { name: data.name, sortOrder: data.sortOrder ?? 0 },
  });
  revalidateFaqPaths();
  redirect('/admin/faq/categories');
}

export async function deleteFaqCategoryAction(id: string) {
  await requireStaff();
  await prisma.faqItem.deleteMany({ where: { categoryId: id } });
  await prisma.faqCategory.delete({ where: { id } });
  revalidateFaqPaths();
  redirect('/admin/faq/categories');
}

export async function deleteFaqCategoryFormAction(formData: FormData) {
  const id = String(formData.get('categoryId') ?? '').trim();
  if (!id) return;
  await deleteFaqCategoryAction(id);
}

export async function createFaqItemAction(formData: FormData) {
  await requireStaff();
  const data = faqItemSchema.parse({
    categoryId: String(formData.get('categoryId') ?? ''),
    question: String(formData.get('question') ?? '').trim(),
    answer: String(formData.get('answer') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
    published: formData.get('published') === 'on',
  });
  await prisma.faqItem.create({
    data: {
      categoryId: data.categoryId,
      question: data.question,
      answer: data.answer,
      sortOrder: data.sortOrder ?? 0,
      published: data.published ?? true,
    },
  });
  revalidateFaqPaths();
  redirect('/admin/faq');
}

export async function updateFaqItemAction(id: string, formData: FormData) {
  await requireStaff();
  const data = faqItemSchema.parse({
    categoryId: String(formData.get('categoryId') ?? ''),
    question: String(formData.get('question') ?? '').trim(),
    answer: String(formData.get('answer') ?? '').trim(),
    sortOrder: formData.get('sortOrder') || 0,
    published: formData.get('published') === 'on',
  });
  await prisma.faqItem.update({
    where: { id },
    data: {
      categoryId: data.categoryId,
      question: data.question,
      answer: data.answer,
      sortOrder: data.sortOrder ?? 0,
      published: data.published ?? true,
    },
  });
  revalidateFaqPaths();
  redirect('/admin/faq');
}

export async function deleteFaqItemAction(id: string) {
  await requireStaff();
  await prisma.faqItem.delete({ where: { id } });
  revalidateFaqPaths();
  redirect('/admin/faq');
}

export async function deleteFaqItemFormAction(formData: FormData) {
  const id = String(formData.get('itemId') ?? '').trim();
  if (!id) return;
  await deleteFaqItemAction(id);
}
