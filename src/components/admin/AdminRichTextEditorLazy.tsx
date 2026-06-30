'use client';

import dynamic from 'next/dynamic';

const AdminRichTextEditor = dynamic(() => import('@/components/admin/AdminRichTextEditor'), {
  ssr: false,
  loading: () => (
    <div
      className="admin-loading-pulse mt-1.5 flex h-[280px] items-center justify-center rounded-md border text-sm"
      style={{ borderColor: 'var(--z-border)', color: 'var(--z-text-muted)' }}
    >
      Loading editor…
    </div>
  ),
});

export default AdminRichTextEditor;
