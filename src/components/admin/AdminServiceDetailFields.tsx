import type { ReactNode } from 'react';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import { joinParagraphs } from '@/lib/site/about-page-json';
import type { ServiceDetailJson } from '@/lib/site/service-page-json';

type Props = {
  content: ServiceDetailJson;
  title: string;
  slug: string;
  imagePath?: string | null;
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

export default function AdminServiceDetailFields({
  content,
  title,
  slug,
  imagePath,
  metaDescription,
  metaKeywords,
  published,
}: Props) {
  return (
    <>
      <input type="hidden" name="serviceDetailTemplate" value="1" />
      <AdminField label="Slug" name="slug" defaultValue={slug} required />

      <Section title="Listing & hero">
        <AdminField label="Service name (page title)" name="title" defaultValue={title} required />
        <AdminTextarea label="Card teaser (services index)" name="cardTeaser" defaultValue={content.cardTeaser} rows={3} required />
        <AdminFileUpload
          label="Hero / detail image"
          name="imagePath"
          accept="image/jpeg,image/png,image/webp,image/gif"
          defaultValue={imagePath ?? ''}
          uploadKind="page-image"
        />
      </Section>

      <Section title="Main content">
        <AdminTextarea
          label="Intro paragraphs"
          name="introParagraphs"
          defaultValue={joinParagraphs(content.introParagraphs)}
          rows={8}
          required
          hint="Separate paragraphs with a blank line."
        />
        <AdminField label="Secondary heading" name="secondaryHeading" defaultValue={content.secondaryHeading} required />
        <AdminTextarea label="Secondary paragraph" name="secondaryParagraph" defaultValue={content.secondaryParagraph} rows={4} required />
      </Section>

      <Section title="Approach cards">
        {[0, 1].map((index) => {
          const card = content.approachCards[index];
          const n = index + 1;
          return (
            <div key={n} className="space-y-3 rounded-lg border p-3" style={{ borderColor: 'var(--z-border)' }}>
              <p className="text-sm font-semibold">Card {n}</p>
              <AdminField label="Title" name={`approach${n}Title`} defaultValue={card.title} required />
              <AdminTextarea label="Description" name={`approach${n}Description`} defaultValue={card.description} rows={3} required />
              <AdminField label="Link URL (optional)" name={`approach${n}Href`} defaultValue={card.href ?? ''} />
            </div>
          );
        })}
      </Section>

      <Section title="Benefits / service list">
        <AdminField label="Benefits heading" name="benefitsHeading" defaultValue={content.benefitsHeading} required />
        <AdminTextarea label="Benefits intro" name="benefitsIntro" defaultValue={content.benefitsIntro} rows={4} required />
        <AdminTextarea
          label="Benefit bullets"
          name="benefitBullets"
          defaultValue={content.benefitBullets.join('\n')}
          rows={8}
          required
          hint="One item per line."
        />
        <AdminTextarea label="Closing paragraph" name="benefitsClosing" defaultValue={content.benefitsClosing} rows={4} required />
      </Section>

      <Section title="Sidebar brochure">
        <AdminTextarea label="Brochure text" name="brochureText" defaultValue={content.brochureText ?? ''} rows={3} />
        <AdminField label="PDF download URL" name="brochurePdfUrl" defaultValue={content.brochurePdfUrl ?? ''} />
        <AdminField label="Doc download URL" name="brochureDocUrl" defaultValue={content.brochureDocUrl ?? ''} />
      </Section>

      <Section title="SEO & publishing">
        <AdminTextarea label="Meta description" name="metaDescription" defaultValue={metaDescription ?? ''} rows={3} />
        <AdminField label="Meta keywords" name="metaKeywords" defaultValue={metaKeywords ?? ''} />
        <AdminCheckbox label="Published" name="published" defaultChecked={published ?? true} />
      </Section>
    </>
  );
}
