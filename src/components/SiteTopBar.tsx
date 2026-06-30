import { SITE_CONTACT } from '@/lib/site/nav-links';

export default function SiteTopBar() {
  return (
    <div className="border-b border-white/10 bg-[#05162e] text-xs text-white/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={SITE_CONTACT.phoneHref} className="hover:text-[var(--dsb-gold)]">
            {SITE_CONTACT.phone}
          </a>
          <a href={SITE_CONTACT.emailHref} className="hover:text-[var(--dsb-gold)]">
            {SITE_CONTACT.email}
          </a>
        </div>
        <p className="hidden sm:block">Legal advisory across India since 1967</p>
      </div>
    </div>
  );
}
