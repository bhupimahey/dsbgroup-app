import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function AdminBackLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      prefetch
      className="mb-4 inline-flex items-center gap-1 text-sm font-medium transition hover:underline"
      style={{ color: 'var(--z-accent-dark)' }}
    >
      <span aria-hidden>←</span>
      {children}
    </Link>
  );
}
