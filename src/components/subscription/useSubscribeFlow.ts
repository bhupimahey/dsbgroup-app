'use client';

import { useMemo, useState } from 'react';

type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
};

type SubscribeState = {
  open: boolean;
  email: string;
  frequency: 'WEEKLY' | 'TWICE_WEEKLY' | 'MONTHLY';
  selectedCategoryIds: string[];
  loading: boolean;
  checking: boolean;
  message: string;
  accountUrl: string | null;
  categories: ServiceCategory[];
};

const DEFAULT_STATE: SubscribeState = {
  open: false,
  email: '',
  frequency: 'WEEKLY',
  selectedCategoryIds: [],
  loading: false,
  checking: false,
  message: '',
  accountUrl: null,
  categories: [],
};

export function useSubscribeFlow() {
  const [state, setState] = useState<SubscribeState>(DEFAULT_STATE);

  const canSubmit = useMemo(
    () => Boolean(state.email) && state.selectedCategoryIds.length > 0 && !state.loading,
    [state.email, state.loading, state.selectedCategoryIds.length],
  );

  async function handleEmailSubmit(email: string) {
    const trimmed = email.trim();
    if (!trimmed) {
      setState((prev) => ({ ...prev, message: 'Please enter your email first.' }));
      return;
    }

    setState((prev) => ({ ...prev, email: trimmed, checking: true, message: '' }));

    try {
      const response = await fetch('/api/subscribe/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Could not check this email right now.');
      }

      if (result.action === 'done') {
        setState((prev) => ({
          ...prev,
          checking: false,
          open: false,
          selectedCategoryIds: [],
          message: result.message,
          accountUrl: result.accountUrl ?? null,
        }));
        return;
      }

      const categoriesResponse = await fetch('/api/service-categories', { cache: 'no-store' });
      const categoriesData = await categoriesResponse.json();

      setState((prev) => ({
        ...prev,
        checking: false,
        open: true,
        selectedCategoryIds: [],
        categories: categoriesData.categories ?? prev.categories,
        message: '',
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        checking: false,
        message: error instanceof Error ? error.message : 'Could not subscribe right now.',
      }));
    }
  }

  async function submitSubscription() {
    setState((prev) => ({ ...prev, loading: true, message: '' }));
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: state.email,
          frequency: state.frequency,
          serviceCategoryIds: state.selectedCategoryIds,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Subscription failed.');
      }

      setState((prev) => ({
        ...prev,
        loading: false,
        open: false,
        selectedCategoryIds: [],
        message: result.message ?? 'Check your email to confirm your subscription.',
        accountUrl: null,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        message: error instanceof Error ? error.message : 'Subscription failed.',
      }));
    }
  }

  function toggleCategory(id: string) {
    setState((prev) => ({
      ...prev,
      selectedCategoryIds: prev.selectedCategoryIds.includes(id)
        ? prev.selectedCategoryIds.filter((value) => value !== id)
        : [...prev.selectedCategoryIds, id],
    }));
  }

  function closeModal() {
    setState((prev) => ({ ...prev, open: false }));
  }

  function setEmail(email: string) {
    setState((prev) => ({ ...prev, email }));
  }

  function setFrequency(frequency: SubscribeState['frequency']) {
    setState((prev) => ({ ...prev, frequency }));
  }

  function clearMessage() {
    setState((prev) => ({ ...prev, message: '' }));
  }

  return {
    state,
    canSubmit,
    handleEmailSubmit,
    submitSubscription,
    toggleCategory,
    closeModal,
    setEmail,
    setFrequency,
    clearMessage,
  };
}
