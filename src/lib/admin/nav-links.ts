export type AdminNavLink = {

  href: string;

  label: string;

  description?: string;

  icon:

    | 'dashboard'

    | 'pages'
    | 'posts'
    | 'blog'

    | 'articles'

    | 'categories'

    | 'serviceCategories'

    | 'team'

    | 'faq'

    | 'testimonials'

    | 'offices'

    | 'newsletters'

    | 'subscribers'

    | 'users'

    | 'staff'

    | 'leads'

    | 'analytics';

  adminOnly?: boolean;

};



export const ADMIN_NAV_LINKS: AdminNavLink[] = [

  { href: '/admin', label: 'Dashboard', description: 'Overview & quick stats', icon: 'dashboard' },

  { href: '/admin/pages', label: 'Pages', description: 'Static CMS content', icon: 'pages' },

  { href: '/admin/blog', label: 'Blog', description: 'Public blog posts', icon: 'blog' },

  { href: '/admin/articles', label: 'Articles', description: 'Public & premium articles', icon: 'articles' },

  { href: '/admin/categories', label: 'Blog categories', description: 'Blog taxonomy', icon: 'categories' },

  {

    href: '/admin/service-categories',

    label: 'Service areas',

    description: 'Subscription & newsletter tags',

    icon: 'serviceCategories',

  },

  { href: '/admin/team', label: 'Team', description: 'Professional directory', icon: 'team' },

  { href: '/admin/faq', label: 'FAQ', description: 'Categorized questions', icon: 'faq' },

  {
    href: '/admin/testimonials',
    label: 'Testimonials',
    description: 'Video and written client reviews',
    icon: 'testimonials',
  },

  { href: '/admin/offices', label: 'Offices', description: 'Office locations', icon: 'offices' },

  { href: '/admin/newsletters', label: 'Newsletters', description: 'Compose & queue sends', icon: 'newsletters' },

  { href: '/admin/subscribers', label: 'Subscribers', description: 'Newsletter subscribers', icon: 'subscribers' },

  { href: '/admin/users', label: 'Client accounts', description: 'Registered site users', icon: 'users' },

  { href: '/admin/staff', label: 'Staff', description: 'Admin & editor accounts', icon: 'staff', adminOnly: true },

  { href: '/admin/leads', label: 'Leads', description: 'Contact form inbox', icon: 'leads' },

  { href: '/admin/analytics', label: 'Analytics', description: 'Growth & email metrics', icon: 'analytics' },

];


