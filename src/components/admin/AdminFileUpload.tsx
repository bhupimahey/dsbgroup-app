'use client';

import Image from 'next/image';
import { useState } from 'react';
import { adminHint, adminLabel } from '@/components/admin/ui/admin-styles';
import { AdminSpinner } from '@/components/admin/ui/AdminIcons';

type Props = {
  label: string;
  name: string;
  accept: string;
  defaultValue?: string;
  hint?: string;
  uploadKind?: 'file' | 'pdf' | 'image' | 'page-image' | 'post-image' | 'team-image';
};

export default function AdminFileUpload({
  label,
  name,
  accept,
  defaultValue = '',
  hint,
  uploadKind = 'file',
}: Props) {
  const [path, setPath] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const isImageKind =
    uploadKind === 'image' ||
    uploadKind === 'page-image' ||
    uploadKind === 'post-image' ||
    uploadKind === 'team-image';

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('kind', uploadKind);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = (await res.json()) as { path?: string; error?: string };
      if (!res.ok || !data.path) {
        setError(data.error ?? 'Upload failed');
        return;
      }
      setPath(data.path);
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div>
      <label className={adminLabel} style={{ color: 'var(--z-text)' }}>
        {label}
      </label>
      <input type="hidden" name={name} value={path} />
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        <label className="zynix-btn-light inline-flex cursor-pointer items-center gap-2">
          {uploading ? (
            <>
              <AdminSpinner className="h-3.5 w-3.5" />
              Uploading…
            </>
          ) : path ? (
            'Replace file'
          ) : (
            'Choose file'
          )}
          <input type="file" accept={accept} className="sr-only" onChange={onFileChange} disabled={uploading} />
        </label>
        {path ? (
          <a
            href={path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline"
            style={{ color: 'var(--z-accent-dark)' }}
          >
            View uploaded file
          </a>
        ) : null}
      </div>
      {path && isImageKind ? (
        <div className="relative mt-3 h-40 w-full max-w-xs overflow-hidden rounded-lg border" style={{ borderColor: 'var(--z-border)' }}>
          <Image src={path} alt="" fill className="object-cover" sizes="320px" unoptimized />
        </div>
      ) : null}
      {path ? (
        <p className={`${adminHint} mt-1 font-mono text-xs`} style={{ color: 'var(--z-text-muted)' }}>
          {path}
        </p>
      ) : null}
      {error ? (
        <p className={`${adminHint} mt-1`} style={{ color: 'var(--z-danger)' }}>
          {error}
        </p>
      ) : null}
      {hint ? (
        <p className={adminHint} style={{ color: 'var(--z-text-muted)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
