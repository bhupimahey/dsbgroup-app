import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { SITE_CONTACT } from '@/lib/site/nav-links';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div className="theme-shell">
      <section className="contact1-hero">
        <div className="theme-content-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <h1>Contact Us</h1>
          <p className="contact1-breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>›</span>
            <span>Contact Us</span>
          </p>
        </div>
      </section>

      <section className="contact1-section">
        <div className="contact1-grid">
          <div className="contact1-info">
            <span className="contact1-info-label">Contact Us</span>
            <h2>Contact Us for Expert Legal Guidance</h2>
            <p>
              Provide professional advice and guidance on legal matters, helping clients understand
              their rights, obligations, and potential courses of action.
            </p>

            <div className="contact1-info-card">
              <div className="contact1-info-icon" aria-hidden>
                ☎
              </div>
              <div>
                <p className="contact1-info-card-label">Give us a Call</p>
                <a className="contact1-info-card-value" href={SITE_CONTACT.phoneHref}>
                  {SITE_CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="contact1-info-card">
              <div className="contact1-info-icon" aria-hidden>
                ✉
              </div>
              <div>
                <p className="contact1-info-card-label">Send us Mail</p>
                <a className="contact1-info-card-value" href={SITE_CONTACT.emailHref}>
                  {SITE_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          <div className="contact1-form-panel">
            <h3>Send us a Message</h3>
            <p>
              Share your legal requirement and our team will connect with you during business hours.
            </p>
            <ContactForm variant="dark" />
          </div>
        </div>
      </section>
    </div>
  );
}
