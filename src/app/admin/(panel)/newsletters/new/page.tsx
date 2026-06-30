import { prisma } from '@/lib/db';
import { createNewsletterAction } from '@/lib/admin/newsletter-actions';
import AdminNewsletterFields from '@/components/admin/AdminNewsletterFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New newsletter' };

export default async function AdminNewNewsletterPage() {
  const serviceCategories = await prisma.serviceCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/newsletters">Back to newsletters</AdminBackLink>

      <AdminForm
        title="New newsletter issue"
        subtitle="Upload a PDF issue, set metadata, and target subscribers by practice area."
        action={createNewsletterAction}
      >
        <AdminNewsletterFields serviceCategories={serviceCategories} />
        <AdminSubmitButton>Create newsletter</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
