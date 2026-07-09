'use client';

import UserSpinner from '@/components/auth/UserSpinner';

type UserBusyOverlayProps = {
  active: boolean;
  message?: string;
};

export default function UserBusyOverlay({ active, message = 'Please wait…' }: UserBusyOverlayProps) {
  if (!active) return null;

  return (
    <div className="user-submit-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="user-submit-overlay-panel">
        <UserSpinner className="user-spinner user-spinner--overlay" />
        <p>{message}</p>
      </div>
    </div>
  );
}
