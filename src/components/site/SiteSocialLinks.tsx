import { SITE_SOCIAL_LINKS } from '@/lib/site/social-links';

type SiteSocialLinksProps = {
  className?: string;
  linkClassName?: string;
};

export default function SiteSocialLinks({ className, linkClassName }: SiteSocialLinksProps) {
  return (
    <div className={className} aria-label="Social links">
      <ul>
        {SITE_SOCIAL_LINKS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              className={linkClassName}
              aria-label={social.label}
              {...(social.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {social.icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
