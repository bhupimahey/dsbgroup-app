export type SubscribeSuccessStatus =
  | 'already_subscribed'
  | 'preferences_updated'
  | 'confirmation_sent'
  | 'reactivated'
  | 'verification_resent';

export type SubscribeResult =
  | { ok: false; error: string }
  | { ok: true; message: string; status: SubscribeSuccessStatus };

export type SubscriberCheckResult =
  | { ok: false; error: string }
  | { ok: true; action: 'pick_services' }
  | { ok: true; action: 'done'; message: string };

export function sameIdSet(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const left = [...a].sort();
  const right = [...b].sort();
  return left.every((value, index) => value === right[index]);
}

export function subscribeStatusMessage(status: SubscribeSuccessStatus) {
  switch (status) {
    case 'already_subscribed':
      return 'This email is already subscribed with the selected interests.';
    case 'preferences_updated':
      return 'Your subscription preferences have been updated.';
    case 'reactivated':
      return 'Your subscription has been reactivated with the selected interests.';
    case 'confirmation_sent':
      return 'Check your email to confirm your subscription.';
    case 'verification_resent':
      return 'This email is awaiting confirmation. We have sent the verification link again — please check your inbox.';
  }
}
