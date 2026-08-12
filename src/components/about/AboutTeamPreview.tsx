import Image from 'next/image';
import Link from 'next/link';
import type { getTeamMembers } from '@/lib/db/public-data';

type TeamMemberRow = Awaited<ReturnType<typeof getTeamMembers>>[number];

type Props = {
  badge: string;
  heading: string;
  members: TeamMemberRow[];
};

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function AboutTeamPreview({ badge, heading, members }: Props) {
  const preview = members.slice(0, 4);

  if (preview.length === 0) {
    return null;
  }

  return (
    <section className="about-team-section">
      <div className="about-container">
        <div className="about-team-header">
          <span className="about-badge">{badge}</span>
          <h2 className="about-section-title">{heading}</h2>
        </div>

        <div className="about-team-grid">
          {preview.map((member) => (
            <article key={member.id} className="about-team-card">
              <div className="about-team-photo">
                {member.imagePath ? (
                  <Image
                    src={member.imagePath}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 260px"
                    unoptimized
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-3xl font-semibold text-white"
                    style={{ background: 'linear-gradient(145deg, #05162e, #0a2444)' }}
                    aria-hidden
                  >
                    {initials(member.name)}
                  </div>
                )}

                <div className="about-team-overlay">
                  <ul className="about-team-social">
                    {member.email ? (
                      <li>
                        <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                          @
                        </a>
                      </li>
                    ) : null}
                    {member.phone ? (
                      <li>
                        <a href={`tel:${member.phone.replace(/\s/g, '')}`} aria-label={`Call ${member.name}`}>
                          ☎
                        </a>
                      </li>
                    ) : null}
                    <li>
                      <Link href="/team" aria-label={`View ${member.name} on team page`}>
                        →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="about-team-meta">
                <h3 className="about-team-name">
                  <Link href="/team">{member.name}</Link>
                </h3>
                <p className="about-team-role">{member.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
