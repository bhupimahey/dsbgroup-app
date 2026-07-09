import FaqAccordion from '@/components/FaqAccordion';
import Pagination from '@/components/Pagination';
import { prisma } from '@/lib/db';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';
import { unstable_cache } from 'next/cache';
import { PUBLIC_CACHE_TAGS } from '@/lib/db/cache-tags';
import { PUBLIC_CACHE_SECONDS } from '@/lib/db/public-cache';

export const revalidate = 60;

export const metadata = { title: 'FAQ' };

const getCachedFaqCategoriesPage = unstable_cache(
  async (categoryPage: number, pageSize: number) => {
    const total = await prisma.faqCategory.count();
    const pagination = getPaginationMeta(total, categoryPage, pageSize);
    const categories = await prisma.faqCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      skip: pagination.skip,
      take: pagination.take,
    });

    const categoryIds = categories.map((category) => category.id);
    const publishedItems =
      categoryIds.length > 0
        ? await prisma.faqItem.findMany({
            where: { categoryId: { in: categoryIds }, published: true },
            orderBy: { sortOrder: 'asc' },
          })
        : [];

    const itemsByCategory = new Map<string, typeof publishedItems>();
    for (const item of publishedItems) {
      const list = itemsByCategory.get(item.categoryId) ?? [];
      list.push(item);
      itemsByCategory.set(item.categoryId, list);
    }

    return { pagination, categories, itemsByCategory };
  },
  ['public-faq-page'],
  { revalidate: PUBLIC_CACHE_SECONDS, tags: [PUBLIC_CACHE_TAGS.faq] },
);

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; ci?: string; ip?: string }>;
}) {
  const params = await searchParams;
  const categoryPage = parsePageParam(params.page);
  const { pagination: categoryPagination, categories, itemsByCategory } =
    await getCachedFaqCategoriesPage(categoryPage, 20);

  const categoriesWithItems = categories.map((category) => {
    const allItems = itemsByCategory.get(category.id) ?? [];
    const itemPage = params.ci === category.id ? parsePageParam(params.ip) : 1;
    const itemPagination = getPaginationMeta(allItems.length, itemPage);
    const items = allItems.slice(itemPagination.skip, itemPagination.skip + itemPagination.take);

    return {
      category: { id: category.id, name: category.name, items },
      itemPagination,
    };
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-slate-900">Frequently asked questions</h1>
      <div className="mt-10">
        <FaqAccordion categories={categoriesWithItems.map(({ category }) => category)} />
        {categoriesWithItems.map(({ category, itemPagination }) =>
          itemPagination.totalPages > 1 ? (
            <Pagination
              key={`${category.id}-items`}
              basePath="/faq"
              {...itemPagination}
              query={{
                page: categoryPagination.page > 1 ? categoryPagination.page : undefined,
                ci: category.id,
              }}
              pageParam="ip"
            />
          ) : null,
        )}
      </div>
      {categoryPagination.total === 0 ? (
        <p className="mt-8 text-slate-500">FAQ content is managed from the admin CMS.</p>
      ) : (
        <Pagination basePath="/faq" {...categoryPagination} />
      )}
    </div>
  );
}
