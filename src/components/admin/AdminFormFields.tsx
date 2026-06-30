import { adminHint, adminInput, adminLabel } from '@/components/admin/ui/admin-styles';

type AdminFieldProps = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password';
  hint?: string;
  placeholder?: string;
};

export function AdminField({
  label,
  name,
  defaultValue = '',
  required,
  type = 'text',
  hint,
  placeholder,
}: AdminFieldProps) {
  return (
    <div>
      <label htmlFor={name} className={adminLabel} style={{ color: 'var(--z-text)' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className={adminInput}
      />
      {hint ? (
        <p className={adminHint} style={{ color: 'var(--z-text-muted)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type AdminTextareaProps = {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
};

export function AdminTextarea({
  label,
  name,
  defaultValue = '',
  required,
  rows = 8,
  hint,
}: AdminTextareaProps) {
  return (
    <div>
      <label htmlFor={name} className={adminLabel} style={{ color: 'var(--z-text)' }}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        className={`${adminInput} font-mono`}
      />
      {hint ? (
        <p className={adminHint} style={{ color: 'var(--z-text-muted)' }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type AdminCheckboxProps = {
  label: string;
  name: string;
  defaultChecked?: boolean;
};

export function AdminCheckbox({ label, name, defaultChecked }: AdminCheckboxProps) {
  return (
    <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--z-text)' }}>
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="rounded" />
      {label}
    </label>
  );
}

export function AdminSelect({
  label,
  name,
  defaultValue,
  required,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label htmlFor={name} className={adminLabel} style={{ color: 'var(--z-text)' }}>
        {label}
      </label>
      <select id={name} name={name} defaultValue={defaultValue} required={required} className={adminInput}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
