type SignInIconProps = {
  className?: string;
};

export default function SignInIcon({ className = 'h-4 w-4' }: SignInIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 5 12 10 7" />
      <line x1="5" y1="12" x2="15" y2="12" />
    </svg>
  );
}
