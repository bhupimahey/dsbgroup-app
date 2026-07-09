import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth/session';
import { canViewFullArticle } from '@/lib/articles';
import { getPublishedArticleBySlug } from '@/lib/cms/cache';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedArticleBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.teaser,
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedArticleBySlug(slug);
  if (!post) notFound();

  const showFull = await canViewFullArticle(post.visibility);
  const session = await getSession();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-800">
        {post.visibility === 'PREMIUM' ? 'Premium article' : 'Article'}
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900">{post.title}</h1>
      {post.featuredImagePath ? (
        <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image src={post.featuredImagePath} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" unoptimized />
        </div>
      ) : null}
      <p className="mt-4 text-slate-700 leading-7">{post.teaser}</p>

      {showFull ? (
        <div
          className="cms-html prose prose-slate mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      ) : (
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-semibold text-amber-950">Premium content</h2>
          <p className="mt-2 text-sm text-amber-900">
            Register or log in to read the full article.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(`/articles/${slug}`)}`}
              className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white"
            >
              Login
            </Link>
            <Link
              href={`/register?callbackUrl=${encodeURIComponent(`/articles/${slug}`)}`}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800"
            >
              Register
            </Link>
          </div>
        </div>
      )}

      {session?.user ? (
        <p className="mt-6 text-xs text-slate-500">Signed in as {session.user.email}</p>
      ) : null}
    </article>
  );
}
