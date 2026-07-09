import Link from 'next/link';
import { getCachedTeamMembers } from '@/lib/db/public-cache';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { TEAM_GROUP_LABELS, TEAM_GROUP_ORDER } from '@/lib/team/constants';

export const revalidate = 60;

export const metadata = { title: 'Our Team' };

export default async function TeamPage() {
  const members = await getCachedTeamMembers();

  const grouped = TEAM_GROUP_ORDER.map((group) => ({
    group,
    label: TEAM_GROUP_LABELS[group],
    members: members.filter((m) => m.group === group),
  })).filter((section) => section.members.length > 0);

  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#05162e]">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-[#05162e]">Our Team</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-3xl font-semibold text-[#05162e] sm:text-4xl">Our Team</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Partners, directors, and consultants across corporate law, taxation, banking, and litigation — serving
            clients from offices across India.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {grouped.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Team profiles will appear here soon.
          </p>
        ) : (
          grouped.map((section) => (
            <section key={section.group} className="mb-14 last:mb-0">
              <h2 className="border-b border-slate-200 pb-3 text-sm font-semibold uppercase tracking-widest text-[#c5a059]">
                {section.label}
              </h2>
              <ul
                className={`mt-6 grid gap-5 ${
                  section.group === 'MANAGING_PARTNERS_CEO' ? 'grid-cols-1' : 'sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {section.members.map((member) => (
                  <li key={member.id}>
                    <TeamMemberCard
                      member={member}
                      layout={section.group === 'MANAGING_PARTNERS_CEO' ? 'horizontal' : 'vertical'}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
