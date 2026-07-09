import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import AosInit from '@/components/home/AosInit';
import HomeCtaSubscribe from '@/components/home/HomeCtaSubscribe';
import HomeTestimonialsShowcase from '@/components/home/HomeTestimonialsShowcase';
import {
  getCachedHomeBlogPosts,
  getCachedHomeServiceCategories,
} from '@/lib/db/public-cache';
import { SITE_CONTACT } from '@/lib/site/nav-links';
import { getPublishedTextTestimonials, getPublishedVideoTestimonials } from '@/lib/site/testimonials';
import '@/styles/home-index2.css';

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

const COUNTER_AOS = [800, 1000, 1200, 1400] as const;
const CLIENT_STEP_AOS = [1000, 1200, 1400] as const;

export const revalidate = 300;

const PROCESS_STEPS = [
  {
    title: 'Understanding your goals',
    body: 'We begin with your legal and business objectives to define the right advisory strategy.',
    icon: '/images/theme/index2/icons/client1.svg',
  },
  {
    title: 'Comprehensive analysis',
    body: 'Our team reviews your compliance posture, risks, and opportunities across key functions.',
    icon: '/images/theme/index2/icons/client2.svg',
  },
  {
    title: 'Execution and ongoing support',
    body: 'We help implement legal solutions and stay with you through evolving regulations.',
    icon: '/images/theme/index2/icons/client3.svg',
  },
] as const;

const CASE_STUDIES = [
  {
    title: 'NBFC licensing & setup',
    summary:
      'End-to-end RBI licensing, governance framework, and launch readiness for a new NBFC.',
    detail:
      'We supported the client through regulatory filings, board governance design, and operational launch milestones.',
    href: '/services',
    image: '/images/theme/index2/sections/case-img1.png',
  },
  {
    title: 'Banking compliance program',
    summary:
      'Designed a regulatory response and audit workflow for a financial institution.',
    detail:
      'Our team mapped compliance gaps, implemented monitoring workflows, and trained internal stakeholders.',
    href: '/services',
    image: '/images/theme/index2/sections/case-img2.png',
  },
  {
    title: 'Corporate restructuring',
    summary:
      'Led legal restructuring and documentation for growth-stage entities across jurisdictions.',
    detail:
      'We coordinated transaction documents, stakeholder approvals, and post-restructuring compliance.',
    href: '/services',
    image: '/images/theme/index2/sections/case-img3.png',
  },
] as const;

const SERVICE_ICONS = [
  '/images/theme/index2/icons/icon2.svg',
  '/images/theme/index2/icons/icon1.svg',
  '/images/theme/index2/icons/icon3.svg',
] as const;

const DEFAULT_BLOG_IMAGE = '/images/theme/index2/sections/blog2-img.png';

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

