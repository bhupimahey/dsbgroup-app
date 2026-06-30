'use client';



import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { ADMIN_NAV_LINKS } from '@/lib/admin/nav-links';

import AdminNavIcon from '@/components/admin/AdminNavIcon';

import DsbLogo from '@/components/brand/DsbLogo';



type Props = {

  open: boolean;

  collapsed: boolean;

  onClose: () => void;

  isAdmin?: boolean;

};



const NAV_GROUPS = [

  { title: 'Main', hrefs: ['/admin'] },

  {

    title: 'Content',

    hrefs: ['/admin/pages', '/admin/blog', '/admin/articles', '/admin/categories', '/admin/service-categories'],

  },

  { title: 'Organization', hrefs: ['/admin/team', '/admin/faq', '/admin/offices'] },

  { title: 'Communications', hrefs: ['/admin/newsletters', '/admin/subscribers', '/admin/users', '/admin/staff', '/admin/leads'] },

  { title: 'Reports', hrefs: ['/admin/analytics'] },

];



function isActive(pathname: string, href: string) {

  if (href === '/admin') return pathname === '/admin';

  return pathname === href || pathname.startsWith(`${href}/`);

}



export default function AdminSidebar({ open, collapsed, onClose, isAdmin = false }: Props) {

  const pathname = usePathname();

  const links = ADMIN_NAV_LINKS.filter((link) => !link.adminOnly || isAdmin);



  return (

    <>

      <button

        type="button"

        aria-label="Close navigation menu"

        onClick={onClose}

        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${

          open ? 'opacity-100' : 'pointer-events-none opacity-0'

        }`}

      />



      <aside

        className={`admin-zynix-sidebar-scroll zynix-sidebar fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-[width,transform] duration-300 ease-out lg:translate-x-0 ${

          collapsed ? 'lg:w-[var(--z-sidebar-collapsed)]' : 'lg:w-[var(--z-sidebar-width)]'

        } w-[var(--z-sidebar-width)] max-w-[85vw] ${open ? 'translate-x-0' : '-translate-x-full'}`}

        aria-label="Admin navigation"

      >

        <div className="zynix-sidebar-brand relative flex h-[var(--z-header-height)] shrink-0 items-center border-b px-4">

          <Link href="/admin" onClick={onClose} className="flex min-w-0 items-center gap-3">

            <DsbLogo height={32} iconOnly={collapsed} onDark priority />

            {!collapsed ? (

              <span className="min-w-0 leading-tight">

                <span className="block truncate text-[14px] font-bold text-white">DSB Law Group</span>

                <span className="block truncate text-[11px]" style={{ color: 'var(--z-sidebar-muted)' }}>

                  Admin Dashboard

                </span>

              </span>

            ) : null}

          </Link>

        </div>



        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3">

          {NAV_GROUPS.map((group) => {

            const groupLinks = links.filter((link) => group.hrefs.includes(link.href));

            if (groupLinks.length === 0) return null;



            return (

              <div key={group.title} className="mb-1">

                {!collapsed ? <p className="zynix-menu-label">{group.title}</p> : null}

                <ul>

                  {groupLinks.map((link) => {

                    const active = isActive(pathname, link.href);

                    return (

                      <li key={link.href}>

                        <Link

                          href={link.href}

                          prefetch

                          onClick={onClose}

                          title={collapsed ? link.label : undefined}

                          className={`zynix-menu-link ${active ? 'is-active' : ''} ${

                            collapsed ? 'justify-center !px-2.5 !mx-1.5' : ''

                          }`}

                          aria-current={active ? 'page' : undefined}

                        >

                          <AdminNavIcon

                            icon={link.icon}

                            className={`zynix-menu-icon ${collapsed ? 'h-5 w-5' : ''}`}

                          />

                          {!collapsed ? <span className="truncate">{link.label}</span> : null}

                        </Link>

                      </li>

                    );

                  })}

                </ul>

              </div>

            );

          })}

        </nav>

      </aside>

    </>

  );

}


