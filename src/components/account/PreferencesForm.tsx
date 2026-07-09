import { updatePreferencesAction, unsubscribeNewsletterAction } from '@/lib/account/actions';
import NewsletterInterestFields, {
  type NewsletterCategory,
} from '@/components/subscription/NewsletterInterestFields';
import UserFormPendingOverlay from '@/components/auth/UserFormPendingOverlay';
import UserSubmitButton from '@/components/auth/UserSubmitButton';
import { AUTH_BUTTON } from '@/components/auth/auth-classes';
import { formatSubscriptionFrequency } from '@/lib/subscription/labels';

type Preference = { serviceCategoryId: string; frequency: string };

type Props = {
  categories: NewsletterCategory[];
  preferences: Preference[];
  defaultFrequency: string;
};

export default function PreferencesForm({ categories, preferences, defaultFrequency }: Props) {
  const isSubscribed = preferences.length > 0;
  const selectedCategoryIds = preferences.map((pref) => pref.serviceCategoryId);

  return (
    <div className="user-account-card user-account-card--preferences">
      <h2 className="user-account-card-title">Newsletter preferences</h2>
      {isSubscribed ? (
        <p className="user-account-card-desc">
          You are receiving legal updates for {preferences.length} practice area
          {preferences.length === 1 ? '' : 's'} on a{' '}
          <strong>{formatSubscriptionFrequency(defaultFrequency).toLowerCase()}</strong> schedule.
        </p>
      ) : (
        <div className="user-account-empty-subscribe">
          <p className="user-account-empty-subscribe-title">You are not subscribed yet</p>
          <p className="user-account-empty-subscribe-desc">
            Choose the practice areas you want legal updates for. You can change these anytime.
          </p>
        </div>
      )}

      <form action={updatePreferencesAction} className="mt-5">
        <NewsletterInterestFields
          categories={categories}
          defaultFrequency={defaultFrequency as 'WEEKLY' | 'TWICE_WEEKLY' | 'MONTHLY'}
          selectedCategoryIds={selectedCategoryIds}
          compact
          hint="Select at least one practice area to start receiving legal updates."
        />

        <UserSubmitButton pendingLabel="Saving preferences…" className={`mt-5 max-w-xs ${AUTH_BUTTON}`}>
          {isSubscribed ? 'Save preferences' : 'Subscribe to updates'}
        </UserSubmitButton>
        <UserFormPendingOverlay message="Saving preferences…" />
      </form>

      {isSubscribed ? (
        <form action={unsubscribeNewsletterAction} className="user-account-unsubscribe-form">
          <p className="user-account-unsubscribe-copy">
            Stop all newsletter emails from your account. You can subscribe again later from this page.
          </p>
          <button type="submit" className="user-account-unsubscribe-btn">
            Unsubscribe from all updates
          </button>
        </form>
      ) : null}
    </div>
  );
}
