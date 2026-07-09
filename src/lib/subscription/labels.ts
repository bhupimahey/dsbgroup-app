export type SubscriptionFrequency = 'WEEKLY' | 'TWICE_WEEKLY' | 'MONTHLY';

export function formatSubscriptionFrequency(frequency: string) {
  switch (frequency) {
    case 'WEEKLY':
      return 'Weekly';
    case 'TWICE_WEEKLY':
      return 'Twice per week';
    case 'MONTHLY':
      return 'Monthly';
    default:
      return frequency;
  }
}

export function formatCategoryList(names: string[]) {
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')}, and ${names[names.length - 1]}`;
}
