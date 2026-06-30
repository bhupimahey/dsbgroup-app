import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import BlogDetailShare from '@/components/blog/BlogDetailShare';
import { getPublishedBlogPostBySlug } from '@/lib/cms/cache';
import { prisma } from '@/lib/db';
import '@/styles/blog-detail.css';

export const revalidate = 60;

const DEFAULT_BLOG_IMAGE = '/images/theme/index2/sections/blog2-img.png';

function formatPostDate(date: Date | null) {
  if (!date) return 'Latest update';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
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

  const [relatedPosts, headersList] = await Promise.all([
    prisma.post.findMany({
      where: { type: 'BLOG', published: true, NOT: { id: post.id } },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    headers(),
  ]);

  const host = headersList.get('host') ?? 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') ?? 'http';
  const shareUrl = `${proto}://${host}/blog/${post.slug}`;
  const categoryNames = post.categories.map((c) => c.category.name);
  const tagLinks = categoryNames.length > 0 ? categoryNames : ['Legal Updates'];

  return (
    <div className="theme-shell">
      <section className="blogmiddle-hero">
        <h1>{post.title}</h1>
        <p className="blogmiddle-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <Link href="/blog">Blog</Link>
          <span aria-hidden>›</span>
          <span>Blog Post</span>
        </p>
      </section>

      <section className="blogmiddle-section">
        <article className="blogmiddle-inner">
          <div className="blogmiddle-featured-image">
            <Image
              src={getPostImage(post.featuredImagePath)}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 920px) 100vw, 920px"
              unoptimized
            />
          </div>

          <div className="blogmiddle-meta">
            <div className="blogmiddle-meta-item">
              <span className="blogmiddle-meta-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <span>DSB Law Group</span>
            </div>
            <div className="blogmiddle-meta-item">
              <span className="blogmiddle-meta-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </span>
              <time dateTime={post.publishedAt?.toISOString()}>{formatPostDate(post.publishedAt)}</time>
            </div>
            <div className="blogmiddle-meta-item">
              <span className="blogmiddle-meta-icon" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <circle cx="7" cy="7" r="1" />
                </svg>
              </span>
              <span>{tagLinks[0]}</span>
            </div>
          </div>

          <h2 className="blogmiddle-title">{post.title}</h2>
          {post.teaser?.trim() ? <p className="blogmiddle-teaser">{post.teaser}</p> : null}

          <div
            className="blogmiddle-body cms-html"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />

          <div className="blogmiddle-divider" />

          <div className="blogmiddle-share-row">
            <div className="blogmiddle-tags">
              <ul>
                <li>
                  <span className="blogmiddle-tags-label">Post Tags:</span>
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

          <div className="blogmiddle-reply">
            <h2>Leave a Reply</h2>
            <p>Provide clear contact information, including phone number, email, and address.</p>
            <ContactForm variant="blog" />
          </div>
        </article>
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
