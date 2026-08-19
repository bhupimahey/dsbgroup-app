import type { ReactNode } from 'react';
import { AdminCheckbox, AdminField, AdminTextarea } from '@/components/admin/AdminFormFields';
import AdminFileUpload from '@/components/admin/AdminFileUpload';
import { joinParagraphs } from '@/lib/site/about-page-json';
import { joinChips, type HomePageJson } from '@/lib/site/home-page-json';

type Props = {
  content: HomePageJson;
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

export default function AdminHomePageFields({
  content,
  slug,
  metaDescription,
  metaKeywords,
  published,
}: Props) {
  return (
    <>
      <input type="hidden" name="homeTemplate" value="1" />
      <input type="hidden" name="slug" value={slug} />
      <p className="text-xs" style={{ color: 'var(--z-text-muted)' }}>
        Slug is locked to <code>home</code> so this page controls the public homepage.
      </p>

      <Section title="Hero">
        <AdminField label="Heading" name="heroHeading" defaultValue={content.heroHeading} required />
        <AdminField label="Tagline" name="heroTagline" defaultValue={content.heroTagline} required />
        <AdminTextarea
          label="Intro paragraphs"
          name="heroParagraphs"
          defaultValue={joinParagraphs(content.heroParagraphs)}
          rows={6}
          required
          hint="Separate paragraphs with a blank line."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Button label" name="heroCtaLabel" defaultValue={content.heroCtaLabel} required />
          <AdminField label="Button link" name="heroCtaHref" defaultValue={content.heroCtaHref} required />
        </div>
        <AdminTextarea
          label="Service chips"
          name="heroChips"
          defaultValue={joinChips(content.heroChips)}
          rows={7}
          hint="One per line: LABEL|/path"
        />
        <AdminFileUpload
          label="Hero photo"
          name="heroImagePath"
          accept="image/jpeg,image/png,image/webp"
          defaultValue={content.heroImagePath ?? ''}
          uploadKind="page-image"
        />
        <AdminFileUpload
          label="Hero background"
          name="heroBackgroundPath"
          accept="image/jpeg,image/png,image/webp"
          defaultValue={content.heroBackgroundPath ?? ''}
          uploadKind="page-image"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Badge year" name="heroBadgeYear" defaultValue={content.heroBadgeYear ?? ''} />
          <AdminField label="Badge text" name="heroBadgeText" defaultValue={content.heroBadgeText ?? ''} />
        </div>
      </Section>

      <Section title="About">
        <AdminField label="Section label" name="aboutLabel" defaultValue={content.aboutLabel} required />
        <AdminField label="Heading" name="aboutHeading" defaultValue={content.aboutHeading} required />
        <AdminTextarea label="Highlight" name="aboutHighlight" defaultValue={content.aboutHighlight} rows={3} required />
        <AdminTextarea
          label="Paragraphs"
          name="aboutParagraphs"
          defaultValue={joinParagraphs(content.aboutParagraphs)}
          rows={8}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Button label" name="aboutCtaLabel" defaultValue={content.aboutCtaLabel} required />
          <AdminField label="Button link" name="aboutCtaHref" defaultValue={content.aboutCtaHref} required />
        </div>
        <AdminFileUpload
          label="Top photo (wide)"
          name="aboutImageMain"
          accept="image/jpeg,image/png,image/webp"
          defaultValue={content.aboutImageMain ?? ''}
          uploadKind="page-image"
          hint="Wide landscape, shown above the two smaller photos."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminFileUpload label="Bottom-left photo" name="aboutImageSide1" accept="image/jpeg,image/png,image/webp" defaultValue={content.aboutImageSide1 ?? ''} uploadKind="page-image" />
          <AdminFileUpload label="Bottom-right photo" name="aboutImageSide2" accept="image/jpeg,image/png,image/webp" defaultValue={content.aboutImageSide2 ?? ''} uploadKind="page-image" />
        </div>
        <AdminField label="Expertise heading" name="expertiseHeading" defaultValue={content.expertiseHeading} required />
        <AdminField label="Expertise intro" name="expertiseIntro" defaultValue={content.expertiseIntro ?? ''} />
        <AdminTextarea label="Expertise items" name="expertiseItems" defaultValue={content.expertiseItems.join('\n')} rows={11} hint="One item per line." />
      </Section>

      <Section title="Why choose us">
        <AdminField label="Heading" name="whyChooseHeading" defaultValue={content.whyChooseHeading} required />
        {[0, 1, 2, 3].map((index) => {
          const card = content.whyChooseCards[index] ?? { title: '', description: '' };
          return (
            <div key={index} className="grid gap-3">
              <AdminField label={`Card ${index + 1} title`} name={`whyChooseTitle${index}`} defaultValue={card.title} />
              <AdminTextarea label={`Card ${index + 1} text`} name={`whyChooseDescription${index}`} defaultValue={card.description} rows={3} />
            </div>
          );
        })}
      </Section>

      <Section title="Vision, mission & commitment">
        <AdminField label="Vision heading" name="visionHeading" defaultValue={content.visionHeading} required />
        <AdminTextarea label="Vision text" name="visionText" defaultValue={content.visionText} rows={4} required />
        <AdminField label="Mission heading" name="missionHeading" defaultValue={content.missionHeading} required />
        <AdminTextarea
          label="Mission paragraphs"
          name="missionParagraphs"
          defaultValue={joinParagraphs(content.missionParagraphs)}
          rows={8}
          required
        />
        <AdminField label="Commitment heading" name="commitmentHeading" defaultValue={content.commitmentHeading} required />
        <AdminTextarea label="Commitment text" name="commitmentText" defaultValue={content.commitmentText} rows={3} required />
      </Section>

      <Section title="Legacy">
        <AdminField label="Heading" name="legacyHeading" defaultValue={content.legacyHeading} required />
        <AdminTextarea
          label="Paragraphs"
          name="legacyParagraphs"
          defaultValue={joinParagraphs(content.legacyParagraphs)}
          rows={10}
          required
        />
      </Section>

      <Section title="Founder">
        <AdminField label="Section heading" name="founderHeading" defaultValue={content.founderHeading} required />
        <AdminField label="Name" name="founderName" defaultValue={content.founderName} required />
        <AdminField label="Role" name="founderRole" defaultValue={content.founderRole} required />
        <AdminTextarea
          label="Paragraphs"
          name="founderParagraphs"
          defaultValue={joinParagraphs(content.founderParagraphs)}
          rows={10}
          required
        />
        <AdminFileUpload
          label="Founder photo"
          name="founderImagePath"
          accept="image/jpeg,image/png,image/webp"
          defaultValue={content.founderImagePath ?? ''}
          uploadKind="page-image"
        />
      </Section>

      <Section title="Services heading">
        <p className="text-xs" style={{ color: 'var(--z-text-muted)' }}>
          Service cards still come from Admin → Service Areas. These fields only control the homepage heading and intro.
        </p>
        <AdminField label="Section label" name="servicesLabel" defaultValue={content.servicesLabel} required />
        <AdminField label="Heading" name="servicesHeading" defaultValue={content.servicesHeading} required />
        <AdminTextarea label="Intro" name="servicesIntro" defaultValue={content.servicesIntro ?? ''} rows={4} />
      </Section>

      <Section title="Company progress">
        <AdminField label="Section label" name="progressSectionLabel" defaultValue={content.progressLabel} required />
        <AdminField label="Heading" name="progressHeading" defaultValue={content.progressHeading} required />
        <AdminTextarea label="Paragraph" name="progressParagraph" defaultValue={content.progressParagraph} rows={3} required />
        {[0, 1].map((index) => {
          const bar = content.progressBars[index] ?? { label: '', percent: 0 };
          return (
            <div key={index} className="grid gap-4 sm:grid-cols-2">
              <AdminField label={`Bar ${index + 1} label`} name={`progressLabel${index}`} defaultValue={bar.label} />
              <AdminField label={`Bar ${index + 1} percent`} name={`progressPercent${index}`} defaultValue={String(bar.percent)} />
            </div>
          );
        })}
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Button label" name="progressCtaLabel" defaultValue={content.progressCtaLabel} required />
          <AdminField label="Button link" name="progressCtaHref" defaultValue={content.progressCtaHref} required />
        </div>
        <AdminFileUpload
          label="Progress photo"
          name="progressImagePath"
          accept="image/jpeg,image/png,image/webp"
          defaultValue={content.progressImagePath ?? ''}
          uploadKind="page-image"
        />
      </Section>

      <Section title="Counters">
        {[0, 1, 2, 3].map((index) => {
          const item = content.counters[index] ?? { value: '', label: '' };
          return (
            <div key={index} className="grid gap-4 sm:grid-cols-2">
              <AdminField label={`Value ${index + 1}`} name={`counterValue${index}`} defaultValue={item.value} />
              <AdminField label={`Label ${index + 1}`} name={`counterLabel${index}`} defaultValue={item.label} />
            </div>
          );
        })}
      </Section>

      <Section title="How it works">
        <AdminField label="Section label" name="howItWorksLabel" defaultValue={content.howItWorksLabel} required />
        <AdminField label="Heading" name="howItWorksHeading" defaultValue={content.howItWorksHeading} required />
        <AdminTextarea label="Lead" name="howItWorksLead" defaultValue={content.howItWorksLead} rows={3} required />
        <AdminTextarea label="Body" name="howItWorksBody" defaultValue={content.howItWorksBody} rows={3} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField label="Button label" name="howItWorksCtaLabel" defaultValue={content.howItWorksCtaLabel} required />
          <AdminField label="Button link" name="howItWorksCtaHref" defaultValue={content.howItWorksCtaHref} required />
        </div>
        {[0, 1, 2].map((index) => {
          const step = content.howItWorksSteps[index] ?? { title: '', body: '', icon: '' };
          return (
            <div key={index} className="grid gap-3">
              <AdminField label={`Step ${index + 1} title`} name={`stepTitle${index}`} defaultValue={step.title} />
              <AdminTextarea label={`Step ${index + 1} text`} name={`stepBody${index}`} defaultValue={step.body} rows={3} />
              <AdminField label={`Step ${index + 1} icon path`} name={`stepIcon${index}`} defaultValue={step.icon ?? ''} />
            </div>
          );
        })}
      </Section>

      <Section title="Case studies">
        <AdminField label="Section label" name="caseLabel" defaultValue={content.caseLabel} required />
        <AdminField label="Heading" name="caseHeading" defaultValue={content.caseHeading} required />
        {[0, 1, 2].map((index) => {
          const item = content.caseItems[index] ?? { title: '', summary: '', detail: '', href: '/services', imagePath: '' };
          return (
            <div key={index} className="space-y-3 rounded-lg border p-3" style={{ borderColor: 'var(--z-border)' }}>
              <AdminField label={`Case ${index + 1} title`} name={`caseTitle${index}`} defaultValue={item.title} />
              <AdminTextarea label="Summary" name={`caseSummary${index}`} defaultValue={item.summary} rows={2} />
              <AdminTextarea label="Detail" name={`caseDetail${index}`} defaultValue={item.detail} rows={3} />
              <AdminField label="Link" name={`caseHref${index}`} defaultValue={item.href} />
              <AdminFileUpload
                label="Photo"
                name={`caseImage${index}`}
                accept="image/jpeg,image/png,image/webp"
                defaultValue={item.imagePath ?? ''}
                uploadKind="page-image"
              />
            </div>
          );
        })}
      </Section>

      <Section title="Testimonials, blog & contact headings">
        <AdminField label="Testimonials label" name="testimonialsLabel" defaultValue={content.testimonialsLabel} required />
        <AdminField label="Testimonials heading" name="testimonialsHeading" defaultValue={content.testimonialsHeading} required />
        <AdminField label="Blog label" name="blogLabel" defaultValue={content.blogLabel} required />
        <AdminField label="Blog heading" name="blogHeading" defaultValue={content.blogHeading} required />
        <AdminField label="Contact label" name="contactLabel" defaultValue={content.contactLabel} required />
        <AdminField label="Contact heading" name="contactHeading" defaultValue={content.contactHeading} required />
        <AdminField label="Form title" name="contactFormTitle" defaultValue={content.contactFormTitle} required />
        <AdminTextarea label="Form intro" name="contactFormIntro" defaultValue={content.contactFormIntro} rows={2} required />
        <AdminField label="Email card title" name="contactEmailTitle" defaultValue={content.contactEmailTitle} required />
        <AdminField label="Phone card title" name="contactPhoneTitle" defaultValue={content.contactPhoneTitle} required />
        <AdminField label="Location card title" name="contactLocationTitle" defaultValue={content.contactLocationTitle} required />
        <AdminTextarea label="Location text" name="contactLocationText" defaultValue={content.contactLocationText} rows={2} required />
      </Section>

      <Section title="Footer CTA">
        <AdminField label="Heading" name="ctaHeading" defaultValue={content.ctaHeading} required />
        <AdminTextarea label="Text" name="ctaText" defaultValue={content.ctaText} rows={3} required />
      </Section>

      <AdminTextarea label="Meta description" name="metaDescription" defaultValue={metaDescription ?? ''} rows={3} />
      <AdminField label="Meta keywords" name="metaKeywords" defaultValue={metaKeywords ?? ''} />
      <AdminCheckbox label="Published" name="published" defaultChecked={published ?? true} />
    </>
  );
}
