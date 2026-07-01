import { ensureBioHtml } from '@/lib/team/bio-html';
import { teamTeaser } from '@/lib/team/constants';
import { TEAM_LIVE_MEMBERS, type TeamLiveMember } from '@/lib/team/team-live-bios';

export type TeamSeedMember = TeamLiveMember & { published?: boolean };

function m(member: TeamLiveMember): TeamSeedMember {
  return { published: true, ...member };
}

/** Roster aligned with https://www.dsblawgroup.com/our-team */
export const TEAM_SEED_MEMBERS: TeamSeedMember[] = TEAM_LIVE_MEMBERS.map(m);

export function teamSeedPayload(member: TeamSeedMember) {
  const bioHtml = ensureBioHtml(member.bio);
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
