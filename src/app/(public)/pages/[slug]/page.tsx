import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPublishedPageBySlug } from '@/lib/cms/cache';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.metaTitle ?? page.title,
    description: page.metaDescription ?? undefined,
  };
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPublishedPageBySlug(slug);
  if (!page) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      {page.imagePath ? (
        <div className="relative mb-8 aspect-[21/9] w-full overflow-hidden rounded-xl">
          <Image src={page.imagePath} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" unoptimized />
        </div>
      ) : null}
      <h1 className="text-3xl font-semibold text-slate-900">{page.title}</h1>
      <div
        className="cms-html prose prose-slate mt-6 max-w-none"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </article>
  );
}