export default async function HomePage() {
  const [serviceCategories, blogPosts, videoTestimonials, textTestimonials] = await Promise.all([
    getCachedHomeServiceCategories(),
    getCachedHomeBlogPosts(),
    getPublishedVideoTestimonials(),
    getPublishedTextTestimonials(),
  ]);

  const [featuredPost, ...otherPosts] = blogPosts;

  return (
    <div className="theme-shell home2-page">
      <AosInit />
      <section className="home2-welcome">
        <div className="home2-container home2-welcome-grid">
          <div className="home2-welcome-copy" {...aos('fade-right', 1000)}>
            <span className="home2-label">Maximize Your Potential with Expert Consultation</span>
            <h1 className="home2-title-xl">
              Consulting driving growth and scale for your business.
            </h1>
            <p className="home2-lead">
              DSB Law Group provides integrated legal, regulatory, and strategic advisory across
              banking, NBFC, corporate, labour, and dispute-focused practice areas.
            </p>
            <div {...aos('fade-up', 1200)}>
              <Link href="/contact" className="home2-btn" style={{ marginTop: '32px' }}>
                Contact <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>

          <div aria-hidden />

          <div className="home2-welcome-visual" {...aos('zoom-out', 1200)}>
            <div className="home2-welcome-main" />
            <div className="home2-welcome-badge">
              <strong>1967</strong>
              <span>Trusted legal advisory since</span>
            </div>
            <span className="home2-shape home2-shape--one" />
            <span className="home2-shape home2-shape--two" />
          </div>
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container home2-about-grid">
          <div className="home2-about-images">
            <div className="home2-about-main" {...aos('zoom-out', 1200)} />
            <div className="home2-about-sub-grid">
              <div className="home2-about-sub" {...aos('fade-up', 1400)} />
              <div className="home2-about-sub" {...aos('fade-up', 1600)} />
            </div>
          </div>

          <div className="home2-about-copy" {...aos('fade-left', 800)}>
            <span className="home2-label">About Us</span>
            <h2 className="home2-title-lg" {...aos('fade-left', 1000)}>
              Maximize your potential with expert consultation.
            </h2>
            <div className="home2-highlight" {...aos('fade-left', 1200)}>
              <p>
                Ready to experience integrated legal and business advisory? Connect with our team
                to unlock growth, optimize compliance, and protect your organization.
              </p>
            </div>
            <p className="home2-text">
              Founded in 1967, DSB Law Group combines legal depth with business context to support
              clients in transactions, governance, dispute management, and regulatory execution.
            </p>
            <div {...aos('fade-up', 1400)}>
              <Link href="/about" className="home2-btn" style={{ marginTop: '32px' }}>
                Explore Services <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home2-section home2-section--compact-bottom home2-services">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">Our Services</span>
            <h2 className="home2-title-lg">Our professional business consultant services.</h2>
          </div>

          <div className="home2-service-grid">
            {serviceCategories.map((service, index) => {
              const cardAos = SERVICE_CARD_AOS[index % SERVICE_CARD_AOS.length];
              return (
              <article
                key={service.id}
                className="home2-service-card"
                {...aos(cardAos.animation, cardAos.duration, 'easing' in cardAos ? cardAos.easing : undefined)}
              >
                <div className="home2-service-icon">
                  <Image
                    src={SERVICE_ICONS[index % SERVICE_ICONS.length]}
                    alt=""
                    width={34}
                    height={34}
                  />
                </div>
                <h3 className="home2-title-sm">{service.name}</h3>
                <p className="home2-text-muted" style={{ marginTop: '12px' }}>
                  Practical advisory and implementation support tailored to this practice area.
                </p>
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
            <span className="home2-label">Company Progress</span>
            <h2 className="home2-title-lg">
              Company progress world record in business and strategy consulting.
            </h2>
            <p className="home2-text" style={{ marginBottom: '8px' }}>
              We help organizations move from reactive legal operations to structured, measurable
              compliance systems.
            </p>

            <div className="home2-progress">
              <div className="home2-progress-row">
                <span>Business Planning</span>
                <span>98%</span>
              </div>
              <div className="home2-progress-track">
                <div className="home2-progress-bar" style={{ width: '98%' }} />
              </div>
            </div>

            <div className="home2-progress">
              <div className="home2-progress-row">
                <span>International Business</span>
                <span>96%</span>
              </div>
              <div className="home2-progress-track">
                <div className="home2-progress-bar" style={{ width: '96%' }} />
              </div>
            </div>

            <div {...aos('fade-left', 1200)}>
              <Link href="/contact" className="home2-btn" style={{ marginTop: '32px' }}>
                Request a Quote <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>

          <div className="home2-company-visual" {...aos('zoom-out', 1000)} />
        </div>
      </section>

      <section className="home2-counter">
        <div className="home2-container home2-counter-grid">
          {[
            { value: '400+', label: 'Consulting Solutions' },
            { value: '620+', label: 'Complete Cases' },
            { value: '800+', label: 'Happy Customers' },
            { value: '120+', label: 'Expert Consultants' },
          ].map((counter, index) => (
            <div key={counter.label} className="home2-counter-card" {...aos('zoom-in', COUNTER_AOS[index])}>
              <p className="home2-counter-value">{counter.value}</p>
              <p className="home2-counter-label">{counter.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container home2-client-grid">
          <div className="home2-client-steps">
            {PROCESS_STEPS.map((step, index) => (
              <article key={step.title} className="home2-client-card" {...aos('fade-left', CLIENT_STEP_AOS[index])}>
                <div className="home2-client-icon">
                  <Image src={step.icon} alt="" width={30} height={30} />
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
            <span className="home2-label">How it works</span>
            <h2 className="home2-title-lg">
              Summarize the key points and benefits of our legal business consulting.
            </h2>
            <p className="home2-lead" style={{ marginBottom: '16px' }}>
              Include practical guidance on compliance, governance, and sector-specific legal
              strategy so visitors can quickly understand how we help.
            </p>
            <p className="home2-text">
              Showcase certifications, industry affiliations, and client outcomes to demonstrate
              credibility and establish trust with financial and corporate leaders.
            </p>
            <div {...aos('fade-right', 1200)}>
              <Link href="/contact" className="home2-btn" style={{ marginTop: '32px' }}>
                Contact <span className="home2-btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home2-section home2-section--compact-bottom home2-case-study">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">Case Study</span>
            <h2 className="home2-title-lg">View our case study</h2>
          </div>

          <div className="home2-case-grid">
            {CASE_STUDIES.map((caseStudy, index) => (
              <article
                key={caseStudy.title}
                className="home2-portfolio-card"
                {...aos('fade-up', 1000 + index * 200)}
              >
                <div className="home2-portfolio-image">
                  <Image
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    width={420}
                    height={320}
                    sizes="(max-width: 991px) 100vw, 33vw"
                  />
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
            <span className="home2-label">Our Clients Feedback</span>
            <h2 className="home2-title-lg">Some words from our clients</h2>
          </div>

          <HomeTestimonialsShowcase videos={videoTestimonials} reviews={textTestimonials} />
        </div>
      </section>

      <section className="home2-section">
        <div className="home2-container">
          <div className="home2-section-head" {...aos('fade-down', 800)}>
            <span className="home2-label">Our Blog</span>
            <h2 className="home2-title-lg">Our latest news &amp; blog</h2>
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
                  <article
                    key={post.id}
                    className="home2-blog-side-wrap"
                    {...aos('zoom-in', 1200 + index * 200)}
                  >
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
            <span className="home2-label">Contact Us</span>
            <h2 className="home2-title-lg">Get in touch with us today</h2>
          </div>

          <div className="home2-contact-shell" {...aos('fade-right', 1000)}>
            <div className="home2-contact-grid">
              <div>
                <h3 className="home2-title-md" style={{ marginBottom: '16px' }}>
                  Send Us A Message
                </h3>
                <p className="home2-text-muted" style={{ marginBottom: '24px' }}>
                  Our response time is within 30 minutes during business hours.
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
                      Email us today
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
                      Call or text
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
                      Contact us
                    </h3>
                    <p className="home2-text">
                      Pan-India legal advisory with offices supporting clients across sectors.
                    </p>
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
              Let us help your grow business
            </h2>
            <p className="home2-lead" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Subscribe to updates and receive practical legal and regulatory insights from DSB Law
              Group.
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
