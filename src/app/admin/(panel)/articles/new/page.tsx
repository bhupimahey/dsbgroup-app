import { redirect } from 'next/navigation';

export default function AdminNewArticleRedirect() {
  redirect('/admin/posts/new?kind=articles');
}
