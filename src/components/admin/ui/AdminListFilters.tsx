import { AdminButtonLink } from '@/components/admin/ui/AdminButton';
import { adminInput, adminLabel } from '@/components/admin/ui/admin-styles';

export type AdminListFilterField =
  | { type: 'search'; name: string; label: string; placeholder?: string }
  | {
      type: 'select';
      name: string;
      label: string;
      options: readonly { value: string; label: string }[];
    };

type Props = {
  basePath: string;
  fields: AdminListFilterField[];
  values: Record<string, string | undefined>;
};

export default function AdminListFilters({ basePath, fields, values }: Props) {
  const hasFilters = fields.some((field) => values[field.name]?.trim());

  return (
    <div className="zynix-card mb-6">
      <div className="zynix-card-body">
        <form method="get" action={basePath} className="flex flex-wrap items-end gap-4">
          {fields.map((field) => (
            <div key={field.name} className="min-w-[11rem] flex-1 sm:max-w-xs">
              <label htmlFor={`filter-${field.name}`} className={adminLabel} style={{ color: 'var(--z-text)' }}>
                {field.label}
              </label>
              {field.type === 'search' ? (
                <input
                  id={`filter-${field.name}`}
                  name={field.name}
                  type="search"
                  defaultValue={values[field.name] ?? ''}
                  placeholder={field.placeholder}
                  className={adminInput}
                />
              ) : (
                <select
                  id={`filter-${field.name}`}
                  name={field.name}
                  defaultValue={values[field.name] ?? ''}
                  className={adminInput}
                >
                  {field.options.map((option) => (
                    <option key={option.value || 'all'} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-2">
            <button type="submit" className="zynix-btn-primary">
              Apply filters
            </button>
            {hasFilters ? (
              <AdminButtonLink href={basePath} variant="secondary">
                Clear
              </AdminButtonLink>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
