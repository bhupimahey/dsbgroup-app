import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import BlogCommentsSection from '@/components/blog/BlogCommentsSection';
import BlogDetailShare from '@/components/blog/BlogDetailShare';
import BlogReplyForm from '@/components/blog/BlogReplyForm';
import BlogSidebar from '@/components/blog/BlogSidebar';
import ThemePageHero from '@/components/theme/ThemePageHero';
import { getPublishedBlogPostBySlug } from '@/lib/cms/cache';
import { prisma } from '@/lib/db';
import '@/styles/blog-right.css';
import '@/styles/blog-detail.css';

export const revalidate = 300;

const DEFAULT_BLOG_IMAGE = '/images/theme/index2/sections/blog2-img.png';

function formatPostDate(date: Date | string | null | undefined) {
  if (!date) return 'Latest update';
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

function getPostImage(path: string | null) {
  return path?.trim() || DEFAULT_BLOG_IMAGE;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.teaser,
    keywords: post.metaKeywords?.split(',').map((k) => k.trim()).filter(Boolean),
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  const [relatedPosts, categories, recentPosts, headersList] = await Promise.all([
    prisma.post.findMany({
      where: { type: 'BLOG', published: true, NOT: { id: post.id } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
    prisma.post.findMany({
      where: { type: 'BLOG', published: true, NOT: { id: post.id } },
      orderBy: { publishedAt: 'desc' },
      take: 4,
      select: {
        slug: true,
        title: true,
        publishedAt: true,
        featuredImagePath: true,
      },
    }),
    headers(),
  ]);

  const host = headersList.get('host') ?? 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') ?? 'http';
  const shareUrl = `${proto}://${host}/blog/${post.slug}`;
  const categoryNames = post.categories.map((c) => c.category.name);
  const tagLinks = categoryNames.length > 0 ? categoryNames : ['Legal Updates'];
  const activeCategorySlug = post.categories[0]?.category.slug;

  return (
    <div className="theme-shell">
      <ThemePageHero
        title={post.title}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: 'Blog Post' },
        ]}
      />

      <section className="theme-inner-section">
        <div className="theme-inner-container blogright-layout">
          <article className="blogright-main-wrap">
            <div className="blogright-main-image">
              <Image
                src={getPostImage(post.featuredImagePath)}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 991px) 100vw, 760px"
                unoptimized
              />
            </div>

            <div className="blogright-afteralex">
              <div className="blogright-alex">
                <span className="blogright-alex-icon" aria-hidden>👤</span>
                <span>DSB Law Group</span>
              </div>
              <div className="blogright-alex">
                <span className="blogright-alex-icon" aria-hidden>◷</span>
                <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined}>{formatPostDate(post.publishedAt)}</time>
              </div>
              <div className="blogright-alex">
                <span className="blogright-alex-icon" aria-hidden>#</span>
                <span>{tagLinks[0]}</span>
              </div>
              <div className="blogright-alex">
                <span className="blogright-alex-icon" aria-hidden>💬</span>
                <span>0 Comments</span>
              </div>
            </div>

            <h2 className="blogright-title">{post.title}</h2>
            {post.teaser?.trim() ? <p className="blogright-teaser">{post.teaser}</p> : null}

            <div
              className="blogright-body cms-html"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            <div className="blogright-border" />

            <div className="blogright-postsocial">
              <div className="blogright-posttags">
                <ul>
                  <li>
                    <span className="blogright-posttags-label">Post Tags:</span>
                  </li>
                  {tagLinks.map((tag) => (
                    <li key={tag}>
                      <Link href="/blog">{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <BlogDetailShare url={shareUrl} title={post.title} />
            </div>

            <BlogCommentsSection />

            <div id="blog-reply-form">
              <BlogReplyForm />
            </div>
          </article>

          <div>
            <BlogSidebar
              categories={categories}
              recentPosts={recentPosts}
              tags={tagLinks}
              activeCategorySlug={activeCategorySlug}
            />
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="blogmiddle-related">
          <div className="blogmiddle-related-head">
            <h2>Read Our More Blog</h2>
          </div>
          <div className="blogmiddle-related-grid">
            {relatedPosts.map((related) => (
              <article key={related.id} className="blogmiddle-card">
                <Link href={`/blog/${related.slug}`} className="blogmiddle-card-image">
                  <Image
                    src={getPostImage(related.featuredImagePath)}
                    alt={related.title}
                    fill
                    sizes="(max-width: 991px) 100vw, 380px"
                    unoptimized
                  />
                </Link>
                <div className="blogmiddle-card-body">
                  <p className="blogmiddle-card-date">
                    <span aria-hidden>◷</span>
                    {formatPostDate(related.publishedAt)}
                  </p>
                  <Link href={`/blog/${related.slug}`} className="blogmiddle-card-title">
                    {related.title}
                  </Link>
                  <p className="blogmiddle-card-teaser">{related.teaser}</p>
                  <Link href={`/blog/${related.slug}`} className="blogmiddle-card-link">
                    Learn More <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

