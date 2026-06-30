'use client';

import Image from 'next/image';
import { useState } from 'react';
import TeamMemberProfileModal from '@/components/team/TeamMemberProfileModal';
import { stripHtml } from '@/lib/team/bio-html';

export type TeamMemberView = {
  id: string;
  name: string;
  title: string;
  bio: string;
  teaser: string | null;
  branch: string | null;
  imagePath: string | null;
  phone: string | null;
  email: string | null;
};

type Props = {
  member: TeamMemberView;
  layout?: 'vertical' | 'horizontal';
};

function MemberPhoto({ member, className }: { member: TeamMemberView; className?: string }) {
  if (member.imagePath) {
    return (
      <Image
        src={member.imagePath}
        alt={member.name}
        fill
        className={`object-cover object-top ${className ?? ''}`}
        sizes="(max-width: 640px) 100vw, 280px"
        unoptimized
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center font-semibold text-white ${className ?? ''}`}
      style={{ background: 'linear-gradient(145deg, #05162e, #0a2444)' }}
      aria-hidden
    >
      {member.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)}
    </div>
  );
}

function MemberContent({
  member,
  onOpenProfile,
}: {
  member: TeamMemberView;
  onOpenProfile: () => void;
}) {
  const preview = member.teaser?.trim() || stripHtml(member.bio).slice(0, 200);
  const showProfileLink = stripHtml(member.bio).length > preview.length + 20 || stripHtml(member.bio).length > 120;

  return (
    <>
      <h3 className="text-lg font-semibold text-[#05162e]">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-[#c5a059]">{member.title}</p>
      {member.branch ? <p className="mt-1 text-xs italic text-slate-500">({member.branch})</p> : null}

      <div className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        <p>
          {preview}
          {showProfileLink ? '…' : ''}
        </p>
      </div>

      {showProfileLink ? (
        <button
          type="button"
          onClick={onOpenProfile}
          className="mt-3 self-start rounded-md border border-[#05162e]/15 bg-[#05162e]/5 px-3 py-1.5 text-sm font-semibold text-[#05162e] transition hover:border-[#c5a059] hover:bg-[#c5a059]/10 hover:text-[#05162e]"
        >
          Read full profile
        </button>
      ) : null}
    </>
  );
}

export default function TeamMemberCard({ member, layout = 'vertical' }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  function openProfile() {
    setModalOpen(true);
  }

  function closeProfile() {
    setModalOpen(false);
  }

  if (layout === 'horizontal') {
    return (
      <>
        <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
          <div className="flex flex-col sm:flex-row">
            <div className="relative aspect-[4/3] w-full shrink-0 bg-slate-100 sm:aspect-auto sm:w-44 sm:min-h-[12rem]">
              <MemberPhoto member={member} className="text-3xl" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col p-5">
              <MemberContent member={member} onOpenProfile={openProfile} />
            </div>
          </div>
        </article>
        <TeamMemberProfileModal member={modalOpen ? member : null} onClose={closeProfile} />
      </>
    );
  }

  return (
    <>
      <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
        <div className="relative aspect-[4/3] w-full bg-slate-100">
          <MemberPhoto member={member} className="text-4xl" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <MemberContent member={member} onOpenProfile={openProfile} />
        </div>
      </article>
      <TeamMemberProfileModal member={modalOpen ? member : null} onClose={closeProfile} />
    </>
  );
}
