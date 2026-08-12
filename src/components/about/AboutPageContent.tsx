import Image from 'next/image';
import Link from 'next/link';
import AboutTeamPreview from '@/components/about/AboutTeamPreview';
import AboutVisionTabs from '@/components/about/AboutVisionTabs';
import type { AboutPageContent } from '@/lib/site/about-page-content';
import { SITE_CONTACT } from '@/lib/site/nav-links';
import type { getTeamMembers } from '@/lib/db/public-data';

type TeamMemberRow = Awaited<ReturnType<typeof getTeamMembers>>[number];

const FEATURE_ICONS = {
  guidance: '/images/theme/about/icons/gudeiance1.svg',
  consulting: '/images/theme/about/icons/consulting1.svg',
  support: '/images/theme/about/icons/support1.svg',
} as const;

type Props = {
  content: AboutPageContent;
  teamMembers: TeamMemberRow[];
};

export default function AboutPageContent({ content, teamMembers }: Props) {
  return (
    <div className="about-page theme-shell">
      <section className="about-hero">
        <div className="about-container">
          <h1>{content.heroTitle}</h1>
          <p className="about-hero-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>{content.heroTitle}</span>
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-intro-grid">
            <div className="about-intro-image-wrap">
              <Image
                src={content.introImage}
                alt=""
                width={560}
                height={620}
                className="h-auto w-full rounded-[5px]"
                unoptimized
              />
              <Image
                src="/images/theme/about/elementor/elementor17.png"
                alt=""
                width={112}
                height={112}
                className="about-decor about-decor--tl"
                aria-hidden
                unoptimized
              />
            </div>

            <div className="about-intro-copy">
              <span className="about-badge">{content.introBadge}</span>
              <h2 className="about-section-title">{content.introHeading}</h2>
              {content.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="about-body-text">
                  {paragraph}
                </p>
              ))}

              <div className="about-stats-grid">
                {content.stats.map((stat) => (
                  <div key={stat.label} className="about-stat-card">
                    <p className="about-stat-value">
                      {stat.value}
                      {stat.suffix}
                    </p>
                    <p className="about-stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/contact" className="about-btn">
                Contact Us <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-law-section about-section">
        <Image
          src="/images/theme/about/elementor/elementor23.png"
          alt=""
          width={180}
          height={180}
          className="about-law-decor about-law-decor--tl"
          aria-hidden
          unoptimized
        />
        <Image
          src="/images/theme/about/elementor/elementor23.png"
          alt=""
          width={180}
          height={180}
          className="about-law-decor about-law-decor--br"
          aria-hidden
          unoptimized
        />

        <div className="about-container">
          <div className="about-law-grid">
            <div className="about-law-copy">
              <h2 className="about-section-title">{content.lawProvideHeading}</h2>
              {content.lawProvideParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="about-body-text">
                  {paragraph}
                </p>
              ))}
              <Link href="/team" className="about-btn">
                Meet Our Team <span aria-hidden>→</span>
              </Link>
            </div>

            <div>
              {content.featureCards.map((card) => (
                <article key={card.title} className="about-feature-card">
                  <div className="about-feature-icon">
                    <Image src={FEATURE_ICONS[card.icon]} alt="" width={32} height={32} unoptimized />
                  </div>
                  <div className="about-feature-body">
                    <h3 className="about-feature-title">
                      <Link href={card.href}>{card.title}</Link>
                    </h3>
                    <p className="about-feature-text">{card.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-container">
          <div className="about-mission-grid">
            <div className="about-mission-image-wrap">
              <Image
                src="/images/theme/about/sections/missionimg1.png"
                alt=""
                width={560}
                height={620}
                className="h-auto w-full rounded-[5px]"
                unoptimized
              />
              <Image
                src="/images/theme/about/elementor/elementor17.png"
                alt=""
                width={112}
                height={112}
                className="about-decor about-decor--tl"
                aria-hidden
                unoptimized
              />
            </div>

            <div className="about-mission-copy">
              <h2 className="about-section-title">{content.missionHeading}</h2>
              {content.missionParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="about-body-text">
                  {paragraph}
                </p>
              ))}

              <ul className="about-checklist">
                {content.missionBullets.map((item) => (
                  <li key={item}>
                    <span>
                      <Image
                        src="/images/theme/about/icons/check1.png"
                        alt=""
                        width={10}
                        height={10}
                        unoptimized
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link href="/services" className="about-btn">
                Learn More <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-vision-section about-section">
        <Image
          src="/images/theme/about/elementor/elementor23.png"
          alt=""
          width={180}
          height={180}
          className="about-vision-decor about-vision-decor--tl"
          aria-hidden
          unoptimized
        />
        <Image
          src="/images/theme/about/elementor/elementor23.png"
          alt=""
          width={180}
          height={180}
          className="about-vision-decor about-vision-decor--br"
          aria-hidden
          unoptimized
        />

        <div className="about-container">
          <div className="about-vision-grid">
            <AboutVisionTabs
              heading={content.visionHeading}
              lead={content.visionLead}
              tabs={content.tabs}
            />

            <div className="about-vision-image-wrap">
              <Image
                src="/images/theme/about/sections/vissionimg.png"
                alt=""
                width={560}
                height={620}
                className="h-auto w-full rounded-[5px]"
                unoptimized
              />
              <Image
                src="/images/theme/about/elementor/elementor17.png"
                alt=""
                width={112}
                height={112}
                className="about-decor about-decor--tr"
                aria-hidden
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <AboutTeamPreview
        badge={content.teamBadge}
        heading={content.teamHeading}
        members={teamMembers}
      />

      <section className="about-cta-section">
        <Image
          src="/images/theme/about/elementor/elementor72.png"
          alt=""
          width={220}
          height={220}
          className="about-cta-decor about-cta-decor--left"
          aria-hidden
          unoptimized
        />
        <Image
          src="/images/theme/about/elementor/elementor72.png"
          alt=""
          width={220}
          height={220}
          className="about-cta-decor about-cta-decor--right"
          aria-hidden
          unoptimized
        />

        <div className="about-container">
          <div className="about-cta-grid">
            <div>
              <h2 className="about-cta-title">{content.ctaHeading}</h2>
              <p className="about-cta-text">{content.ctaText}</p>
            </div>

            <div className="about-cta-actions">
              <Link href={SITE_CONTACT.phoneHref} className="about-btn about-btn--light">
                Get Law Advice <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="about-btn">
                Contact Us <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
