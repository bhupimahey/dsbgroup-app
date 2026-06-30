import { AdminPostListPage } from '@/components/admin/AdminPostList';

export const metadata = { title: 'Articles' };

export default function AdminArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string; visibility?: string }>;
}) {
  return <AdminPostListPage kind="articles" searchParams={searchParams} />;
}
