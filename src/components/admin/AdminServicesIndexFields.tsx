import type { ReactNode } from 'react';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import type { ServicesIndexJson } from '@/lib/site/service-page-json';

type Props = {
  content: ServicesIndexJson;
  slug: string;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  published?: boolean;
};

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset
      className="space-y-4 rounded-xl border p-4"
      style={{ borderColor: 'var(--z-border)', background: 'var(--z-surface)' }}
    >
      <legend className="px-1 text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--z-text)' }}>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export default function AdminServicesIndexFields({
  content,
  slug,
  metaDescription,
  metaKeywords,
  published,
}: Props) {
  return (
    <>
      <input type="hidden" name="servicesIndexTemplate" value="1" />
      <AdminField label="Slug" name="slug" defaultValue={slug} required />

      <Section title="Services index page">
        <AdminField label="Hero title" name="heroTitle" defaultValue={content.heroTitle} required />
        <AdminField label="Section heading" name="sectionHeading" defaultValue={content.sectionHeading} required />
        <p className="text-sm" style={{ color: 'var(--z-text-muted)' }}>
          Service cards are built from each practice area page (Admin → Pages). Edit card teasers on individual service pages.
        </p>
      </Section>

      <Section title="SEO & publishing">
        <AdminTextarea label="Meta description" name="metaDescription" defaultValue={metaDescription ?? ''} rows={3} />
        <AdminField label="Meta keywords" name="metaKeywords" defaultValue={metaKeywords ?? ''} />
        <AdminCheckbox label="Published" name="published" defaultChecked={published ?? true} />
      </Section>
    </>
  );
}
