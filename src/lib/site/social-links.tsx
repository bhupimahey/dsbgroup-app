import type { ReactNode } from 'react';

export type SiteSocialLink = {
  label: string;
  href: string;
  icon: ReactNode;
};

const iconClass = 'site-social-icon';

export const SITE_SOCIAL_LINKS: SiteSocialLink[] = [
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M13.5 8.5V6.9c0-.8.5-.9.8-.9h1.6V3h-2.2C11.1 3 10.5 5 10.5 6.4v2.1H9v2.8h1.5V21h3V11.3h2l.3-2.8h-2.3z"
        />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M6.5 8.5A1.75 1.75 0 1 1 6.5 5a1.75 1.75 0 0 1 0 3.5zM5 9.8h3V19H5V9.8zm4.8 0h2.8v1.3h.1c.4-.8 1.4-1.6 2.8-1.6 3 0 3.5 1.9 3.5 4.4V19h-3v-4.3c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2V19h-3V9.8z"
        />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M21 8.4a2.5 2.5 0 0 0-1.8-1.8C17.7 6.2 12 6.2 12 6.2s-5.7 0-7.2.4A2.5 2.5 0 0 0 3 8.4 26 26 0 0 0 2.6 12c0 1.3.1 2.6.4 3.6a2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.2.4 7.2.4s5.7 0 7.2-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1 .4-2.3.4-3.6s-.1-2.6-.4-3.6zM10.2 14.8V9.2L15 12l-4.8 2.8z"
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm6-1.1a1.1 1.1 0 1 0 1.1 1.1 1.1 1.1 0 0 0-1.1-1.1zM12 9a3 3 0 1 1-3 3 3 3 0 0 1 3-3z"
        />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M17.3 3h3.2l-7 8.1L21.5 21h-6.3l-4.9-6.4L4.8 21H1.6l7.5-8.6L2.5 3h6.5l4.4 5.8L17.3 3zm-1.1 16.2h1.8L7.1 4.8H5.2l11 14.4z"
        />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/918727914446',
    icon: (
      <svg viewBox="0 0 24 24" className={iconClass} aria-hidden>
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm5.2 14.3c-.2.6-1.2 1.1-1.7 1.1s-1.1.3-3.4-1.4-3.9-3.9-.4-1.2.9-1.2.6 0 .9-.1.3-.5.2-.7-.2-.4-1.2-1.5-.5-.7-.1-.9.3-.6.3-.4.1-.7-.1-1-.2-.4-1.1-2.7-1.5-3.7-.4-1-.8-.9-1.1-.9h-.9c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.2 1.3 3.7 2.3 3.2 5.3 4.6 6.5 5.1 1.2.5 1.9.4 2.6-.2.6-.6 1.4-1.5 1.6-1.9.2-.4.2-.7-.1-1.1z"
        />
      </svg>
    ),
  },
];
