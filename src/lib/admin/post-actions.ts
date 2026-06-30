'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { requireStaff } from '@/lib/admin/require-staff';
import { adminPostListPath, typeToPostKind } from '@/lib/admin/post-routes';
import { postSchema } from '@/lib/validations/cms';
import type { PostType } from '@/generated/prisma/client';

function parsePostForm(formData: FormData) {
  return {
    data: postSchema.parse({
      slug: String(formData.get('slug') ?? '').trim(),
      title: String(formData.get('title') ?? '').trim(),
      teaser: String(formData.get('teaser') ?? '').trim(),
      body: String(formData.get('body') ?? ''),
      type: String(formData.get('type') ?? 'BLOG'),
      visibility: String(formData.get('visibility') ?? 'PUBLIC'),
      metaTitle: String(formData.get('metaTitle') ?? ''),
      metaDescription: String(formData.get('metaDescription') ?? ''),
      metaKeywords: String(formData.get('metaKeywords') ?? ''),
      featuredImagePath: String(formData.get('featuredImagePath') ?? ''),
      published: formData.get('published') === 'on',
    }),
    categoryIds: formData.getAll('categoryIds').map(String).filter(Boolean),
  };
}

async function syncCategories(postId: string, categoryIds: string[], type: PostType) {
  await prisma.postCategory.deleteMany({ where: { postId } });
  if (type === 'BLOG' && categoryIds.length > 0) {
    await prisma.postCategory.createMany({
      data: categoryIds.map((categoryId) => ({ postId, categoryId })),
    });
  }
}

function revalidatePostPaths() {
  revalidatePath('/admin/blog');
  revalidatePath('/admin/articles');
  revalidatePath('/admin/posts');
  revalidatePath('/blog');
  revalidatePath('/articles');
}

export async function createPostAction(formData: FormData) {
  await requireStaff();
  const { data, categoryIds } = parsePostForm(formData);
  const published = data.published ?? false;
  const type = data.type;
  const visibility = type === 'BLOG' ? 'PUBLIC' : data.visibility;

  const post = await prisma.post.create({
    data: {
      slug: data.slug,
      title: data.title,
      teaser: data.teaser,
      body: data.body,
      type,
      visibility,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      metaKeywords: data.metaKeywords || null,
      featuredImagePath: data.featuredImagePath || null,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  await syncCategories(post.id, categoryIds, type);
  revalidatePostPaths();
  redirect(adminPostListPath(typeToPostKind(type)));
}

export async function updatePostAction(id: string, formData: FormData) {
  await requireStaff();
  const { data, categoryIds } = parsePostForm(formData);
  const published = data.published ?? false;
  const type = data.type;
  const visibility = type === 'BLOG' ? 'PUBLIC' : data.visibility;
  const existing = await prisma.post.findUnique({ where: { id } });

  await prisma.post.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      teaser: data.teaser,
      body: data.body,
      type,
      visibility,
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      metaKeywords: data.metaKeywords || null,
      featuredImagePath: data.featuredImagePath || null,
      published,
      publishedAt: published ? (existing?.publishedAt ?? new Date()) : null,
    },
  });

  await syncCategories(id, categoryIds, type);
  revalidatePostPaths();
  redirect(adminPostListPath(typeToPostKind(type)));
}

export async function deletePostAction(id: string) {
  await requireStaff();
  const post = await prisma.post.findUnique({ where: { id }, select: { type: true } });
  await prisma.post.delete({ where: { id } });
  revalidatePostPaths();
  redirect(post ? adminPostListPath(typeToPostKind(post.type)) : '/admin/blog');
}
