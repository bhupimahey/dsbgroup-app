import { redirect } from 'next/navigation';

export default function AdminNewBlogRedirect() {
  redirect('/admin/posts/new?kind=blog');
}
