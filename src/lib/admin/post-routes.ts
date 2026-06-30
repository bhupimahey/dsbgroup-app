import type { PostType } from '@/generated/prisma/client';

export type AdminPostKind = 'blog' | 'articles';

export function postKindToType(kind: AdminPostKind): PostType {
  return kind === 'blog' ? 'BLOG' : 'ARTICLE';
}

export function typeToPostKind(type: PostType): AdminPostKind {
  return type === 'BLOG' ? 'blog' : 'articles';
}

export function adminPostListPath(kind: AdminPostKind): string {
  return kind === 'blog' ? '/admin/blog' : '/admin/articles';
}

export function adminPostNewPath(kind: AdminPostKind): string {
  return `/admin/posts/new?kind=${kind}`;
}

export function adminPostEditPath(_kind: AdminPostKind, id: string): string {
  return `/admin/posts/${id}/edit`;
}

export function adminPostEditPathForType(type: PostType, id: string): string {
  return adminPostEditPath(typeToPostKind(type), id);
}

export function publicPostPath(type: PostType, slug: string): string {
  return type === 'BLOG' ? `/blog/${slug}` : `/articles/${slug}`;
}
