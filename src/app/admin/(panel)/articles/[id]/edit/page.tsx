import { redirect } from 'next/navigation';

export default async function AdminArticleEditRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/admin/posts/${id}/edit`);
}
