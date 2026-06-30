import AdminPostEditView from '@/components/admin/AdminPostEditView';
import { prisma } from '@/lib/db';
import { typeToPostKind } from '@/lib/admin/post-routes';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit post' };

export default async function AdminEditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id }, select: { type: true } });
  if (!post) notFound();

  return <AdminPostEditView id={id} kind={typeToPostKind(post.type)} />;
}
