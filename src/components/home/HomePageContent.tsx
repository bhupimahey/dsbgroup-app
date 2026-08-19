import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import AosInit from '@/components/home/AosInit';
import HomeCtaSubscribe from '@/components/home/HomeCtaSubscribe';
import HomeTestimonialsShowcase from '@/components/home/HomeTestimonialsShowcase';
import type { CSSProperties } from 'react';
import type { HomePageJson } from '@/lib/site/home-page-json';
import type { ServiceCardCopy } from '@/lib/site/service-card';
import { SITE_CONTACT } from '@/lib/site/nav-links';
import type { TextTestimonial, VideoTestimonial } from '@/lib/site/testimonials-content';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  teaser: string | null;
  featuredImagePath: string | null;
  publishedAt: Date | string | null;
};

type Props = {
  content: HomePageJson;
  homeServices: ServiceCardCopy[];
  blogPosts: BlogPost[];
  videoTestimonials: VideoTestimonial[];
  textTestimonials: TextTestimonial[];
};

function aos(animation: string, duration?: number, easing?: string) {
  const props: Record<string, string> = { 'data-aos': animation };
  if (duration) props['data-aos-duration'] = String(duration);
  if (easing) props['data-aos-easing'] = easing;
  return props;
}

const SERVICE_CARD_AOS = [
  { animation: 'fade-down', duration: 1000 },
  { animation: 'fade-down', duration: 1200 },
  { animation: 'fade-down', duration: 1400 },
  { animation: 'fade-up', duration: 1200, easing: 'linear' },
  { animation: 'fade-up', duration: 1400, easing: 'linear' },
  { animation: 'fade-up', duration: 1600, easing: 'linear' },
] as const;

const SERVICE_ICONS = [
  '/images/theme/index2/icons/icon2.svg',
  '/images/theme/index2/icons/icon1.svg',
  '/images/theme/index2/icons/icon3.svg',
] as const;

const DEFAULT_BLOG_IMAGE = '/images/theme/index2/sections/blog2-img.png';
const DEFAULT_STEP_ICONS = [
  '/images/theme/index2/icons/client1.svg',
  '/images/theme/index2/icons/client2.svg',
  '/images/theme/index2/icons/client3.svg',
];

function getPostTeaser(post: { teaser: string | null }) {
  if (post.teaser?.trim()) return post.teaser;
  return 'Read the latest legal and regulatory insight from DSB Law Group.';
}

function getPostImage(post: { featuredImagePath: string | null }) {
  return post.featuredImagePath?.trim() || DEFAULT_BLOG_IMAGE;
}

function formatPostDate(date: Date | string | null | undefined) {
  if (!date) return 'Latest update';
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d);
}

