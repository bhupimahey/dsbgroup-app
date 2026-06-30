import Link from 'next/link';
import Pagination from '@/components/Pagination';
import { prisma } from '@/lib/db';
import { getPaginationMeta, parsePageParam } from '@/lib/pagination';

export const revalidate = 60;

export const metadata = { title: 'Articles' };

export default async function ArticlesIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const where = { type: 'ARTICLE' as const, published: true };
  const pagination = getPaginationMeta(await prisma.post.count({ where }), parsePageParam(pageParam));
  const posts = await prisma.post.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
    skip: pagination.skip,
    take: pagination.take,
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold text-slate-900">Articles</h1>
      <p className="mt-2 text-slate-600">Public and premium insights. Premium items show a teaser until login.</p>
      <ul className="mt-8 space-y-4">
        {posts.length === 0 ? (
          <li className="rounded-lg border border-dashed border-slate-300 p-6 text-sm text-slate-500">
            No articles yet. Run <code className="rounded bg-slate-100 px-1">npm run db:seed</code> after MySQL is up.
          </li>
        ) : (
          posts.map((post) => (
            <li key={post.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>{post.visibility === 'PREMIUM' ? 'Premium' : 'Public'}</span>
              </div>
              <Link href={`/articles/${post.slug}`} className="mt-1 block text-lg font-semibold text-slate-900 hover:underline">
                {post.title}
              </Link>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.teaser}</p>
            </li>
          ))
        )}
      </ul>

      <Pagination basePath="/articles" {...pagination} />
    </div>
  );
}
