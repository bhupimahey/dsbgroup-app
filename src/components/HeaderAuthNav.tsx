import Link from 'next/link';
import { signOutAction } from '@/lib/auth/sign-out-action';

type HeaderAuthNavProps = {
  user: { name?: string | null; email: string } | null;
};

export default function HeaderAuthNav({ user }: HeaderAuthNavProps) {
  if (!user) {
    return (
      <nav className="theme-header-auth" aria-label="Account">
        <Link href="/login" className="theme-header-auth-link">
          Login
        </Link>
        <Link href="/register" className="theme-header-auth-link theme-header-auth-link--primary">
          Register
        </Link>
      </nav>
    );
  }

  return (
    <nav className="theme-header-auth" aria-label="Account">
      <Link href="/account" className="theme-header-auth-link theme-header-auth-link--primary">
        My account
      </Link>
      <form action={signOutAction}>
        <button type="submit" className="theme-header-auth-button">
          Sign out
        </button>
      </form>
    </nav>
  );
}
