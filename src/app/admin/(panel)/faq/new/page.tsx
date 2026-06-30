import Link from 'next/link';
import { prisma } from '@/lib/db';
import { createFaqItemAction } from '@/lib/admin/faq-actions';
import AdminFaqItemFields from '@/components/admin/AdminFaqItemFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminLink, adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New FAQ' };

export default async function AdminNewFaqItemPage() {
  const categories = await prisma.faqCategory.findMany({ orderBy: { sortOrder: 'asc' } });

  if (categories.length === 0) {
    return (
      <div className={adminPage}>
        <AdminBackLink href="/admin/faq">Back to FAQ</AdminBackLink>
        <div className="zynix-card">
          <div className="zynix-card-body text-sm" style={{ color: 'var(--z-text-muted)' }}>
            Create an FAQ category before adding questions.{' '}
            <Link href="/admin/faq/categories/new" className={adminLink} style={{ color: 'var(--z-accent-dark)' }}>
              New category
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/faq">Back to FAQ</AdminBackLink>

      <AdminForm title="New FAQ item" action={createFaqItemAction}>
        <AdminFaqItemFields categories={categories} />
        <AdminSubmitButton pendingLabel="Creating…">Create FAQ item</AdminSubmitButton>
      </AdminForm>

      <p className="text-sm" style={{ color: 'var(--z-text-muted)' }}>
        Need a new section?{' '}
        <AdminButtonLink href="/admin/faq/categories/new" variant="secondary">
          Add category
        </AdminButtonLink>
      </p>
    </div>
  );
}
