'use client';

import Link from 'next/link';
import SubscribeInterestModal from '@/components/subscription/SubscribeInterestModal';
import { useSubscribeFlow } from '@/components/subscription/useSubscribeFlow';

export default function FooterSubscribeForm({ variant = 'inline' }: { variant?: 'inline' | 'boxed' }) {
  const {
    state,
    canSubmit,
    handleEmailSubmit,
    submitSubscription,
    toggleCategory,
    closeModal,
    setEmail,
    setFrequency,
  } = useSubscribeFlow();

  async function onEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await handleEmailSubmit(state.email);
  }

  const messageClass =
    variant === 'boxed' ? 'theme-footer-subscribe-message' : 'mt-2 text-xs text-white/80';

  return (
    <>
      <form
        className={variant === 'boxed' ? 'theme-footer-subscribe-form' : 'theme-newsletter-form'}
        onSubmit={onEmailSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={state.email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={state.checking}
        />
        <button type="submit" disabled={state.checking}>
          {state.checking ? 'Checking…' : 'Submit Now'}
        </button>
      </form>
      {state.message ? (
        <p className={messageClass}>
          {state.message}
          {state.accountUrl ? (
            <>
              {' '}
              <Link href={state.accountUrl} className="theme-footer-subscribe-account-link">
                Open account
              </Link>
            </>
          ) : null}
        </p>
      ) : null}

      <SubscribeInterestModal
        open={state.open}
        onClose={closeModal}
        email={state.email}
        title="Choose your service interests"
        subtitle="We will send newsletters only for selected practice areas."
        frequency={state.frequency}
        onFrequencyChange={setFrequency}
        categories={state.categories}
        selectedCategoryIds={state.selectedCategoryIds}
        onToggleCategory={toggleCategory}
        loading={state.loading}
        message={state.open ? state.message : ''}
        canSubmit={canSubmit}
        onSubmit={submitSubscription}
        submitLabel="Confirm Subscription"
      />
    </>
  );
}
