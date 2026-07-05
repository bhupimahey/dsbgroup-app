import type { ReactNode } from 'react';
import DsbLogo from '@/components/brand/DsbLogo';

type AuthShellProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  perks?: string[];
};

export default function AuthShell({
  badge,
  title,
  description,
  children,
  footer,
  perks,
}: AuthShellProps) {
  const hasAside = Boolean(perks?.length);

  return (
    <div className="user-auth-page">
      <div className={`user-auth-wrap${hasAside ? ' user-auth-wrap--split' : ''}`}>
        {hasAside ? (
          <aside className="user-auth-aside" aria-label="Member benefits">
            <div className="user-auth-aside-pattern" aria-hidden />
            <div className="user-auth-aside-inner">
              <DsbLogo height={44} priority onDark />
              <p className="user-auth-aside-label">Client portal</p>
              <h2 className="user-auth-aside-title">Your legal intelligence hub</h2>
              <p className="user-auth-aside-desc">
                Create a free account to unlock premium insights and tailored newsletter updates from DSB Law Group.
              </p>
              <ul className="user-auth-perks">
                {perks!.map((perk) => (
                  <li key={perk}>
                    <span className="user-auth-perk-icon" aria-hidden>
                      ✓
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        ) : null}

        <div className="user-auth-card">
          <div className="user-auth-card-head">
            {!hasAside ? (
              <div className="flex justify-center">
                <DsbLogo height={48} priority onDark />
              </div>
            ) : null}
            <p className="user-auth-card-badge">{badge}</p>
            <h1 className="user-auth-card-title">{title}</h1>
            <p className="user-auth-card-desc">{description}</p>
          </div>
          <div className="user-auth-card-body">{children}</div>
          {footer ? <div className="user-auth-card-footer">{footer}</div> : null}
        </div>
      </div>
    </div>
  );
}

export const REGISTER_PERKS = [
  'Read premium articles and formal legal insights',
  'Choose practice areas for newsletter updates',
  'Manage profile, password, and preferences anytime',
  'Email verification keeps your account secure',
] as const;
