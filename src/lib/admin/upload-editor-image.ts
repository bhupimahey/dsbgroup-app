export type EditorUploadKind =
  | 'page-image'
  | 'post-image'
  | 'team-image'
  | 'faq-image'
  | 'newsletter-image';

export async function uploadEditorImage(file: File, kind: EditorUploadKind): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('kind', kind);

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });

  const data = (await res.json()) as { path?: string; error?: string };
  if (!res.ok || !data.path) {
    throw new Error(data.error ?? 'Image upload failed');
  }

  return data.path;
}
