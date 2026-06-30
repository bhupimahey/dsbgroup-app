'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
};

type Frequency = 'WEEKLY' | 'TWICE_WEEKLY' | 'MONTHLY';

type SubscribeInterestModalProps = {
  open: boolean;
  onClose: () => void;
  email: string;
  title?: string;
  subtitle?: string;
  frequency: Frequency;
  onFrequencyChange: (frequency: Frequency) => void;
  categories: ServiceCategory[];
  selectedCategoryIds: string[];
  onToggleCategory: (id: string) => void;
  loading: boolean;
  message: string;
  canSubmit: boolean;
  onSubmit: () => void;
  submitLabel?: string;
};

export default function SubscribeInterestModal({
  open,
  onClose,
  email,
  title = 'Choose your interests',
  subtitle,
  frequency,
  onFrequencyChange,
  categories,
  selectedCategoryIds,
  onToggleCategory,
  loading,
  message,
  canSubmit,
  onSubmit,
  submitLabel = 'Confirm Subscribe',
}: SubscribeInterestModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="theme-subscribe-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="theme-subscribe-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-interest-title"
      >
        <div className="theme-subscribe-modal-head">
          <div>
            <h3 id="subscribe-interest-title">{title}</h3>
            <p>
              {subtitle ?? (
                <>
                  Select the practice areas you want updates for:{' '}
                  <strong>{email}</strong>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            className="theme-subscribe-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <label className="theme-subscribe-modal-frequency">
          Frequency
          <select
            value={frequency}
            onChange={(event) => onFrequencyChange(event.target.value as Frequency)}
          >
            <option value="WEEKLY">Weekly</option>
            <option value="TWICE_WEEKLY">Twice weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </label>

        <div className="theme-subscribe-modal-list">
          {categories.map((category) => (
            <label key={category.id}>
              <input
                type="checkbox"
                checked={selectedCategoryIds.includes(category.id)}
                onChange={() => onToggleCategory(category.id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
          {categories.length === 0 ? (
            <p className="theme-subscribe-modal-empty">No services available yet.</p>
          ) : null}
        </div>

        {message ? <p className="theme-subscribe-modal-error">{message}</p> : null}

        <div className="theme-subscribe-modal-actions">
          <button type="button" className="theme-subscribe-modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="theme-subscribe-modal-submit"
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            {loading ? 'Subscribing...' : submitLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
