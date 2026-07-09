import { changePasswordAction } from '@/lib/account/actions';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSubmitButton from '@/components/auth/UserSubmitButton';
import { AUTH_BUTTON, AUTH_FIELD, AUTH_LABEL } from '@/components/auth/auth-classes';

export default function ChangePasswordForm() {
  return (
    <form action={changePasswordAction} className="user-account-card">
      <h2 className="user-account-card-title">Change password</h2>
      <p className="user-account-card-desc">Use a strong password with at least 8 characters.</p>
      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="currentPassword" className={AUTH_LABEL}>
            Current password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            autoComplete="current-password"
            className={AUTH_FIELD}
          />
        </div>
        <div>
          <label htmlFor="newPassword" className={AUTH_LABEL}>
            New password
          </label>
          <input
            id="newPassword"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={AUTH_FIELD}
          />
        </div>
        <div>
          <label htmlFor="confirmNewPassword" className={AUTH_LABEL}>
            Confirm new password
          </label>
          <input
            id="confirmNewPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className={AUTH_FIELD}
          />
        </div>
      </div>
      <UserSubmitButton pendingLabel="Updating password…" className={`mt-5 max-w-xs ${AUTH_BUTTON}`}>
        Update password
      </UserSubmitButton>
      <UserFormPendingOverlay message="Updating password…" />
    </form>
  );
}
