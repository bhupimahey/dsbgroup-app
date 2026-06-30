import type { AdminNavLink } from '@/lib/admin/nav-links';

type Props = { icon: AdminNavLink['icon']; className?: string };

export default function AdminNavIcon({ icon, className = 'h-5 w-5' }: Props) {
  const stroke = 'currentColor';

  switch (icon) {
    case 'dashboard':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 13h6V4H4v9Zm0 7h6v-5H4v5Zm8 0h8v-9h-8v9Zm0-16v5h8V4h-8Z" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'pages':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M7 4h7l5 5v11a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M14 4v5h5M9 13h6M9 17h4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'posts':
    case 'blog':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 4h9l5 5v11H6V4Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M15 4v5h5M8 13h8M8 17h6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'articles':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 4h14v16H5V4Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M8 8h8M8 12h8M8 16h5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 16l3 3" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'categories':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 7h7V4H4v3Zm0 6h7v-3H4v3Zm0 6h7v-3H4v3Z" stroke={stroke} strokeWidth="1.5" />
          <path d="M14 7h6M14 13h6M14 19h6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'serviceCategories':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="8" height="8" rx="1" stroke={stroke} strokeWidth="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1" stroke={stroke} strokeWidth="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1" stroke={stroke} strokeWidth="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'team':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3" stroke={stroke} strokeWidth="1.5" />
          <path d="M4 20v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM14 20v-1a3 3 0 0 1 2.2-2.9" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'faq':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.5" />
          <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="17" r="0.75" fill={stroke} />
        </svg>
      );
    case 'offices':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 20V8l8-4 8 4v12H4Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 20v-6h6v6" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'newsletters':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="1" stroke={stroke} strokeWidth="1.5" />
          <path d="m3 7 9 6 9-6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'subscribers':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h10" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="18" cy="18" r="3" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );
    case 'users':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="3.5" stroke={stroke} strokeWidth="1.5" />
          <path d="M5 20v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'staff':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 3l8 4v6c0 3.5-2.5 5.5-8 8-5.5-2.5-8-4.5-8-8V7l8-4Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'leads':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 4h8l4 4v12H4V8l4-4Z" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 4v4h8V4M8 13h8M8 17h5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'analytics':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 19V5M4 19h16" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 16V11M12 16V7M16 16v-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
