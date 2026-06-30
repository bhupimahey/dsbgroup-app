'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import {
  createContext,
  useContext,
  useRef,
  useTransition,
  type FormEvent,
  type ReactNode,
} from 'react';
import { confirmAdminDelete } from '@/lib/admin/admin-confirm-delete';
import { AdminDeleteIcon, AdminEditIcon, AdminSpinner, AdminViewIcon } from '@/components/admin/ui/AdminIcons';

const DEFAULT_CONFIRM = 'Are you sure you want to delete this? This action cannot be undone.';

const iconBtn =
  'zynix-icon-action inline-flex h-8 w-8 items-center justify-center rounded-md transition disabled:cursor-wait disabled:opacity-60';

const ConfirmFormPendingContext = createContext(false);

type DeleteFormProps = {
  action: (formData: FormData) => Promise<void>;
  confirmTitle?: string;
  confirmMessage?: string;
  children: ReactNode;
};

export function AdminConfirmDeleteForm({
  action,
  confirmTitle = 'Confirm deletion',
  confirmMessage = DEFAULT_CONFIRM,
  children,
}: DeleteFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const confirmed = await confirmAdminDelete({
      title: confirmTitle,
      message: confirmMessage,
    });

    if (!confirmed) return;

    startTransition(() => {
      void action(new FormData(form));
    });
  }

  return (
    <ConfirmFormPendingContext.Provider value={isPending}>
      <form ref={formRef} onSubmit={handleSubmit}>
        {children}
      </form>
    </ConfirmFormPendingContext.Provider>
  );
}

function IconLink({
  href,
  label,
  icon,
  tone,
  external,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  tone: 'primary' | 'muted';
  external?: boolean;
}) {
  const color = tone === 'primary' ? 'var(--z-primary)' : 'var(--z-text-muted)';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={iconBtn}
        style={{ color }}
        title={label}
        aria-label={label}
      >
        {icon}
      </a>
    );
  }

  return (
    <Link
      href={href}
      prefetch
      className={iconBtn}
      style={{ color }}
      title={label}
      aria-label={label}
    >
      {icon}
    </Link>
  );
}

function DeleteIconButton({ label = 'Delete' }: { label?: string }) {
  const confirmPending = useContext(ConfirmFormPendingContext);
  const { pending: formPending } = useFormStatus();
  const pending = confirmPending || formPending;

  return (
    <button
      type="submit"
      className={iconBtn}
      style={{ color: 'var(--z-danger)' }}
      disabled={pending}
      aria-busy={pending}
      title={label}
      aria-label={label}
    >
      {pending ? <AdminSpinner className="h-4 w-4" /> : <AdminDeleteIcon className="h-4 w-4" />}
    </button>
  );
}

type Props = {
  editHref?: string;
  viewHref?: string;
  viewExternal?: boolean;
  deleteAction?: (formData: FormData) => Promise<void>;
  deleteField?: { name: string; value: string };
  deleteLabel?: string;
  deleteConfirmTitle?: string;
  deleteConfirmMessage?: string;
};

export default function AdminTableActions({
  editHref,
  viewHref,
  viewExternal,
  deleteAction,
  deleteField,
  deleteLabel = 'Delete',
  deleteConfirmTitle,
  deleteConfirmMessage,
}: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {editHref ? (
        <IconLink
          href={editHref}
          label="Edit"
          icon={<AdminEditIcon className="h-4 w-4" />}
          tone="primary"
        />
      ) : null}
      {viewHref ? (
        <IconLink
          href={viewHref}
          label="View"
          icon={<AdminViewIcon className="h-4 w-4" />}
          tone="muted"
          external={viewExternal}
        />
      ) : null}
      {deleteAction ? (
        <AdminConfirmDeleteForm
          action={deleteAction}
          confirmTitle={deleteConfirmTitle}
          confirmMessage={deleteConfirmMessage}
        >
          {deleteField ? <input type="hidden" name={deleteField.name} value={deleteField.value} /> : null}
          <DeleteIconButton label={deleteLabel} />
        </AdminConfirmDeleteForm>
      ) : null}
    </div>
  );
}

export function AdminFormDeleteButton({ children }: { children: ReactNode }) {
  const confirmPending = useContext(ConfirmFormPendingContext);
  const { pending: formPending } = useFormStatus();
  const pending = confirmPending || formPending;

  return (
    <button
      type="submit"
      className="inline-flex items-center gap-2 text-sm font-semibold disabled:cursor-wait disabled:opacity-70"
      style={{ color: 'var(--z-danger)' }}
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? <AdminSpinner className="h-3.5 w-3.5" /> : <AdminDeleteIcon className="h-3.5 w-3.5" />}
      {pending ? 'Deleting…' : children}
    </button>
  );
}

export function AdminPendingButton({
  children,
  pendingLabel,
  className = '',
  style,
}: {
  children: ReactNode;
  pendingLabel: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm font-medium transition disabled:cursor-wait disabled:opacity-70 ${className}`}
      style={style}
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? <AdminSpinner className="h-3.5 w-3.5" /> : null}
      {pending ? pendingLabel : children}
    </button>
  );
}
