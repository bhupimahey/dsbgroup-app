import Image from 'next/image';
import { HEAD_OFFICE, SITE_CONTACT } from '@/lib/site/nav-links';

const CONTACT_CARDS: Array<{
  icon: string;
  title: string;
  content: string;
  href?: string;
  dark: boolean;
}> = [
  {
    icon: '/images/theme/icons/clock1.svg',
    title: 'Contact us',
    content: HEAD_OFFICE.full,
    dark: false,
  },
  {
    icon: '/images/theme/icons/phone4.svg',
    title: 'Call or text',
    content: SITE_CONTACT.phone,
    href: SITE_CONTACT.phoneHref,
    dark: true,
  },
  {
    icon: '/images/theme/icons/email3.svg',
    title: 'Email us today',
    content: SITE_CONTACT.email,
    href: SITE_CONTACT.emailHref,
    dark: false,
  },
];

export default function ContactInfoCards() {
  return (
    <div className="contact2-cards">
      {CONTACT_CARDS.map((card) => (
        <div key={card.title} className="contact2-card-padding">
          <div
            className={`contact2-auhtor-section${card.dark ? ' contact2-auhtor-section--dark' : ''}`}
          >
            <div className="contact2-clock-area">
              <Image src={card.icon} alt="" width={40} height={41} unoptimized />
            </div>
            <div className="contact2-location">
              <h3>{card.title}</h3>
              {card.href ? (
                <p>
                  <a href={card.href}>{card.content}</a>
                </p>
              ) : (
                <p>{card.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
