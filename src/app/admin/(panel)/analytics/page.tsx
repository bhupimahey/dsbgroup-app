import { getAnalyticsOverview } from '@/lib/admin/analytics-data';
import { getNewsletterQueueCounts } from '@/lib/admin/newsletter-queue-status';
import AdminBarChart from '@/components/admin/dashboard/AdminBarChart';
import AdminDonutChart from '@/components/admin/dashboard/AdminDonutChart';
import AdminGaugeChart from '@/components/admin/dashboard/AdminGaugeChart';
import AdminGroupedBarChart from '@/components/admin/dashboard/AdminGroupedBarChart';
import AdminLineChart from '@/components/admin/dashboard/AdminLineChart';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminStatCard from '@/components/admin/ui/AdminStatCard';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
import {
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'Analytics' };

const NEWSLETTER_COLORS = {
  sends: '#05162e',
  opened: '#26bf94',
  clicked: '#23b7e5',
};

export default async function AdminAnalyticsPage() {
  const [data, queueCounts] = await Promise.all([getAnalyticsOverview(), getNewsletterQueueCounts()]);

  const unverifiedSubscribers = Math.max(data.totalSubscribers - data.verifiedSubscribers, 0);
  const inactiveVerified = Math.max(data.verifiedSubscribers - data.activeSubscribers, 0);
  const unopenedSends = Math.max(data.newsletterSendsCount - data.openedSendsCount, 0);
  const openedNotClicked = Math.max(data.openedSendsCount - data.clickedSendsCount, 0);

  const newsletterGroups = data.newsletterPerformance
    .filter((row) => row.sends > 0)
    .slice(0, 6)
    .map((row) => ({
      label: row.subject,
      series: [
        { name: 'Sends', value: row.sends, color: NEWSLETTER_COLORS.sends },
        { name: 'Opened', value: row.opened, color: NEWSLETTER_COLORS.opened },
        { name: 'Clicked', value: row.clicked, color: NEWSLETTER_COLORS.clicked },
      ],
    }));

  return (
    <div className={`${adminPage} space-y-6`}>
      <AdminPageHeader description="Visual overview of subscribers, clients, and newsletter engagement." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Total subscribers" value={data.totalSubscribers} tone="primary" hint={`${data.verifiedSubscribers} verified`} />
        <AdminStatCard label="Active subscribers" value={data.activeSubscribers} tone="success" />
        <AdminStatCard label="Registered clients" value={data.usersCount} tone="info" />
        <AdminStatCard label="Newsletter sends" value={data.newsletterSendsCount} tone="warning" />
      </div>

      <section aria-label="Growth trends" className="grid gap-4 lg:grid-cols-2">
        <AdminLineChart
          title="Subscriber growth"
          subtitle="New subscribers — last 12 months"
          color="#05162e"
          items={data.subscriberGrowth}
        />
        <AdminLineChart
          title="Client registrations"
          subtitle="New accounts — last 12 months"
          color="#c5a059"
          items={data.userGrowth}
        />
      </section>

      <section aria-label="Engagement charts" className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <AdminDonutChart
            title="Subscriber audience"
            subtitle="Verification & activity"
            segments={[
              { label: 'Active & verified', value: data.activeSubscribers, color: '#26bf94' },
              { label: 'Verified · inactive', value: inactiveVerified, color: '#c5a059' },
              { label: 'Unverified', value: unverifiedSubscribers, color: '#cbd5e1' },
            ]}
          />
        </div>
        <div className="lg:col-span-4">
          <AdminDonutChart
            title="Email engagement"
            subtitle="All newsletter sends"
            segments={[
              { label: 'Clicked', value: data.clickedSendsCount, color: '#23b7e5' },
              { label: 'Opened only', value: openedNotClicked, color: '#26bf94' },
              { label: 'Not opened', value: unopenedSends, color: '#e2e8f0' },
            ]}
          />
        </div>
        <div className="lg:col-span-4 grid gap-4">
          <AdminGaugeChart
            title="Open rate"
            subtitle="Across all sends"
            value={data.openRate}
            label={`${data.openedSendsCount} of ${data.newsletterSendsCount} opened`}
          />
          <AdminGaugeChart
            title="Click rate"
            subtitle="Across all sends"
            value={data.clickRate}
            label={`${data.clickedSendsCount} of ${data.newsletterSendsCount} clicked`}
          />
        </div>
      </section>

      <section aria-label="Newsletter performance" className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <AdminGroupedBarChart
            title="Newsletter performance"
            subtitle="Recent issues — sends, opens, and clicks"
            groups={newsletterGroups}
          />
        </div>
        <div className="xl:col-span-5">
          <AdminBarChart
            title="Open rate by issue"
            subtitle="Most recent newsletters"
            items={data.newsletterPerformance.slice(0, 6).map((row, index) => ({
              label: row.subject.length > 22 ? `${row.subject.slice(0, 21)}…` : row.subject,
              value: Math.round(row.openRate),
              color: index % 2 === 0 ? '#05162e' : '#c5a059',
            }))}
          />
        </div>
      </section>

      {queueCounts ? (
        <AdminBarChart
          title="Email queue status"
          subtitle="Background job counts from Redis"
          items={[
            { label: 'Waiting', value: queueCounts.waiting, color: '#c5a059' },
            { label: 'Active', value: queueCounts.active, color: '#05162e' },
            { label: 'Completed', value: queueCounts.completed, color: '#26bf94' },
            { label: 'Failed', value: queueCounts.failed, color: '#e6533c' },
            { label: 'Delayed', value: queueCounts.delayed, color: '#64748b' },
          ]}
        />
      ) : null}

      <div className={adminTableWrap}>
        <div className="zynix-card-header">
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--z-text)' }}>
            Detailed newsletter log
          </h3>
          <p className="mt-0.5 text-xs" style={{ color: 'var(--z-text-muted)' }}>
            Exact figures for recent issues
          </p>
        </div>
        <table className={adminTable}>
          <thead>
            <tr>
              <th className={adminTableHeadCell}>Subject</th>
              <th className={adminTableHeadCell}>Status</th>
              <th className={adminTableHeadCell}>Sends</th>
              <th className={adminTableHeadCell}>Opened</th>
              <th className={adminTableHeadCell}>Clicked</th>
              <th className={adminTableHeadCell}>Open rate</th>
            </tr>
          </thead>
          <tbody>
            {data.newsletterPerformance.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                  No newsletter sends yet.
                </td>
              </tr>
            ) : (
              data.newsletterPerformance.map((row) => (
                <tr key={row.id} className={adminTableRow}>
                  <td className={`${adminTableCell} font-semibold`}>{row.subject}</td>
                  <td className={adminTableCell}>
                    <AdminStatusBadge variant={row.status === 'SENT' ? 'success' : row.status === 'QUEUED' ? 'warning' : 'draft'}>
                      {row.status}
                    </AdminStatusBadge>
                  </td>
                  <td className={adminTableCell}>{row.sends}</td>
                  <td className={adminTableCell}>{row.opened}</td>
                  <td className={adminTableCell}>{row.clicked}</td>
                  <td className={adminTableCell}>{row.openRate.toFixed(1)}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
