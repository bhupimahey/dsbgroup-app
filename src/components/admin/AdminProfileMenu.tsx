'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AdminSignOutButton from '@/components/admin/AdminSignOutButton';

type Props = {
  name: string;
  email?: string | null;
};

export default function AdminProfileMenu({ name, email }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg border py-1 pl-1 pr-2 transition sm:pr-2.5"
        style={{ borderColor: 'var(--z-border)', background: '#fff' }}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border text-xs font-bold uppercase text-white"
          style={{ background: 'var(--z-primary)', borderColor: 'var(--z-accent)' }}
        >
          {name.charAt(0)}
        </span>
        <span className="hidden text-left sm:block">
          <span className="block max-w-[100px] truncate text-xs font-semibold" style={{ color: 'var(--z-text)' }}>
            {name}
          </span>
          <span className="block text-[10px]" style={{ color: 'var(--z-text-muted)' }}>
            Admin
          </span>
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-lg border bg-white py-1 shadow-lg"
          style={{ borderColor: 'var(--z-border)' }}
        >
          <div className="border-b px-4 py-3" style={{ borderColor: 'var(--z-border)' }}>
            <p className="truncate text-sm font-semibold" style={{ color: 'var(--z-text)' }}>
              {name}
            </p>
            {email ? (
              <p className="truncate text-xs" style={{ color: 'var(--z-text-muted)' }}>
                {email}
              </p>
            ) : null}
          </div>
          <Link
            href="/"
            role="menuitem"
            className="flex items-center gap-2 px-4 py-2.5 text-sm transition hover:bg-[#f9fafb]"
            style={{ color: 'var(--z-text)' }}
            onClick={() => setOpen(false)}
          >
            View public site
          </Link>
          <Link
            href="/admin"
            role="menuitem"
            className="flex items-center gap-2 px-4 py-2.5 text-sm transition hover:bg-[#f9fafb]"
            style={{ color: 'var(--z-text)' }}
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <div className="border-t px-4 py-2" style={{ borderColor: 'var(--z-border)' }}>
            <AdminSignOutButton />
          </div>
        </div>
      ) : null}
    </div>
  );
}
