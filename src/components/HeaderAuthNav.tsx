import Link from 'next/link';
import type { UserRole } from '@/generated/prisma/client';
import LogoutButton from '@/components/LogoutButton';
import LogoutIcon from '@/components/icons/LogoutIcon';
import SignInIcon from '@/components/icons/SignInIcon';
import SignUpIcon from '@/components/icons/SignUpIcon';
import { isStaffRole } from '@/lib/auth-utils';

type HeaderAuthNavProps = {
  user: { name?: string | null; email: string; role: UserRole } | null;
};

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="currentColor"
        d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-4.97 0-9 2.27-9 5.06V21h18v-1.69c0-2.79-4.03-5.06-9-5.06Z"
      />
    </svg>
  );
}

export default function HeaderAuthNav({ user }: HeaderAuthNavProps) {
  if (!user) {
    return (
      <div className="theme-header-account-icons" aria-label="Account">
        <Link
          href="/login"
          className="theme-header-social-icon"
          aria-label="Sign in"
          title="Sign in"
        >
          <SignInIcon />
        </Link>
        <Link
          href="/register"
          className="theme-header-social-icon"
          aria-label="Sign up"
          title="Sign up"
        >
          <SignUpIcon />
        </Link>
      </div>
    );
  }

  const dashboardHref = isStaffRole(user.role) ? '/admin' : '/account';
  const dashboardLabel = isStaffRole(user.role) ? 'Admin dashboard' : 'My account';

  return (
    <div className="theme-header-account-icons" aria-label="Account">
      <Link
        href={dashboardHref}
        className="theme-header-social-icon"
        aria-label={dashboardLabel}
        title={dashboardLabel}
      >
        <UserIcon />
      </Link>
      <LogoutButton className="theme-header-social-icon" aria-label="Logout" title="Logout">
        <LogoutIcon />
      </LogoutButton>
    </div>
  );
}