export default function HomePageContent({
  content,
  homeServices,
  blogPosts,
  videoTestimonials,
  textTestimonials,
}: Props) {
  const [featuredPost, ...otherPosts] = blogPosts;
  const heroBackground = content.heroBackgroundPath?.trim() || '/images/Hero-bg.png';
  const heroPhoto = content.heroImagePath?.trim() || '/images/hero-Right-side-img.png';
  const progressImage = content.progressImagePath?.trim();

  return (
    <div className="theme-shell home2-page">
      <AosInit />
      <section
        className="home2-welcome"
        style={{ '--home-hero-bg': `url('${heroBackground}')` } as CSSProperties}
      >
        <div className="home2-welcome-inner">
          <div className="home2-welcome-copy" {...aos('fade-right', 1000)}>
            <h1 className="home2-welcome-heading">{content.heroHeading}</h1>
            <p className="home2-welcome-tagline">{content.heroTagline}</p>
            {content.heroParagraphs.map((paragraph, index) => (
              <p key={`hero-${index}`} className="home2-welcome-intro">
                {paragraph}
              </p>
            ))}
            <div className="home2-welcome-chips" {...aos('fade-up', 1100)}>
              {content.heroChips.map((chip) => (
                <Link key={chip.label} href={chip.href} className="home2-welcome-chip">
                  {chip.label}
                </Link>
              ))}
            </div>
            <div {...aos('fade-up', 1300)}>
              <Link href={content.heroCtaHref} className="home2-btn home2-welcome-cta">
                {content.heroCtaLabel} <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="home2-welcome-visual" {...aos('zoom-out', 1200)}>
            <div className="home2-welcome-frame">
              <div className="home2-welcome-main">
                <Image
                  src={heroPhoto}
                  alt="DSB Law Group legal advisors in consultation"
                  fill
                  priority
                  unoptimized
                  className="home2-welcome-photo"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </div>
              <Image
                src="/images/59-yr-badge.png"
                alt="59th Anniversary"
                width={170}
                height={170}
                className="home2-welcome-anniversary"
                unoptimized
                priority
              />
              {content.heroBadgeYear ? (
                <div className="home2-welcome-badge">
                  <strong>{content.heroBadgeYear}</strong>
                  <span>{content.heroBadgeText}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container home2-about-grid">
          <div className="home2-about-images">
            <div className="home2-about-main" {...aos('zoom-out', 1200)}>
              {content.aboutImageMain ? (
                <Image src={content.aboutImageMain} alt="DSB Law Group conference room" fill className="object-cover" sizes="(max-width: 991px) 100vw, 580px" unoptimized />
              ) : null}
            </div>
            <div className="home2-about-sub-grid">
              <div className="home2-about-sub" {...aos('fade-up', 1400)}>
                {content.aboutImageSide1 ? (
                  <Image src={content.aboutImageSide1} alt="Legal professional arriving for a meeting" fill className="object-cover" sizes="280px" unoptimized />
                ) : null}
              </div>
              <div className="home2-about-sub" {...aos('fade-up', 1600)}>
                {content.aboutImageSide2 ? (
                  <Image src={content.aboutImageSide2} alt="Advisors in a client meeting" fill className="object-cover" sizes="280px" unoptimized />
                ) : null}
              </div>
            </div>
          </div>

          <div className="home2-about-copy" {...aos('fade-left', 800)}>
            <span className="home2-label">{content.aboutLabel}</span>
            <h2 className="home2-title-lg" {...aos('fade-left', 1000)}>
              {content.aboutHeading}
            </h2>
            <div className="home2-highlight" {...aos('fade-left', 1200)}>
              <p>{content.aboutHighlight}</p>
            </div>
            {content.aboutParagraphs.map((paragraph, index) => (
              <p key={`about-${index}`} className="home2-text">
                {paragraph}
              </p>
            ))}
            <h3 className="home2-title-md" style={{ marginTop: '24px' }}>
              {content.expertiseHeading}
            </h3>
            {content.expertiseIntro ? <p className="home2-text">{content.expertiseIntro}</p> : null}
            <ul className="home2-expertise-list">
              {content.expertiseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div {...aos('fade-up', 1400)}>
              <Link href={content.aboutCtaHref} className="home2-btn" style={{ marginTop: '32px' }}>
                {content.aboutCtaLabel} <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home2-section home2-section--compact-bottom">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">Why Choose Us</span>
            <h2 className="home2-title-lg">{content.whyChooseHeading}</h2>
          </div>
          <div className="home2-why-grid">
            {content.whyChooseCards.map((card, index) => (
              <article key={card.title} className="home2-why-card" {...aos('fade-up', 1000 + index * 120)}>
                <h3 className="home2-title-md" style={{ marginBottom: '12px' }}>
                  {card.title}
                </h3>
                <p className="home2-text">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container">
          <div className="home2-vision-grid">
            <article className="home2-vision-card" {...aos('fade-right', 900)}>
              <span className="home2-label">{content.visionHeading}</span>
              <p className="home2-text" style={{ marginTop: '12px' }}>
                {content.visionText}
              </p>
            </article>
            <article className="home2-vision-card" {...aos('fade-left', 900)}>
              <span className="home2-label">{content.commitmentHeading}</span>
              <p className="home2-text" style={{ marginTop: '12px' }}>
                {content.commitmentText}
              </p>
            </article>
          </div>
          <div className="home2-vision-card" style={{ marginTop: '1.25rem' }} {...aos('fade-up', 1000)}>
            <span className="home2-label">{content.missionHeading}</span>
            {content.missionParagraphs.map((paragraph, index) => (
              <p key={`mission-${index}`} className="home2-text" style={{ marginTop: '12px' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">Our Legacy</span>
            <h2 className="home2-title-lg">{content.legacyHeading}</h2>
          </div>
          {content.legacyParagraphs.map((paragraph, index) => (
            <p key={`legacy-${index}`} className="home2-text" style={{ maxWidth: '52rem' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="home2-section home2-section--compact-bottom">
        <div className="home2-container home2-founder-grid">
          <div className="home2-founder-photo" {...aos('zoom-out', 1000)}>
            {content.founderImagePath ? (
              <Image src={content.founderImagePath} alt={content.founderName} fill className="object-cover object-top" sizes="(max-width: 991px) 100vw, 40vw" unoptimized />
            ) : null}
          </div>
          <div {...aos('fade-left', 900)}>
            <span className="home2-label">{content.founderHeading}</span>
            <h2 className="home2-title-lg">{content.founderName}</h2>
            <p className="home2-founder-role">{content.founderRole}</p>
            {content.founderParagraphs.map((paragraph, index) => (
              <p key={`founder-${index}`} className="home2-text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="home2-section home2-section--compact-bottom home2-services">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">{content.servicesLabel}</span>
            <h2 className="home2-title-lg">{content.servicesHeading}</h2>
            {content.servicesIntro ? (
              <p className="home2-text" style={{ marginTop: '12px', maxWidth: '46rem', marginLeft: 'auto', marginRight: 'auto' }}>
                {content.servicesIntro}
              </p>
            ) : null}
          </div>

          <div className="home2-service-grid">
            {homeServices.map((service, index) => {
              const cardAos = SERVICE_CARD_AOS[index % SERVICE_CARD_AOS.length];
              return (
                <article
                  key={service.slug}
                  className="home2-service-card"
                  {...aos(cardAos.animation, cardAos.duration, 'easing' in cardAos ? cardAos.easing : undefined)}
                >
                  <div className="home2-service-icon">
                    <Image src={SERVICE_ICONS[index % SERVICE_ICONS.length]} alt="" width={34} height={34} />
                  </div>
                  <h3 className="home2-title-sm">{service.name}</h3>
                  {service.teaser ? (
                    <p className="home2-text-muted" style={{ marginTop: '12px' }}>
                      {service.teaser}
                    </p>
                  ) : null}
                  <Link href={`/pages/${service.slug}`} className="home2-link">
                    Learn More <span>→</span>
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="home2-center-action" {...aos('fade-up', 1200)}>
            <Link href="/services" className="home2-btn">
              View More Services <span className="home2-btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container home2-company-grid">
          <div className="home2-company-copy" {...aos('fade-left', 800)}>
            <span className="home2-label">{content.progressLabel}</span>
            <h2 className="home2-title-lg">{content.progressHeading}</h2>
            <p className="home2-text" style={{ marginBottom: '8px' }}>
              {content.progressParagraph}
            </p>
            {content.progressBars.map((bar) => (
              <div key={bar.label} className="home2-progress">
                <div className="home2-progress-row">
                  <span>{bar.label}</span>
                  <span>{bar.percent}%</span>
                </div>
                <div className="home2-progress-track">
                  <div className="home2-progress-bar" style={{ width: `${bar.percent}%` }} />
                </div>
              </div>
            ))}
            <div {...aos('fade-left', 1200)}>
              <Link href={content.progressCtaHref} className="home2-btn" style={{ marginTop: '32px' }}>
                {content.progressCtaLabel} <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>
          <div
            className="home2-company-visual"
            {...aos('zoom-out', 1000)}
            style={
              progressImage
                ? ({ '--home-progress-bg': `url('${progressImage}')` } as CSSProperties)
                : undefined
            }
          />
        </div>
      </section>

      <section className="home2-counter">
        <div className="home2-container home2-counter-grid">
          {content.counters.map((counter, index) => (
            <div key={counter.label} className="home2-counter-card" {...aos('zoom-in', 800 + index * 200)}>
              <p className="home2-counter-value">{counter.value}</p>
              <p className="home2-counter-label">{counter.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container home2-client-grid">
          <div className="home2-client-steps">
            {content.howItWorksSteps.map((step, index) => (
              <article key={step.title} className="home2-client-card" {...aos('fade-left', 1000 + index * 200)}>
                <div className="home2-client-icon">
                  <Image src={step.icon?.trim() || DEFAULT_STEP_ICONS[index % DEFAULT_STEP_ICONS.length]} alt="" width={30} height={30} />
                </div>
                <div className="home2-client-body">
                  <h3 className="home2-title-md" style={{ marginBottom: '14px' }}>
                    {step.title}
                  </h3>
                  <p className="home2-text">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="home2-client-copy" {...aos('fade-right', 1000)}>
            <span className="home2-label">{content.howItWorksLabel}</span>
            <h2 className="home2-title-lg">{content.howItWorksHeading}</h2>
            <p className="home2-lead" style={{ marginBottom: '16px' }}>
              {content.howItWorksLead}
            </p>
            <p className="home2-text">{content.howItWorksBody}</p>
            <div {...aos('fade-right', 1200)}>
              <Link href={content.howItWorksCtaHref} className="home2-btn" style={{ marginTop: '32px' }}>
                {content.howItWorksCtaLabel} <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home2-section home2-section--compact-bottom home2-case-study">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">{content.caseLabel}</span>
            <h2 className="home2-title-lg">{content.caseHeading}</h2>
          </div>
          <div className="home2-case-grid">
            {content.caseItems.map((caseStudy, index) => (
              <article key={caseStudy.title} className="home2-portfolio-card" {...aos('fade-up', 1000 + index * 200)}>
                <div className="home2-portfolio-image">
                  {caseStudy.imagePath ? (
                    <Image
                      src={caseStudy.imagePath}
                      alt={caseStudy.title}
                      width={420}
                      height={320}
                      sizes="(max-width: 991px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : null}
                </div>
                <div className="home2-portfolio-panel">
                  <h3 className="home2-title-md">
                    <Link href={caseStudy.href}>{caseStudy.title}</Link>
                  </h3>
                  <p className="home2-text">{caseStudy.summary}</p>
                  <div className="home2-portfolio-hover">
                    <p className="home2-text">{caseStudy.detail}</p>
                    <Link href={caseStudy.href} className="home2-link home2-link--uppercase">
                      Learn More <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home2-section home2-testimonials">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">{content.testimonialsLabel}</span>
            <h2 className="home2-title-lg">{content.testimonialsHeading}</h2>
          </div>
          <HomeTestimonialsShowcase videos={videoTestimonials} reviews={textTestimonials} />
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">{content.blogLabel}</span>
            <h2 className="home2-title-lg">{content.blogHeading}</h2>
          </div>
          {blogPosts.length > 0 ? (
            <div className="home2-blog-grid">
              {featuredPost ? (
                <article className="home2-blog-featured" {...aos('zoom-out', 1000)}>
                  <div className="home2-blog-author-area">
                    <div className="home2-blog-images">
                      <Image
                        src={getPostImage(featuredPost)}
                        alt={featuredPost.title}
                        width={640}
                        height={480}
                        sizes="(max-width: 991px) 100vw, 50vw"
                      />
                    </div>
                    <div className="home2-blog-featured-panel" {...aos('zoom-out', 1400)}>
                      <div className="home2-blog-panel home2-blog-panel--featured">
                        <div className="home2-blog-date-row home2-blog-date-row--light">
                          <span className="home2-blog-date-icon" aria-hidden="true" />
                          <span>{formatPostDate(featuredPost.publishedAt)}</span>
                        </div>
                        <Link href={`/blog/${featuredPost.slug}`} className="home2-blog-title-link">
                          <h3 className="home2-title-sm">{featuredPost.title}</h3>
                        </Link>
                        <p className="home2-text">{getPostTeaser(featuredPost)}</p>
                        <Link href={`/blog/${featuredPost.slug}`} className="home2-blog-learn-more">
                          Learn More <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ) : null}
              <div className="home2-blog-stack">
                {otherPosts.map((post, index) => (
                  <article key={post.id} className="home2-blog-side-wrap" {...aos('zoom-in', 1200 + index * 200)}>
                    <div className="home2-blog-panel">
                      <div className="home2-blog-date-row">
                        <span className="home2-blog-date-icon" aria-hidden="true" />
                        <span>{formatPostDate(post.publishedAt)}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="home2-blog-title-link">
                        <h3 className="home2-title-sm">{post.title}</h3>
                      </Link>
                      <p className="home2-text">{getPostTeaser(post)}</p>
                      <Link href={`/blog/${post.slug}`} className="home2-blog-learn-more">
                        Learn More <span>→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <p className="home2-text text-center">Blog posts will appear here once published.</p>
          )}
        </div>
      </section>

      <section className="home2-section home2-contact">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">{content.contactLabel}</span>
            <h2 className="home2-title-lg">{content.contactHeading}</h2>
          </div>
          <div className="home2-contact-shell" {...aos('fade-right', 1000)}>
            <div className="home2-contact-grid">
              <div>
                <h3 className="home2-title-md" style={{ marginBottom: '16px' }}>
                  {content.contactFormTitle}
                </h3>
                <p className="home2-text-muted" style={{ marginBottom: '24px' }}>
                  {content.contactFormIntro}
                </p>
                <div className="home2-contact-form">
                  <ContactForm />
                </div>
              </div>
              <div className="home2-contact-cards">
                <article className="home2-contact-card">
                  <div className="home2-contact-icon" aria-hidden>
                    ✉
                  </div>
                  <div className="home2-contact-card-body">
                    <h3 className="home2-title-md" style={{ marginBottom: '8px', fontSize: '20px' }}>
                      {content.contactEmailTitle}
                    </h3>
                    <p className="home2-text">
                      <a href={SITE_CONTACT.emailHref}>{SITE_CONTACT.email}</a>
                    </p>
                  </div>
                </article>
                <article className="home2-contact-card home2-contact-card--accent">
                  <div className="home2-contact-icon" aria-hidden>
                    ☎
                  </div>
                  <div className="home2-contact-card-body">
                    <h3 className="home2-title-md" style={{ marginBottom: '8px', fontSize: '20px' }}>
                      {content.contactPhoneTitle}
                    </h3>
                    <p className="home2-text">
                      <a href={SITE_CONTACT.phoneHref}>{SITE_CONTACT.phone}</a>
                    </p>
                  </div>
                </article>
                <article className="home2-contact-card">
                  <div className="home2-contact-icon" aria-hidden>
                    📍
                  </div>
                  <div className="home2-contact-card-body">
                    <h3 className="home2-title-md" style={{ marginBottom: '8px', fontSize: '20px' }}>
                      {content.contactLocationTitle}
                    </h3>
                    <p className="home2-text">{content.contactLocationText}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home2-cta">
        <div className="home2-container home2-cta-grid">
          <div {...aos('fade-right', 1000)}>
            <h2 className="home2-title-lg" style={{ color: '#fff', marginBottom: '16px' }}>
              {content.ctaHeading}
            </h2>
            <p className="home2-lead" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {content.ctaText}
            </p>
          </div>
          <div aria-hidden />
          <div {...aos('fade-left', 1000)}>
            <HomeCtaSubscribe />
          </div>
        </div>
      </section>
    </div>
  );
}
