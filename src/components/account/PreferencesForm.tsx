'use client';

import { updatePreferencesAction, deactivateAccountAction } from '@/lib/account/actions';

type Category = { id: string; name: string };
type Preference = { serviceCategoryId: string; frequency: string };

export default function PreferencesForm({
  categories,
  preferences,
  defaultFrequency,
}: {
  categories: Category[];
  preferences: Preference[];
  defaultFrequency: string;
}) {
  const selected = new Set(preferences.map((p) => p.serviceCategoryId));

  return (
    <div className="space-y-6">
      <form action={updatePreferencesAction} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="font-medium text-slate-900">Newsletter preferences</h2>
        <div>
          <label className="block text-sm font-medium text-slate-700">Delivery frequency</label>
          <select
            name="frequency"
            defaultValue={defaultFrequency}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="WEEKLY">Weekly</option>
            <option value="TWICE_WEEKLY">Twice per week</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">Practice areas</p>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                name="serviceCategoryIds"
                value={cat.id}
                defaultChecked={selected.has(cat.id)}
              />
              {cat.name}
            </label>
          ))}
        </div>
        <button type="submit" className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
          Save preferences
        </button>
      </form>

      <form action={deactivateAccountAction}>
        <button type="submit" className="text-sm text-red-700 hover:underline">
          Deactivate my account
        </button>
      </form>
    </div>
  );
}
