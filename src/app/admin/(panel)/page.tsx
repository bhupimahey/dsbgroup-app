import Link from 'next/link';
import { getSession } from '@/lib/auth/session';
import { getDashboardStats } from '@/lib/admin/dashboard-stats';
import { adminPostEditPathForType } from '@/lib/admin/post-routes';
import { ADMIN_NAV_LINKS } from '@/lib/admin/nav-links';
import AdminNavIcon from '@/components/admin/AdminNavIcon';
import AdminDashboardHero from '@/components/admin/dashboard/AdminDashboardHero';
import AdminDonutChart from '@/components/admin/dashboard/AdminDonutChart';
import AdminBarChart from '@/components/admin/dashboard/AdminBarChart';
import AdminGaugeChart from '@/components/admin/dashboard/AdminGaugeChart';
import AdminRecentFeed, { type ActivityItem } from '@/components/admin/dashboard/AdminRecentFeed';
import AdminStatCard from '@/components/admin/ui/AdminStatCard';
import { adminCard, adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'Admin dashboard' };

const QUICK_MODULES = ADMIN_NAV_LINKS.filter((link) => link.href !== '/admin');

export default async function AdminDashboardPage() {
  const session = await getSession();
  const {
    pageCount,
    publishedPages,
    postCount,
    blogCount,
    articleCount,
    publishedPosts,
    leadCount,
    subscriberCount,
    teamCount,
    faqCount,
    officeCount,
    newsletterSendsCount,
    openedSendsCount,
    recentLeads,
    recentPosts,
    recentPages,
  } = await getDashboardStats();

  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin';
  const openRate = newsletterSendsCount > 0 ? (openedSendsCount / newsletterSendsCount) * 100 : 0;
  const draftPages = pageCount - publishedPages;
  const draftPosts = postCount - publishedPosts;

  const activity: ActivityItem[] = [
    ...recentLeads.map((lead) => ({
      id: `lead-${lead.id}`,
      title: lead.name,
      meta: lead.email,
      href: '/admin/leads',
      type: 'lead' as const,
      time: lead.createdAt,
    })),
    ...recentPosts.map((post) => ({
      id: `post-${post.id}`,
      title: post.title,
      meta: `${post.type} · Updated`,
      href: adminPostEditPathForType(post.type, post.id),
      type: 'post' as const,
      time: post.updatedAt,
    })),
    ...recentPages.map((page) => ({
      id: `page-${page.id}`,
      title: page.title,
      meta: 'CMS page · Updated',
      href: `/admin/pages/${page.id}/edit`,
      type: 'page' as const,
      time: page.updatedAt,
    })),
  ]
    .sort((a, b) => b.time.getTime() - a.time.getTime())
    .slice(0, 6);

  return (
    <div className={`${adminPage} space-y-6`}>
      <AdminDashboardHero name={firstName} />

      <section aria-label="Site statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          label="Total Pages"
          value={pageCount}
          tone="primary"
          hint={`${publishedPages} published`}
          trend="+ CMS"
          icon={<AdminNavIcon icon="pages" className="h-5 w-5" />}
        />
        <AdminStatCard
          label="Blog posts"
          value={blogCount}
          tone="success"
          hint="Public updates"
          icon={<AdminNavIcon icon="blog" className="h-5 w-5" />}
        />
        <AdminStatCard
          label="Articles"
          value={articleCount}
          tone="warning"
          hint="Public & premium"
          icon={<AdminNavIcon icon="articles" className="h-5 w-5" />}
        />
        <AdminStatCard
          label="Subscribers"
          value={subscriberCount}
          tone="info"
          hint="Verified users"
          icon={<AdminNavIcon icon="subscribers" className="h-5 w-5" />}
        />
        <AdminStatCard
          label="Total Leads"
          value={leadCount}
          tone="danger"
          hint="Contact form"
          icon={<AdminNavIcon icon="leads" className="h-5 w-5" />}
        />
      </section>

      <section aria-label="Analytics overview" className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <AdminBarChart
            title="Content Overview"
            subtitle="Inventory by module"
            items={[
              { label: 'CMS Pages', value: pageCount, color: '#05162e' },
              { label: 'Blog posts', value: blogCount, color: '#c5a059' },
              { label: 'Articles', value: articleCount, color: '#0a2444' },
              { label: 'Team Members', value: teamCount, color: '#0a2444' },
              { label: 'FAQ Items', value: faqCount, color: '#64748b' },
              { label: 'Offices', value: officeCount, color: '#b8964f' },
            ]}
          />
        </div>
        <div className="lg:col-span-4">
          <AdminDonutChart
            title="Publishing Status"
            subtitle="Published vs draft"
            segments={[
              { label: 'Pages · published', value: publishedPages, color: '#05162e' },
              { label: 'Pages · draft', value: draftPages, color: '#cbd5e1' },
              { label: 'Posts · published', value: publishedPosts, color: '#c5a059' },
              { label: 'Posts · draft', value: draftPosts, color: '#e2e8f0' },
            ]}
          />
        </div>
        <div className="lg:col-span-3">
          <AdminGaugeChart
            title="Open Rate"
            subtitle="Newsletter tracking"
            value={openRate}
            label={`${openedSendsCount} / ${newsletterSendsCount} opens`}
          />
        </div>
      </section>

      <section aria-label="Activity and modules" className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <AdminRecentFeed items={activity} />
        </div>
        <div className="xl:col-span-7">
          <div className="zynix-card h-full">
            <div className="zynix-card-header flex items-center justify-between gap-3">
              <div>
                <h3 className="text-[15px] font-semibold" style={{ color: 'var(--z-text)' }}>
                  Quick Access
                </h3>
                <p className="mt-0.5 text-xs" style={{ color: 'var(--z-text-muted)' }}>
                  CMS modules
                </p>
              </div>
              <Link href="/admin/analytics" className="text-xs font-semibold" style={{ color: 'var(--z-accent-dark)' }}>
                Analytics →
              </Link>
            </div>
            <div className="zynix-card-body grid gap-3 sm:grid-cols-2">
              {QUICK_MODULES.map((mod) => (
                <Link
                  key={mod.href}
                  href={mod.href}
                  className={`group flex items-start gap-3 rounded-lg border p-3 transition hover:shadow-md ${adminCard}`}
                  style={{ borderColor: 'var(--z-border)' }}
                >
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white"
                    style={{ background: 'var(--z-primary)', borderBottom: '2px solid var(--z-accent)' }}
                  >
                    <AdminNavIcon icon={mod.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold group-hover:text-[var(--z-accent-dark)]" style={{ color: 'var(--z-text)' }}>
                      {mod.label}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-xs" style={{ color: 'var(--z-text-muted)' }}>
                      {mod.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
