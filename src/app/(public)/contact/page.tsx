import ContactForm from '@/components/ContactForm';
import ContactFaq from '@/components/contact/ContactFaq';
import ContactInfoCards from '@/components/contact/ContactInfoCards';
import ThemePageHero from '@/components/theme/ThemePageHero';
import Link from 'next/link';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <div className="theme-shell">
      <ThemePageHero title="Contact Us" breadcrumbs={[{ label: 'Contact Us' }]} />

      {/* ===== CONTACT FORM + INFO CARDS ===== */}
      <section className="contact2-section">
        <div className="theme-inner-container">
          <div className="contact2-all-contact">
            <div className="contact2-grid">
              <div className="contact2-maincontact">
                <h2>Send Us A Message</h2>
                <p>Our response time is within 30 minutes during business hours</p>
                <ContactForm variant="contact2" />
              </div>

              <ContactInfoCards />
            </div>
          </div>

          {/* ===== MAP ===== */}
          <div className="contact2-map">
            <iframe
              src="https://maps.google.com/maps?width=1200&height=440&hl=en&q=Hind+Samachar+Marg,+Jalandhar,+Punjab&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              title="DSB Law Group Location"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <ContactFaq />

      {/* ===== CTA ===== */}
      <section className="contact2-cta">
        <div className="theme-inner-container">
          <div className="contact2-cta-grid">
            <div>
              <h2 className="contact2-cta-title">
                Get expert Law advice on your legal strategies
              </h2>
              <p className="contact2-cta-text">
                We believe that informed clients make better decisions. As part of our service,
                we provide personalised legal guidance to help you navigate complex matters
                with confidence.
              </p>
            </div>
            <div className="contact2-cta-btns">
              <Link href="tel:+918727914446" className="contact2-cta-btn contact2-cta-btn--dark">
                Get Law Advice <span>→</span>
              </Link>
              <Link href="/contact" className="contact2-cta-btn contact2-cta-btn--light">
                Contact Us <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
