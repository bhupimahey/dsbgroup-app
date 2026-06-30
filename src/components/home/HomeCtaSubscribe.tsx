'use client';

import SubscribeInterestModal from '@/components/subscription/SubscribeInterestModal';
import { useSubscribeFlow } from '@/components/subscription/useSubscribeFlow';

export default function HomeCtaSubscribe() {
  const {
    state,
    canSubmit,
    handleEmailSubmit,
    submitSubscription,
    toggleCategory,
    closeModal,
    setFrequency,
  } = useSubscribeFlow();

  async function onEmailSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email')?.toString() ?? '';
    await handleEmailSubmit(email);
  }

  return (
    <>
      <form className="home2-cta-form" onSubmit={onEmailSubmit}>
        <input type="email" name="email" placeholder="Email Address" required disabled={state.checking} />
        <button type="submit" disabled={state.checking}>
          {state.checking ? 'Checking…' : 'Subscribe'}
        </button>
      </form>

      {state.message && !state.open ? (
        <p className="mt-3 text-sm text-white/90">{state.message}</p>
      ) : null}

      <SubscribeInterestModal
        open={state.open}
        onClose={closeModal}
        email={state.email}
        frequency={state.frequency}
        onFrequencyChange={setFrequency}
        categories={state.categories}
        selectedCategoryIds={state.selectedCategoryIds}
        onToggleCategory={toggleCategory}
        loading={state.loading}
        message={state.open ? state.message : ''}
        canSubmit={canSubmit}
        onSubmit={submitSubscription}
      />
    </>
  );
}
