import { AdminCheckbox, AdminField, AdminSelect, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditorLazy';
import { adminLabel } from '@/components/admin/ui/admin-styles';
import type { AdminPostKind } from '@/lib/admin/post-routes';
import { postKindToType } from '@/lib/admin/post-routes';

type Category = { id: string; name: string };

type Defaults = {
  title?: string;
  slug?: string;
  teaser?: string;
  body?: string;
  visibility?: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  featuredImagePath?: string | null;
  published?: boolean;
};

export default function AdminPostEditor({
  kind,
  categories = [],
  selectedCategoryIds = new Set<string>(),
  defaults = {},
}: {
  kind: AdminPostKind;
  categories?: Category[];
  selectedCategoryIds?: Set<string>;
  defaults?: Defaults;
}) {
  const type = postKindToType(kind);
  const isBlog = kind === 'blog';

  return (
    <>
      <input type="hidden" name="type" value={type} />
      {isBlog ? <input type="hidden" name="visibility" value="PUBLIC" /> : null}

      <AdminField label="Title" name="title" defaultValue={defaults.title} required />
      <AdminField label="Slug" name="slug" defaultValue={defaults.slug} required />
      <AdminTextarea label="Teaser" name="teaser" defaultValue={defaults.teaser} required rows={3} />
      <AdminRichTextEditor label="Body" name="body" defaultValue={defaults.body} required uploadKind="post-image" />
      <AdminFileUpload
        label="Featured image"
        name="featuredImagePath"
        accept="image/jpeg,image/png,image/webp,image/gif"
        defaultValue={defaults.featuredImagePath ?? ''}
        uploadKind="post-image"
        hint="Shown on listings and at the top of the post."
      />

      {!isBlog ? (
        <AdminSelect
          label="Access"
          name="visibility"
          defaultValue={defaults.visibility ?? 'PUBLIC'}
          options={[
            { value: 'PUBLIC', label: 'Public article' },
            { value: 'PREMIUM', label: 'Premium (login required for full content)' },
          ]}
        />
      ) : null}

      {isBlog && categories.length > 0 ? (
        <div>
          <p className={adminLabel} style={{ color: 'var(--z-text)' }}>
            Blog categories
          </p>
          <div className="mt-2 space-y-2">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-sm" style={{ color: 'var(--z-text)' }}>
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={cat.id}
                  defaultChecked={selectedCategoryIds.has(cat.id)}
                  className="rounded"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </div>
      ) : null}

      <AdminField label="Meta title" name="metaTitle" defaultValue={defaults.metaTitle ?? ''} />
      <AdminTextarea label="Meta description" name="metaDescription" defaultValue={defaults.metaDescription ?? ''} rows={3} />
      <AdminField label="Meta keywords (comma-separated)" name="metaKeywords" defaultValue={defaults.metaKeywords ?? ''} />
      <AdminCheckbox label="Published" name="published" defaultChecked={defaults.published} />
    </>
  );
}
