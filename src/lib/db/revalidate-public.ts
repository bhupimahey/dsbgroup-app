import { updateTag } from 'next/cache';
import { PUBLIC_CACHE_TAGS, type PublicCacheTag } from '@/lib/db/cache-tags';

export function revalidatePublicCache(...tags: PublicCacheTag[]) {
  for (const tag of tags) {
    updateTag(tag);
  }
}

export function revalidateBlogCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.blog, PUBLIC_CACHE_TAGS.home);
}

export function revalidateArticlesCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.articles);
}

export function revalidateNewslettersCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.newsletters);
}

export function revalidateOfficesCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.offices);
}

export function revalidateServicesCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.services, PUBLIC_CACHE_TAGS.home);
}

export function revalidateHomeCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.home);
}

export function revalidateFaqCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.faq);
}

export function revalidateTeamCache() {
  revalidatePublicCache(PUBLIC_CACHE_TAGS.team);
}
