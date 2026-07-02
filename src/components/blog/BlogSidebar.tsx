import Link from 'next/link';
import Image from 'next/image';

const DEFAULT_BLOG_IMAGE = '/images/theme/index2/sections/blog2-img.png';

type Category = {
  slug: string;
  name: string;
};

type RecentPost = {
  slug: string;
  title: string;
  publishedAt: Date | null;
  featuredImagePath: string | null;
};

type Props = {
  categories: Category[];
  recentPosts: RecentPost[];
  tags: string[];
  activeCategorySlug?: string;
};

function formatPostDate(date: Date | null) {
  if (!date) return 'Latest update';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export default function BlogSidebar({ categories, recentPosts, tags, activeCategorySlug }: Props) {
  return (
    <>
      <aside className="theme-sidebar-panel">
        <h2>Blog Categories</h2>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={`theme-sidebar-link-row${activeCategorySlug === category.slug ? ' is-active' : ''}`}
          >
            {category.name}
            <span aria-hidden>›</span>
          </Link>
        ))}
      </aside>

      {recentPosts.length > 0 ? (
        <aside className="theme-sidebar-panel">
          <h2>Recent Blogs</h2>
          {recentPosts.map((post) => (
            <div key={post.slug} className="blogright-recent-item">
              <Link href={`/blog/${post.slug}`} className="blogright-recent-thumb">
                <Image
                  src={post.featuredImagePath?.trim() || DEFAULT_BLOG_IMAGE}
                  alt=""
                  fill
                  sizes="72px"
                  unoptimized
                />
              </Link>
              <div>
                <p className="blogright-recent-date">
                  <span aria-hidden>◷</span>
                  {formatPostDate(post.publishedAt)}
                </p>
                <Link href={`/blog/${post.slug}`} className="blogright-recent-title">
                  {post.title}
                </Link>
              </div>
            </div>
          ))}
        </aside>
      ) : null}

      {tags.length > 0 ? (
        <aside className="theme-sidebar-panel">
          <h2>Popular Tags</h2>
          <div className="blogright-tag-cloud">
            {tags.map((tag) => (
              <Link key={tag} href="/blog">
                {tag}
              </Link>
            ))}
          </div>
        </aside>
      ) : null}

      <aside className="theme-sidebar-panel theme-sidebar-help">
        <h2>If You Need Any Help Contact With Us</h2>
        <a href="tel:+918727914446">☎ +91 87279-14446</a>
      </aside>
    </>
  );
}
