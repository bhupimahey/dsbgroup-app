import type { ReactNode } from 'react';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import type { HrLabourPageJson } from '@/lib/site/hr-labour-page-json';
import { joinParagraphs } from '@/lib/site/hr-labour-page-json';

type Props = {
  content: HrLabourPageJson;
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

export default function AdminHrLabourPageFields({
  content,
  slug,
  metaDescription,
  metaKeywords,
  published,
}: Props) {
  const slots = Array.from({ length: 8 }, (_, index) => content.servicesItems[index] ?? { title: '', description: '' });

  return (
    <>
      <input type="hidden" name="hrLabourTemplate" value="1" />
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
          rows={8}
          required
          hint="Separate paragraphs with a blank line."
        />
      </Section>

      <Section title="Key services">
        <AdminField label="Services heading" name="servicesHeading" defaultValue={content.servicesHeading} required />
        {slots.map((item, index) => (
          <div key={index} className="space-y-3 rounded-lg border p-3" style={{ borderColor: 'var(--z-border)' }}>
            <p className="text-sm font-semibold">Service {index + 1}</p>
            <AdminField label="Title" name={`service${index}Title`} defaultValue={item.title} />
            <AdminTextarea label="Description" name={`service${index}Description`} defaultValue={item.description} rows={3} />
          </div>
        ))}
      </Section>

      <Section title="Closing">
        <AdminTextarea
          label="Closing paragraph"
          name="closingParagraph"
          defaultValue={content.closingParagraph}
          rows={4}
          required
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
