import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import AdminRichTextEditor from '@/components/admin/AdminRichTextEditorLazy';
import { adminHint, adminInput, adminLabel } from '@/components/admin/ui/admin-styles';

type Category = { id: string; name: string };

type NewsletterDefaults = {
  slug?: string;
  subject?: string;
  teaser?: string | null;
  bodyHtml?: string;
  issueNumber?: string | null;
  issueDate?: Date | null;
  pdfPath?: string | null;
  coverImagePath?: string | null;
  published?: boolean;
  selectedCategoryIds?: Set<string>;
};

export default function AdminNewsletterFields({
  serviceCategories,
  defaults = {},
}: {
  serviceCategories: Category[];
  defaults?: NewsletterDefaults;
}) {
  const issueDateValue = defaults.issueDate
    ? [
        defaults.issueDate.getFullYear(),
        String(defaults.issueDate.getMonth() + 1).padStart(2, '0'),
        String(defaults.issueDate.getDate()).padStart(2, '0'),
      ].join('-')
    : '';

  return (
    <>
      <AdminField label="Subject" name="subject" defaultValue={defaults.subject ?? ''} required />
      <AdminField
        label="URL slug"
        name="slug"
        defaultValue={defaults.slug ?? ''}
        hint='Used for the public archive page, e.g. "issue-3-new-labour-codes".'
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <AdminField
          label="Issue number"
          name="issueNumber"
          defaultValue={defaults.issueNumber ?? ''}
          hint='e.g. "3/20"'
        />
        <div>
          <label htmlFor="issueDate" className={adminLabel} style={{ color: 'var(--z-text)' }}>
            Issue date
          </label>
          <input
            id="issueDate"
            name="issueDate"
            type="date"
            defaultValue={issueDateValue}
            className={adminInput}
          />
        </div>
      </div>

      <AdminTextarea
        label="Email teaser"
        name="teaser"
        defaultValue={defaults.teaser ?? ''}
        rows={3}
        hint="Short summary shown in the archive and email intro."
      />

      <AdminFileUpload
        label="Newsletter PDF"
        name="pdfPath"
        accept="application/pdf,.pdf"
        defaultValue={defaults.pdfPath ?? ''}
        uploadKind="pdf"
        hint="Upload the full issue PDF (max 15 MB). Subscribers receive a link to read it online."
      />

      <AdminFileUpload
        label="Cover image (optional)"
        name="coverImagePath"
        accept="image/*"
        defaultValue={defaults.coverImagePath ?? ''}
        uploadKind="image"
        hint="Thumbnail for the public newsletter archive."
      />

      <AdminRichTextEditor
        label="Email introduction"
        name="bodyHtml"
        defaultValue={defaults.bodyHtml ?? ''}
        uploadKind="newsletter-image"
        hint="Intro text for the email. If empty, a default message is used when a PDF is attached."
      />

      <fieldset className="space-y-2">
        <legend className={adminLabel} style={{ color: 'var(--z-text)' }}>
          Service categories
        </legend>
        <p className={adminHint} style={{ color: 'var(--z-text-muted)' }}>
          Select at least one category to target subscribers.
        </p>
        {serviceCategories.length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--z-text-muted)' }}>
            No active service categories configured.
          </p>
        ) : (
          <div className="space-y-2">
            {serviceCategories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-sm" style={{ color: 'var(--z-text)' }}>
                <input
                  type="checkbox"
                  name="serviceCategoryIds"
                  value={cat.id}
                  defaultChecked={defaults.selectedCategoryIds?.has(cat.id)}
                  className="rounded"
                />
                {cat.name}
              </label>
            ))}
          </div>
        )}
      </fieldset>

      <AdminCheckbox label="Publish on public newsletter archive" name="published" defaultChecked={defaults.published} />
    </>
  );
}
