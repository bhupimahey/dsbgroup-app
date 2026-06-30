import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import {
  deleteNewsletterAction,
  queueNewsletterAction,
  updateNewsletterAction,
} from '@/lib/admin/newsletter-actions';
import AdminNewsletterFields from '@/components/admin/AdminNewsletterFields';
import AdminNewsletterSendStats from '@/components/admin/AdminNewsletterSendStats';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import AdminStatusBadge from '@/components/admin/ui/AdminStatusBadge';
import { AdminConfirmDeleteForm, AdminFormDeleteButton } from '@/components/admin/ui/AdminTableActions';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminLink, adminPage } from '@/components/admin/ui/admin-styles';

export default async function AdminEditNewsletterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [newsletter, serviceCategories] = await Promise.all([
    prisma.newsletter.findUnique({ where: { id }, include: { tags: true } }),
    prisma.serviceCategory.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
  ]);

  if (!newsletter) notFound();

  const selectedIds = new Set(newsletter.tags.map((tag) => tag.serviceCategoryId));
  const update = updateNewsletterAction.bind(null, id);
  const isDraft = newsletter.status === 'DRAFT';
  const statusVariant =
    newsletter.status === 'SENT' ? 'success' : newsletter.status === 'QUEUED' ? 'warning' : 'draft';

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/newsletters">Back to newsletters</AdminBackLink>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <AdminStatusBadge variant={statusVariant}>{newsletter.status}</AdminStatusBadge>
        {newsletter.published ? (
          <Link href={`/newsletters/${newsletter.slug}`} className={adminLink} style={{ color: 'var(--z-accent-dark)' }}>
            View public archive →
          </Link>
        ) : null}
      </div>

      <AdminNewsletterSendStats newsletterId={id} />

      <AdminForm title="Edit newsletter issue" subtitle={newsletter.subject} action={update}>
        <AdminNewsletterFields
          serviceCategories={serviceCategories}
          defaults={{
            slug: newsletter.slug,
            subject: newsletter.subject,
            teaser: newsletter.teaser,
            bodyHtml: newsletter.bodyHtml,
            issueNumber: newsletter.issueNumber,
            issueDate: newsletter.issueDate,
            pdfPath: newsletter.pdfPath,
            coverImagePath: newsletter.coverImagePath,
            published: newsletter.published,
            selectedCategoryIds: selectedIds,
          }}
        />

        <div className="flex flex-wrap gap-3">
          <AdminSubmitButton pendingLabel="Saving…">Save changes</AdminSubmitButton>
          {isDraft ? (
            <AdminSubmitButton variant="secondary" pendingLabel="Queuing…" formAction={queueNewsletterAction.bind(null, id)}>
              Queue send
            </AdminSubmitButton>
          ) : null}
        </div>
      </AdminForm>

      <AdminConfirmDeleteForm
        action={deleteNewsletterAction.bind(null, id)}
        confirmMessage="Delete this newsletter issue permanently? This cannot be undone."
      >
        <AdminFormDeleteButton>Delete this newsletter</AdminFormDeleteButton>
      </AdminConfirmDeleteForm>
    </div>
  );
}

