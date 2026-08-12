'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { pageSchema } from '@/lib/validations/cms';
import {
  ABOUT_PAGE_BODY_PLACEHOLDER,
  parseAboutPageForm,
} from '@/lib/site/about-page-json';

function parseStandardPageForm(formData: FormData) {
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

function isAboutTemplate(formData: FormData) {
  return formData.get('aboutTemplate') === '1';
}

function parseSharedMeta(formData: FormData) {
  return {
    slug: String(formData.get('slug') ?? '').trim(),
    metaDescription: String(formData.get('metaDescription') ?? '').trim() || null,
    metaKeywords: String(formData.get('metaKeywords') ?? '').trim() || null,
    imagePath: String(formData.get('imagePath') ?? '').trim() || null,
    published: formData.get('published') === 'on',
  };
}

export async function createPageAction(formData: FormData) {
  await requireStaff();
  const data = parseStandardPageForm(formData);

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

  if (isAboutTemplate(formData)) {
    const contentJson = parseAboutPageForm(formData);
    const meta = parseSharedMeta(formData);

    await prisma.page.update({
      where: { id },
      data: {
        slug: meta.slug,
        title: contentJson.introHeading,
        body: ABOUT_PAGE_BODY_PLACEHOLDER,
        contentJson,
        metaTitle: contentJson.heroTitle,
        metaDescription: meta.metaDescription,
        metaKeywords: meta.metaKeywords,
        imagePath: meta.imagePath,
        published: meta.published,
      },
    });

    revalidatePath('/admin/pages');
    revalidatePath('/about');
    redirect('/admin/pages');
  }

  const data = parseStandardPageForm(formData);

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
  if (data.slug === 'about') {
    revalidatePath('/about');
  }
  redirect('/admin/pages');
}

export async function deletePageAction(id: string) {
  await requireStaff();
  const page = await prisma.page.findUnique({ where: { id }, select: { slug: true } });
  await prisma.page.delete({ where: { id } });
  revalidatePath('/admin/pages');
  if (page?.slug === 'about') {
    revalidatePath('/about');
  }
  redirect('/admin/pages');
}
