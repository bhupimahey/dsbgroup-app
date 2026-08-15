import { paragraphsToBioHtml } from '@/lib/team/bio-html';
import { teamTeaser } from '@/lib/team/constants';
import { TEAM_LIVE_MEMBERS, type TeamLiveMember } from '@/lib/team/team-live-bios';
import { photoPathForTeamName, TEAM_PHOTO_FILES } from '@/lib/team/team-photos';

export type TeamSeedMember = TeamLiveMember & { published?: boolean };

function m(member: TeamLiveMember): TeamSeedMember {
  return { published: true, ...member };
}

/** Roster from the client Our People document — plain paragraphs only. */
export const TEAM_SEED_MEMBERS: TeamSeedMember[] = TEAM_LIVE_MEMBERS.map(m);

export function teamSeedPayload(member: TeamSeedMember) {
  const bioHtml = paragraphsToBioHtml(member.bio);
  return {
    name: member.name,
    title: member.title,
    bio: bioHtml,
    teaser: member.teaser?.trim() || teamTeaser(bioHtml),
    branch: member.branch ?? null,
    group: member.group,
    phone: member.phone ?? null,
    email: member.email ?? null,
    sortOrder: member.sortOrder,
    published: member.published ?? true,
  };
}

export function seededPhotoPath(member: { id: string; name: string }): string | null {
  return TEAM_PHOTO_FILES[member.id] ?? photoPathForTeamName(member.name);
}

export function teamCreatePayload(member: TeamSeedMember) {
  return {
    ...teamSeedPayload(member),
    imagePath: seededPhotoPath(member),
    showPhotoOnFront: true,
  };
}

export function teamUpdatePayload(
  member: TeamSeedMember,
  existing: { imagePath: string | null } | null,
) {
  const photo = seededPhotoPath(member);
  const current = existing?.imagePath?.trim() || '';
  const shouldFillPhoto = Boolean(photo) && (!current || current.startsWith('/uploads/team/'));
  return {
    ...teamSeedPayload(member),
    ...(shouldFillPhoto ? { imagePath: photo } : {}),
  };
}
