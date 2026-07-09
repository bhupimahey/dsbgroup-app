type UserSpinnerProps = {
  className?: string;
};

export default function UserSpinner({ className = 'user-spinner' }: UserSpinnerProps) {
  return <span className={className} aria-hidden />;
}
