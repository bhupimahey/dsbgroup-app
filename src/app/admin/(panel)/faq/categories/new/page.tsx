import { createFaqCategoryAction } from '@/lib/admin/faq-actions';
import { AdminField } from '@/components/admin/AdminFormFields';
import AdminBackLink from '@/components/admin/ui/AdminBackLink';
import AdminSubmitButton from '@/components/admin/ui/AdminSubmitButton';
import { AdminForm } from '@/components/admin/ui/AdminFormCard';
import { adminPage } from '@/components/admin/ui/admin-styles';

export const metadata = { title: 'New FAQ category' };

export default function AdminNewFaqCategoryPage() {
  return (
    <div className={adminPage}>
      <AdminBackLink href="/admin/faq/categories">Back to categories</AdminBackLink>

      <AdminForm title="New FAQ category" action={createFaqCategoryAction}>
        <AdminField label="Category name" name="name" required />
        <AdminField label="Sort order" name="sortOrder" defaultValue="0" />
        <AdminSubmitButton pendingLabel="Creating…">Create category</AdminSubmitButton>
      </AdminForm>
    </div>
  );
}
