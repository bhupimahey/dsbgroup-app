'use client';

import { useMemo, useState } from 'react';
import { stripHtml } from '@/lib/team/bio-html';

type FaqItem = { id: string; question: string; answer: string };
type FaqCategory = { id: string; name: string; items: FaqItem[] };

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) || stripHtml(item.answer).toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search FAQs…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm"
      />
      <div className="mt-8 space-y-8">
        {filtered.map((cat) => (
          <section key={cat.id}>
            <h2 className="text-lg font-medium text-slate-900">{cat.name}</h2>
            <div className="mt-4 space-y-2">
              {cat.items.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-900"
                    >
                      {item.question}
                      <span className="text-slate-400">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen ? (
                      <div
                        className="cms-html border-t border-slate-100 px-4 py-3 text-sm text-slate-600"
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-8 text-slate-500">No matching questions found.</p>
      ) : null}
    </div>
  );
}
