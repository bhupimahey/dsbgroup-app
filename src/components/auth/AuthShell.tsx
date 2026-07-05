import type { ReactNode } from 'react';
import DsbLogo from '@/components/brand/DsbLogo';

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthShell({ badge, title, description, children, footer }: AuthShellProps) {
  return (
    <div className="user-auth-page bg-[#f0f2f5] py-12 sm:py-16">
      <div className="mx-auto max-w-md px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-[#c5a059]/30 bg-[#05162e] px-6 py-8 text-center">
            <div className="flex justify-center">
              <DsbLogo height={48} priority onDark />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#c5a059]">{badge}</p>
            <h1 className="mt-2 text-2xl font-bold text-white">{title}</h1>
            <p className="mt-2 text-sm text-white/75">{description}</p>
          </div>
          <div className="px-6 py-8">{children}</div>
          {footer ? <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-center text-sm text-slate-600">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}
