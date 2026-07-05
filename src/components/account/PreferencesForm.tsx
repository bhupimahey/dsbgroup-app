import { updatePreferencesAction } from '@/lib/account/actions';
import { AUTH_BUTTON, AUTH_FIELD, AUTH_LABEL } from '@/components/auth/auth-classes';

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
    <form action={updatePreferencesAction} className="user-account-card">
      <h2 className="user-account-card-title">Newsletter preferences</h2>
      <p className="user-account-card-desc">
        Choose practice areas and how often you want legal updates by email.
      </p>

      <div className="mt-5">
        <label htmlFor="frequency" className={AUTH_LABEL}>
          Delivery frequency
        </label>
        <select id="frequency" name="frequency" defaultValue={defaultFrequency} className={AUTH_FIELD}>
          <option value="WEEKLY">Weekly</option>
          <option value="TWICE_WEEKLY">Twice per week</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </div>

      <div className="mt-5 space-y-2">
        <p className={AUTH_LABEL}>Practice areas</p>
        {categories.map((cat) => (
          <label
            key={cat.id}
            className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700"
          >
            <input
              type="checkbox"
              name="serviceCategoryIds"
              value={cat.id}
              defaultChecked={selected.has(cat.id)}
              className="accent-[#05162e]"
            />
            {cat.name}
          </label>
        ))}
      </div>

      <button type="submit" className={`${AUTH_BUTTON} mt-5 max-w-xs`}>
        Save preferences
      </button>
    </form>
  );
}
