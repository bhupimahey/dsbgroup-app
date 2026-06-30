import { getSession } from '@/lib/auth/session';
import type { PostVisibility } from '@/generated/prisma/client';

export async function canViewFullArticle(visibility: PostVisibility): Promise<boolean> {
  if (visibility === 'PUBLIC') return true;
  const session = await getSession();
  return Boolean(session?.user);
}
