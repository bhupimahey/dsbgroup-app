import FaqAccordion from '@/components/FaqAccordion';
import Pagination from '@/components/Pagination';
import { prisma } from '@/lib/db';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';

export const revalidate = 60;

export const metadata = { title: 'FAQ' };

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; ci?: string; ip?: string }>;
}) {
  const params = await searchParams;
  const categoryPage = parsePageParam(params.page);
  const categoryPagination = getPaginationMeta(await prisma.faqCategory.count(), categoryPage);

  const categories = await prisma.faqCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    skip: categoryPagination.skip,
    take: categoryPagination.take,
  });

  const categoriesWithItems = await Promise.all(
    categories.map(async (category) => {
      const itemPage = params.ci === category.id ? parsePageParam(params.ip) : 1;
      const itemPagination = getPaginationMeta(
        await prisma.faqItem.count({ where: { categoryId: category.id, published: true } }),
        itemPage,
      );
      const items = await prisma.faqItem.findMany({
        where: { categoryId: category.id, published: true },
        orderBy: { sortOrder: 'asc' },
        skip: itemPagination.skip,
        take: itemPagination.take,
      });

      return {
        category: { id: category.id, name: category.name, items },
        itemPagination,
      };
    }),
  );

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
