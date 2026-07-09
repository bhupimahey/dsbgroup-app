import { updateProfileAction } from '@/lib/account/actions';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSubmitButton from '@/components/auth/UserSubmitButton';
import { AUTH_BUTTON, AUTH_FIELD, AUTH_LABEL } from '@/components/auth/auth-classes';

type ProfileFormProps = {
  name: string;
};

export default function ProfileForm({ name }: ProfileFormProps) {
  return (
    <form action={updateProfileAction} className="user-account-card">
      <h2 className="user-account-card-title">Profile details</h2>
      <p className="user-account-card-desc">Update the name shown on your account.</p>
      <div className="mt-5">
        <label htmlFor="profileName" className={AUTH_LABEL}>
          Full name
        </label>
        <input
          id="profileName"
          name="name"
          type="text"
          required
          defaultValue={name}
          className={AUTH_FIELD}
        />
      </div>
      <UserSubmitButton pendingLabel="Saving profile…" className={`mt-5 max-w-xs ${AUTH_BUTTON}`}>
        Save profile
      </UserSubmitButton>
      <UserFormPendingOverlay message="Saving profile…" />
    </form>
  );
}
