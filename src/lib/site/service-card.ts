import { extractTeaserFromContentJson } from '@/lib/site/service-page-json';
import { serviceSeedBySlug } from '@/lib/site/service-seed-data';

type CardSource = {
  slug: string;
  name: string;
  teaser?: string | null;
  description?: string | null;
  imagePath?: string | null;
};

type PageSource = {
  contentJson?: unknown;
  imagePath?: string | null;
} | null | undefined;

export type ServiceCardCopy = {
  slug: string;
  name: string;
  teaser: string;
  imagePath: string | null;
};

export function resolveServiceCardCopy(category: CardSource, page?: PageSource): ServiceCardCopy {
  const seed = serviceSeedBySlug(category.slug);
  const teaser =
    category.teaser?.trim() ||
    category.description?.trim() ||
    extractTeaserFromContentJson(page?.contentJson) ||
    seed?.teaser?.trim() ||
    '';

  return {
    slug: category.slug,
    name: category.name,
    teaser,
    imagePath: category.imagePath?.trim() || page?.imagePath?.trim() || seed?.imagePath || null,
  };
}
