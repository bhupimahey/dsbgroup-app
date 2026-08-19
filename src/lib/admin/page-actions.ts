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
import {
  parseServiceDetailForm,
  parseServicesIndexForm,
  SERVICE_PAGE_BODY_PLACEHOLDER,
  SERVICES_INDEX_BODY_PLACEHOLDER,
} from '@/lib/site/service-page-json';
import {
  HOME_PAGE_BODY_PLACEHOLDER,
  parseHomePageForm,
} from '@/lib/site/home-page-json';
import { NBFC_PAGE_BODY_PLACEHOLDER, parseNbfcPageForm } from '@/lib/site/nbfc-page-json';
import {
  HR_LABOUR_PAGE_BODY_PLACEHOLDER,
  parseHrLabourPageForm,
} from '@/lib/site/hr-labour-page-json';

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

function parseSharedMeta(formData: FormData) {
  return {
    slug: String(formData.get('slug') ?? '').trim(),
    metaDescription: String(formData.get('metaDescription') ?? '').trim() || null,
    metaKeywords: String(formData.get('metaKeywords') ?? '').trim() || null,
    imagePath: String(formData.get('imagePath') ?? '').trim() || null,
    published: formData.get('published') === 'on',
  };
}

function revalidateServicePaths(slug: string) {
  revalidatePath('/services');
  revalidatePath(`/pages/${slug}`);
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

  if (formData.get('homeTemplate') === '1') {
    const contentJson = parseHomePageForm(formData);
    const meta = parseSharedMeta(formData);

    await prisma.page.update({
      where: { id },
      data: {
        slug: 'home',
        title: contentJson.heroHeading,
        body: HOME_PAGE_BODY_PLACEHOLDER,
        contentJson,
        metaTitle: `${contentJson.heroHeading} | ${contentJson.heroTagline}`,
        metaDescription: meta.metaDescription,
        metaKeywords: meta.metaKeywords,
        imagePath: contentJson.heroImagePath || null,
        published: meta.published,
      },
    });

    revalidatePath('/admin/pages');
    revalidatePath('/');
    redirect('/admin/pages');
  }

  if (formData.get('aboutTemplate') === '1') {
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

  if (formData.get('servicesIndexTemplate') === '1') {
    const contentJson = parseServicesIndexForm(formData);
    const meta = parseSharedMeta(formData);

    await prisma.page.update({
      where: { id },
      data: {
        slug: meta.slug,
        title: contentJson.heroTitle,
        body: SERVICES_INDEX_BODY_PLACEHOLDER,
        contentJson,
        metaTitle: contentJson.heroTitle,
        metaDescription: meta.metaDescription,
        metaKeywords: meta.metaKeywords,
        published: meta.published,
      },
    });

    revalidatePath('/admin/pages');
    revalidatePath('/services');
    redirect('/admin/pages');
  }

  if (formData.get('nbfcTemplate') === '1') {
    const contentJson = parseNbfcPageForm(formData);
    const meta = parseSharedMeta(formData);

    await prisma.page.update({
      where: { id },
      data: {
        slug: meta.slug,
        title: contentJson.introHeading,
        body: NBFC_PAGE_BODY_PLACEHOLDER,
        contentJson,
        metaTitle: contentJson.heroTitle,
        metaDescription: meta.metaDescription,
        metaKeywords: meta.metaKeywords,
        imagePath: meta.imagePath,
        published: meta.published,
      },
    });

    revalidatePath('/admin/pages');
    revalidatePath('/nbfc');
    redirect('/admin/pages');
  }

  if (formData.get('hrLabourTemplate') === '1') {
    const contentJson = parseHrLabourPageForm(formData);
    const meta = parseSharedMeta(formData);

    await prisma.page.update({
      where: { id },
      data: {
        slug: meta.slug,
        title: contentJson.heroTitle,
        body: HR_LABOUR_PAGE_BODY_PLACEHOLDER,
        contentJson,
        metaTitle: contentJson.heroTitle,
        metaDescription: meta.metaDescription,
        metaKeywords: meta.metaKeywords,
        imagePath: meta.imagePath,
        published: meta.published,
      },
    });

    revalidatePath('/admin/pages');
    revalidatePath('/hr-labour-law/about');
    redirect('/admin/pages');
  }

  if (formData.get('serviceDetailTemplate') === '1') {
    const contentJson = parseServiceDetailForm(formData);
    const title = String(formData.get('title') ?? '').trim();
    const meta = parseSharedMeta(formData);

    await prisma.page.update({
      where: { id },
      data: {
        slug: meta.slug,
        title,
        body: SERVICE_PAGE_BODY_PLACEHOLDER,
        contentJson,
        metaTitle: `${title} | DSB Law Group`,
        metaDescription: meta.metaDescription,
        metaKeywords: meta.metaKeywords,
        imagePath: meta.imagePath,
        published: meta.published,
      },
    });

    revalidatePath('/admin/pages');
    revalidateServicePaths(meta.slug);
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
  if (data.slug === 'home') revalidatePath('/');
  if (data.slug === 'about') revalidatePath('/about');
  if (data.slug === 'services') revalidatePath('/services');
  if (data.slug === 'nbfc') revalidatePath('/nbfc');
  if (data.slug === 'about-hr-labour-law' || data.slug === 'hr-labour-laws') {
    revalidatePath('/hr-labour-law/about');
  }
  redirect('/admin/pages');
}

export async function deletePageAction(id: string) {
  await requireStaff();
  const page = await prisma.page.findUnique({ where: { id }, select: { slug: true } });
  await prisma.page.delete({ where: { id } });
  revalidatePath('/admin/pages');
  if (page?.slug === 'home') revalidatePath('/');
  if (page?.slug === 'about') revalidatePath('/about');
  if (page?.slug === 'services') revalidatePath('/services');
  if (page?.slug === 'nbfc') revalidatePath('/nbfc');
  if (page?.slug === 'about-hr-labour-law' || page?.slug === 'hr-labour-laws') {
    revalidatePath('/hr-labour-law/about');
  }
  if (page?.slug) revalidatePath(`/pages/${page.slug}`);
  redirect('/admin/pages');
}
