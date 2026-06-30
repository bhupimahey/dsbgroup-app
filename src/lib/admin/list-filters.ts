import type { Prisma } from '@/generated/prisma/client';
import type { TeamGroup } from '@/generated/prisma/client';

export const PUBLISHED_FILTER_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
] as const;

export function parseFilterParam(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim() ?? '';
}

export function pickListQuery(
  params: Record<string, string | undefined>,
  keys: string[],
): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const key of keys) {
    const value = params[key]?.trim();
    if (value) out[key] = value;
  }
  return out;
}

function publishedFilter(status: string): boolean | undefined {
  if (status === 'published') return true;
  if (status === 'draft') return false;
  return undefined;
}

function searchOr<T extends string>(q: string, fields: T[]): Record<string, { contains: string }>[] {
  return fields.map((field) => ({ [field]: { contains: q } })) as Record<string, { contains: string }>[];
}

export function pageListWhere(filters: { q?: string; status?: string }): Prisma.PageWhereInput {
  const where: Prisma.PageWhereInput = {};
  const published = publishedFilter(filters.status ?? '');
  if (published !== undefined) where.published = published;
  if (filters.q) {
    where.OR = searchOr(filters.q, ['title', 'slug']);
  }
  return where;
}

export function postListWhere(filters: {
  q?: string;
  status?: string;
  type?: string;
  visibility?: string;
}): Prisma.PostWhereInput {
  const where: Prisma.PostWhereInput = {};
  const published = publishedFilter(filters.status ?? '');
  if (published !== undefined) where.published = published;
  if (filters.type === 'BLOG' || filters.type === 'ARTICLE') where.type = filters.type;
  if (filters.visibility === 'PUBLIC' || filters.visibility === 'PREMIUM') {
    where.visibility = filters.visibility;
  }
  if (filters.q) {
    where.OR = searchOr(filters.q, ['title', 'slug']);
  }
  return where;
}

export function teamListWhere(filters: {
  q?: string;
  status?: string;
  group?: string;
}): Prisma.TeamMemberWhereInput {
  const where: Prisma.TeamMemberWhereInput = {};
  const published = publishedFilter(filters.status ?? '');
  if (published !== undefined) where.published = published;
  if (filters.group && filters.group !== 'all') {
    where.group = filters.group as TeamGroup;
  }
  if (filters.q) {
    where.OR = searchOr(filters.q, ['name', 'title', 'email', 'branch', 'phone']);
  }
  return where;
}

export function officeListWhere(filters: { q?: string; status?: string }): Prisma.OfficeWhereInput {
  const where: Prisma.OfficeWhereInput = {};
  const published = publishedFilter(filters.status ?? '');
  if (published !== undefined) where.published = published;
  if (filters.q) {
    where.OR = searchOr(filters.q, ['name', 'address', 'email', 'phone']);
  }
  return where;
}

export function categoryListWhere(filters: { q?: string }): Prisma.CategoryWhereInput {
  if (!filters.q) return {};
  return { OR: searchOr(filters.q, ['name', 'slug']) };
}

export function newsletterListWhere(filters: {
  q?: string;
  status?: string;
  archive?: string;
}): Prisma.NewsletterWhereInput {
  const where: Prisma.NewsletterWhereInput = {};
  if (filters.status === 'DRAFT' || filters.status === 'QUEUED' || filters.status === 'SENT') {
    where.status = filters.status;
  }
  if (filters.archive === 'published') where.published = true;
  if (filters.archive === 'hidden') where.published = false;
  if (filters.q) {
    where.OR = [
      { subject: { contains: filters.q } },
      { slug: { contains: filters.q } },
      { issueNumber: { contains: filters.q } },
    ];
  }
  return where;
}

export function subscriberListWhere(filters: {
  q?: string;
  verified?: string;
  active?: string;
}): Prisma.SubscriberWhereInput {
  const where: Prisma.SubscriberWhereInput = {};
  if (filters.verified === 'yes') where.verified = true;
  if (filters.verified === 'no') where.verified = false;
  if (filters.active === 'yes') where.active = true;
  if (filters.active === 'no') where.active = false;
  if (filters.q) {
    where.email = { contains: filters.q };
  }
  return where;
}

export function leadListWhere(filters: {
  q?: string;
  handled?: string;
}): Prisma.ContactLeadWhereInput {
  const where: Prisma.ContactLeadWhereInput = {};
  if (filters.handled === 'yes') where.handled = true;
  if (filters.handled === 'no') where.handled = false;
  if (filters.q) {
    where.OR = searchOr(filters.q, ['name', 'email', 'message']);
  }
  return where;
}

export function userListWhere(filters: {
  q?: string;
  active?: string;
}): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = { role: 'USER' };
  if (filters.active === 'yes') where.active = true;
  if (filters.active === 'no') where.active = false;
  if (filters.q) {
    where.OR = searchOr(filters.q, ['name', 'email']);
  }
  return where;
}

export function staffListWhere(filters: { q?: string; active?: string }): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = { role: { in: ['ADMIN', 'EDITOR'] } };
  if (filters.active === 'yes') where.active = true;
  if (filters.active === 'no') where.active = false;
  if (filters.q) {
    where.OR = searchOr(filters.q, ['name', 'email']);
  }
  return where;
}

export function serviceCategoryListWhere(filters: { q?: string }): Prisma.ServiceCategoryWhereInput {
  if (!filters.q) return {};
  return { OR: searchOr(filters.q, ['name', 'slug']) };
}

export function faqCategoryListWhere(filters: { q?: string }): Prisma.FaqCategoryWhereInput {
  if (!filters.q) return {};
  return { name: { contains: filters.q } };
}

export function faqItemAdminListWhere(filters: {
  q?: string;
  status?: string;
  categoryId?: string;
}): Prisma.FaqItemWhereInput {
  const where: Prisma.FaqItemWhereInput = {};
  const published = publishedFilter(filters.status ?? '');
  if (published !== undefined) where.published = published;
  if (filters.categoryId) where.categoryId = filters.categoryId;
  if (filters.q) {
    where.OR = [
      ...searchOr(filters.q, ['question', 'answer']),
      { category: { name: { contains: filters.q } } },
    ];
  }
  return where;
}

/** @deprecated Use faqItemAdminListWhere for admin FAQ listing */
export function faqItemListWhere(
  categoryId: string,
  filters: { q?: string; status?: string },
): Prisma.FaqItemWhereInput {
  const where: Prisma.FaqItemWhereInput = { categoryId };
  const published = publishedFilter(filters.status ?? '');
  if (published !== undefined) where.published = published;
  if (filters.q) {
    where.OR = searchOr(filters.q, ['question', 'answer']);
  }
  return where;
}
