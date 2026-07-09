'use client';

import { useFormStatus } from 'react-dom';
import UserBusyOverlay from '@/components/auth/UserBusyOverlay';

type UserFormPendingOverlayProps = {
  message?: string;
};

export default function UserFormPendingOverlay({
  message = 'Please wait…',
}: UserFormPendingOverlayProps) {
  const { pending } = useFormStatus();
  return <UserBusyOverlay active={pending} message={message} />;
}
