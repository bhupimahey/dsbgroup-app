import type { ReactNode } from 'react';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import type { NbfcPageJson } from '@/lib/site/nbfc-page-json';
import { joinParagraphs } from '@/lib/site/nbfc-page-json';

type Props = {
  content: NbfcPageJson;
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

export default function AdminNbfcPageFields({
  content,
  slug,
  metaDescription,
  metaKeywords,
  published,
}: Props) {
  return (
    <>
      <input type="hidden" name="nbfcTemplate" value="1" />
      <AdminField label="Slug" name="slug" defaultValue={slug} required />

      <Section title="Hero">
        <AdminField label="Hero title" name="heroTitle" defaultValue={content.heroTitle} required />
      </Section>

      <Section title="Introduction">
        <AdminField label="Intro heading" name="introHeading" defaultValue={content.introHeading} required />
        <AdminTextarea
          label="Intro paragraphs"
          name="introParagraphs"
          defaultValue={joinParagraphs(content.introParagraphs)}
          rows={10}
          required
          hint="Separate paragraphs with a blank line."
        />
      </Section>

      <Section title="Services list">
        <AdminField label="Services heading" name="servicesHeading" defaultValue={content.servicesHeading} required />
        <AdminTextarea
          label="Services intro (optional)"
          name="servicesIntro"
          defaultValue={content.servicesIntro ?? ''}
          rows={3}
        />
        <AdminTextarea
          label="Services bullets"
          name="servicesBullets"
          defaultValue={content.servicesBullets.join('\n')}
          rows={12}
          required
          hint="One service per line."
        />
      </Section>

      <Section title="Closing section">
        <AdminField label="Closing heading" name="closingHeading" defaultValue={content.closingHeading} required />
        <AdminTextarea
          label="Closing paragraphs"
          name="closingParagraphs"
          defaultValue={joinParagraphs(content.closingParagraphs)}
          rows={6}
          required
          hint="Separate paragraphs with a blank line."
        />
      </Section>

      <Section title="Call to action">
        <AdminField label="CTA heading" name="ctaHeading" defaultValue={content.ctaHeading} required />
        <AdminTextarea label="CTA text" name="ctaText" defaultValue={content.ctaText} rows={3} required />
      </Section>

      <Section title="SEO & publishing">
        <AdminTextarea label="Meta description" name="metaDescription" defaultValue={metaDescription ?? ''} rows={3} />
        <AdminField label="Meta keywords" name="metaKeywords" defaultValue={metaKeywords ?? ''} />
        <AdminCheckbox label="Published" name="published" defaultChecked={published ?? true} />
      </Section>
    </>
  );
}
