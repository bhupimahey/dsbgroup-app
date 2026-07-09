import Link from 'next/link';
import Image from 'next/image';
import Blog3Pagination from '@/components/blog/Blog3Pagination';
import { getCachedBlogIndexData } from '@/lib/db/public-cache';
import { parsePageParam } from '@/lib/pagination';
import '@/styles/blog-index.css';

export const revalidate = 60;

export const metadata = { title: 'Blog' };

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

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const { category: categorySlug, page: pageParam } = await searchParams;
  const { categories, posts, pagination } = await getCachedBlogIndexData(
    categorySlug ?? '',
    parsePageParam(pageParam),
  );

  return (
    <div className="theme-shell">
      <section className="blog3-hero">
        <h1>Blog</h1>
        <p className="blog3-breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>›</span>
          <span>Blog</span>
        </p>
      </section>

      <section className="blog3-section">
        <div className="blog3-container">
          {categories.length > 0 ? (
            <div className="blog3-categories">
              <Link href="/blog" className={`blog3-category-link${!categorySlug ? ' is-active' : ''}`}>
                All
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/blog?category=${cat.slug}`}
                  className={`blog3-category-link${categorySlug === cat.slug ? ' is-active' : ''}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          ) : null}

          <ul className="blog3-grid">
            {posts.length === 0 ? (
              <li className="blog3-empty">No blog posts in this category.</li>
            ) : (
              posts.map((post) => (
                <li key={post.id}>
                  <article className="blog3-card">
                    <Link href={`/blog/${post.slug}`} className="blog3-card-image">
                      <Image
                        src={getPostImage(post.featuredImagePath)}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 991px) 50vw, 33vw"
                        unoptimized
                      />
                    </Link>
                    <div className="blog3-card-body">
                      <p className="blog3-card-date">
                        <span className="blog3-card-date-icon" aria-hidden>
                          ◷
                        </span>
                        <time dateTime={post.publishedAt?.toISOString()}>
                          {formatPostDate(post.publishedAt)}
                        </time>
                      </p>
                      <Link href={`/blog/${post.slug}`} className="blog3-card-title">
                        {post.title}
                      </Link>
                      <p className="blog3-card-teaser">{post.teaser}</p>
                      <Link href={`/blog/${post.slug}`} className="blog3-card-link">
                        Learn More <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                </li>
              ))
            )}
          </ul>

          <Blog3Pagination
            basePath="/blog"
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            query={{ category: categorySlug }}
          />
        </div>
      </section>
    </div>
  );
}
