import { AUTH_FIELD, AUTH_LABEL } from '@/components/auth/auth-classes';

export type NewsletterCategory = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: NewsletterCategory[];
  defaultFrequency?: 'WEEKLY' | 'TWICE_WEEKLY' | 'MONTHLY';
  selectedCategoryIds?: string[];
  compact?: boolean;
  hint?: string;
};

export default function NewsletterInterestFields({
  categories,
  defaultFrequency = 'WEEKLY',
  selectedCategoryIds = [],
  compact = false,
  hint = 'Select at least one area. You can change these anytime from your profile after signing in.',
}: Props) {
  const selected = new Set(selectedCategoryIds);
  const listClass = compact
    ? 'user-newsletter-interest-list user-newsletter-interest-list--compact'
    : 'user-newsletter-interest-list';

  return (
    <div className="user-newsletter-interest-fields">
      <div>
        <label htmlFor="newsletter-frequency" className={AUTH_LABEL}>
          Delivery frequency
        </label>
        <select
          id="newsletter-frequency"
          name="frequency"
          defaultValue={defaultFrequency}
          className={AUTH_FIELD}
        >
          <option value="WEEKLY">Weekly</option>
          <option value="TWICE_WEEKLY">Twice per week</option>
          <option value="MONTHLY">Monthly</option>
        </select>
      </div>

      <div className="mt-4">
        <p className={AUTH_LABEL}>Practice areas</p>
        <p className="user-newsletter-interest-hint">{hint}</p>
        <div className={listClass}>
          {categories.map((category) => (
            <label key={category.id} className="user-newsletter-interest-item">
              <input
                type="checkbox"
                name="serviceCategoryIds"
                value={category.id}
                defaultChecked={selected.has(category.id)}
                className="accent-[#05162e]"
              />
              <span>{category.name}</span>
            </label>
          ))}
          {categories.length === 0 ? (
            <p className="text-sm text-slate-500">No practice areas are available yet.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
