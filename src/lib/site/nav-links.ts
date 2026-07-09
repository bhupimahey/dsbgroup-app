export type NavLink = { href: string; label: string };
export type NavItem =
  | (NavLink & { children?: undefined })
  | { label: string; href?: string; children: NavLink[] };

/** Primary header navigation — matches dsblawgroup.com structure. */
export const MAIN_NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  {
    label: 'About Us',
    children: [
      { href: '/about', label: 'About Us' },
      { href: '/team', label: 'Our Team' },
      { href: '/dinesh-gupta-co', label: 'Dinesh Gupta & Co.' },
      { href: '/achievements', label: 'Achievements' },
    ],
  },
  { href: '/services', label: 'Services' },
  {
    label: "NBFC's HR & Labour Laws",
    children: [
      { href: '/nbfc', label: 'NBFC' },
      { href: '/hr-labour-law/about', label: 'About HR & Labour Law' },
      { href: '/hr-labour-law/new-labour-codes', label: 'New Labour Codes Compliance' },
    ],
  },
  { href: '/ucbs', label: "UCB's" },
  {
    label: 'Resources',
    children: [
      { href: '/resources/research', label: 'Research' },
      { href: '/newsletters', label: 'Our Newsletters' },
      { href: '/resources/podcasts', label: 'Podcasts' },
      { href: '/resources/video-lectures', label: 'Video Lectures' },
    ],
  },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blogs' },
  { href: '/contact', label: 'Contact' },
];

export const FOOTER_LINKS: NavLink[] = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Our Team' },
  { href: '/blog', label: 'Blog' },
  { href: '/newsletters', label: 'Newsletters' },
  { href: '/contact', label: 'Contact' },
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/disclaimer', label: 'Disclaimer' },
  { href: '/careers', label: 'Careers' },
];

export const SITE_CONTACT = {
  phone: '+91 87279-14446',
  phoneHref: 'tel:+918727914446',
  email: 'info@dsblawgroup.com',
  emailHref: 'mailto:info@dsblawgroup.com',
} as const;

export const HEAD_OFFICE = {
  line1: 'Raj Chambers: 5-6 Hind Samachar Street',
  line2: 'Jalandhar -144001',
  full: 'Raj Chambers: 5-6 Hind Samachar Street, Jalandhar -144001',
} as const;

export const FOOTER_SERVICE_LINKS: NavLink[] = [
  { href: '/services', label: 'Our Services' },
  { href: '/nbfc', label: 'NBFC' },
  { href: '/hr-labour-law/about', label: 'HR & Labour Law' },
  { href: '/ucbs', label: "UCB's" },
  { href: '/pages/banking-finance', label: 'Banking & Finance' },
  { href: '/pages/corporate-law', label: 'Corporate Law' },
];

export const FOOTER_USEFUL_LINKS: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Our Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/login', label: 'Login' },
  { href: '/register', label: 'Register' },
];

/** Office cities shown in the top bar locations strip. */
export const OFFICE_LOCATIONS = [
  'Jalandhar',
  'Ludhiana',
  'Mumbai',
  'New Delhi',
  'Pune',
  'Gurugram',
  'Jaipur',
] as const;

/** Returns true when a nav href matches the current pathname. */
export function isNavHrefActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  if (href === '/services') {
    return pathname === '/services' || pathname.startsWith('/pages/');
  }
  if (href === '/blog') {
    return pathname === '/blog' || pathname.startsWith('/blog/');
  }
  if (href === '/testimonials') {
    return pathname === '/testimonials';
  }
  if (href === '/newsletters') {
    return pathname === '/newsletters' || pathname.startsWith('/newsletters/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isNavItemActive(
  pathname: string,
  item: NavItem,
): boolean {
  if ('children' in item && item.children) {
    if (item.href && isNavHrefActive(pathname, item.href)) return true;
    return item.children.some((child) => isNavHrefActive(pathname, child.href));
  }
  return item.href ? isNavHrefActive(pathname, item.href) : false;
}
