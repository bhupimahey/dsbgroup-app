import { prisma } from '@/lib/db';
import {
  deleteTextTestimonialAction,
  deleteVideoTestimonialAction,
} from '@/lib/admin/testimonial-actions';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
import AdminTableActions from '@/components/admin/ui/AdminTableActions';
import {
  adminPage,
  adminTable,
  adminTableCell,
  adminTableHeadCell,
  adminTableRow,
  adminTableWrap,
} from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'Testimonials' };

export default async function AdminTestimonialsPage() {
  const [videos, reviews] = await Promise.all([
    prisma.videoTestimonial.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }),
    prisma.textTestimonial.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }),
  ]);

  return (
    <div className={adminPage}>
      <AdminPageHeader
        title="Testimonials"
        description="Manage video and written client testimonials shown on the home page and /testimonials."
        actions={
          <>
            <AdminButtonLink href="/admin/testimonials/videos/new" variant="secondary">
              + Add video
            </AdminButtonLink>
            <AdminButtonLink href="/admin/testimonials/reviews/new">+ Add review</AdminButtonLink>
          </>
        }
      />

      <div className="mb-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--z-text)' }}>
            Video testimonials
          </h2>
          <AdminButtonLink href="/admin/testimonials/videos/new" variant="secondary">
            + Add video
          </AdminButtonLink>
        </div>

        <div className={adminTableWrap}>
          <table className={adminTable}>
            <thead>
              <tr>
                <th className={adminTableHeadCell}>Title</th>
                <th className={adminTableHeadCell}>YouTube embed</th>
                <th className={adminTableHeadCell}>Order</th>
                <th className={adminTableHeadCell}>Status</th>
                <th className={adminTableHeadCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                    No video testimonials yet.
                  </td>
                </tr>
              ) : (
                videos.map((video) => (
                  <tr key={video.id} className={`${adminTableRow} align-top`}>
                    <td className={`${adminTableCell} font-semibold`}>{video.title}</td>
                    <td className={`${adminTableCell} max-w-md text-sm`} style={{ color: 'var(--z-text-muted)' }}>
                      <span className="line-clamp-2 break-all">{video.embedUrl}</span>
                    </td>
                    <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                      {video.sortOrder}
                    </td>
                    <td className={adminTableCell}>
                      <AdminStatusBadge variant={video.published ? 'published' : 'draft'}>
                        {video.published ? 'Published' : 'Draft'}
                      </AdminStatusBadge>
                    </td>
                    <td className={adminTableCell}>
                      <AdminTableActions
                        editHref={`/admin/testimonials/videos/${video.id}/edit`}
                        viewHref={video.published ? '/testimonials' : undefined}
                        viewExternal
                        deleteAction={deleteVideoTestimonialAction.bind(null, video.id)}
                        deleteConfirmMessage={`Delete video testimonial "${video.title}"?`}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--z-text)' }}>
            Text testimonials
          </h2>
          <AdminButtonLink href="/admin/testimonials/reviews/new">+ Add review</AdminButtonLink>
        </div>

        <div className={adminTableWrap}>
          <table className={adminTable}>
            <thead>
              <tr>
                <th className={adminTableHeadCell}>Client</th>
                <th className={adminTableHeadCell}>Quote</th>
                <th className={adminTableHeadCell}>Order</th>
                <th className={adminTableHeadCell}>Status</th>
                <th className={adminTableHeadCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center" style={{ color: 'var(--z-text-muted)' }}>
                    No text testimonials yet.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr key={review.id} className={`${adminTableRow} align-top`}>
                    <td className={adminTableCell}>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm" style={{ color: 'var(--z-text-muted)' }}>
                        {review.role}
                      </div>
                    </td>
                    <td className={`${adminTableCell} max-w-md text-sm`} style={{ color: 'var(--z-text-muted)' }}>
                      <p className="line-clamp-3">{review.quote}</p>
                    </td>
                    <td className={adminTableCell} style={{ color: 'var(--z-text-muted)' }}>
                      {review.sortOrder}
                    </td>
                    <td className={adminTableCell}>
                      <AdminStatusBadge variant={review.published ? 'published' : 'draft'}>
                        {review.published ? 'Published' : 'Draft'}
                      </AdminStatusBadge>
                    </td>
                    <td className={adminTableCell}>
                      <AdminTableActions
                        editHref={`/admin/testimonials/reviews/${review.id}/edit`}
                        viewHref={review.published ? '/testimonials' : undefined}
                        viewExternal
                        deleteAction={deleteTextTestimonialAction.bind(null, review.id)}
                        deleteConfirmMessage={`Delete text testimonial from ${review.name}?`}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
