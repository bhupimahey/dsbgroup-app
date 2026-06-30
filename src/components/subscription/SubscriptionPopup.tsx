'use client';

import { useEffect, useState } from 'react';

type Category = { id: string; name: string; slug: string };

export default function SubscriptionPopup() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState('WEEKLY');
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dismissed = document.cookie.includes('dsb_sub_dismiss=1');
    if (dismissed) return;

    const timer = setTimeout(() => setOpen(true), 5000);
    fetch('/api/service-categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories ?? []))
      .catch(() => {});

    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    document.cookie = 'dsb_sub_dismiss=1; path=/; max-age=604800';
    setOpen(false);
  }

  function toggleCategory(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, frequency, serviceCategoryIds: selected }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      setMessage(data.message ?? 'Check your email to confirm your subscription.');
    } else {
      setMessage(data.error ?? 'Something went wrong.');
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Stay informed</h2>
            <p className="mt-1 text-sm text-slate-600">
              Subscribe to legal updates by practice area. Confirm via email before we add you.
            </p>
          </div>
          <button type="button" onClick={dismiss} className="text-slate-400 hover:text-slate-600">
            ✕
          </button>
        </div>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="WEEKLY">Weekly</option>
            <option value="TWICE_WEEKLY">Twice per week</option>
            <option value="MONTHLY">Monthly</option>
          </select>
          <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border border-slate-200 p-3">
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={selected.includes(cat.id)}
                  onChange={() => toggleCategory(cat.id)}
                />
                {cat.name}
              </label>
            ))}
          </div>
          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
          <button
            type="submit"
            disabled={loading || selected.length === 0}
            className="w-full rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? 'Submitting…' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}
