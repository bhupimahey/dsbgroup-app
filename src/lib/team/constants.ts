import type { TeamGroup } from '@/generated/prisma/client';
import { stripHtml } from '@/lib/team/bio-html';

export const TEAM_GROUP_ORDER: TeamGroup[] = [
  'MANAGING_PARTNERS_CEO',
  'PARTNERS_DIRECTORS',
  'SENIOR_WHOLE_TIME_CONSULTANTS',
  'WHOLE_TIME_CONSULTANTS',
  'EMPANELLED_ADVOCATES',
];

export const TEAM_GROUP_LABELS: Record<TeamGroup, string> = {
  MANAGING_PARTNERS_CEO: 'Managing Partners & CEO',
  PARTNERS_DIRECTORS: 'Partners / Directors',
  SENIOR_WHOLE_TIME_CONSULTANTS: 'Senior Whole-Time Consultants',
  WHOLE_TIME_CONSULTANTS: 'Whole Time Consultants',
  EMPANELLED_ADVOCATES: 'Empanelled Advocates (Labor, Civil, Criminal)',
};

export const TEAM_GROUP_OPTIONS = TEAM_GROUP_ORDER.map((value) => ({
  value,
  label: TEAM_GROUP_LABELS[value],
}));

export function teamTeaser(bio: string, max = 200): string {
  const flat = stripHtml(bio);
  if (flat.length <= max) return flat;
  const cut = flat.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}
