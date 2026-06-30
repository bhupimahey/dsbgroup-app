import { AdminPostListPage } from '@/components/admin/AdminPostList';

export const metadata = { title: 'Blog' };

export default function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
}) {
  return <AdminPostListPage kind="blog" searchParams={searchParams} />;
}
