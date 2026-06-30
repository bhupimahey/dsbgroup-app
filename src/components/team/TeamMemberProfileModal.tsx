'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { TeamMemberView } from '@/components/team/TeamMemberCard';
import '@/styles/team-profile-modal.css';

type TeamMemberProfileModalProps = {
  member: TeamMemberView | null;
  onClose: () => void;
};

function ModalPhoto({ member }: { member: TeamMemberView }) {
  if (member.imagePath) {
    return (
      <Image
        src={member.imagePath}
        alt={member.name}
        fill
        className="object-cover object-top"
        sizes="88px"
        unoptimized
      />
    );
  }

  return (
    <span className="team-profile-modal-photo-initials" aria-hidden>
      {member.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)}
    </span>
  );
}

export default function TeamMemberProfileModal({ member, onClose }: TeamMemberProfileModalProps) {
  useEffect(() => {
    if (!member) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [member, onClose]);

  if (!member || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="team-profile-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="team-profile-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`team-profile-title-${member.id}`}
      >
        <header className="team-profile-modal-head">
          <div className="team-profile-modal-photo">
            <ModalPhoto member={member} />
          </div>
          <div>
            <h2 id={`team-profile-title-${member.id}`} className="team-profile-modal-name">
              {member.name}
            </h2>
            <p className="team-profile-modal-title">{member.title}</p>
            {member.branch ? <p className="team-profile-modal-branch">({member.branch})</p> : null}
          </div>
          <button type="button" className="team-profile-modal-close" onClick={onClose} aria-label="Close profile">
            ×
          </button>
        </header>

        <div className="team-profile-modal-body">
          <div className="cms-html" dangerouslySetInnerHTML={{ __html: member.bio }} />
        </div>

        {member.phone || member.email ? (
          <footer className="team-profile-modal-footer">
            {member.phone ? (
              <p className="team-profile-modal-contact">
                <span className="team-profile-modal-contact-label">Phone: </span>
                <a href={`tel:${member.phone.replace(/\s/g, '')}`}>{member.phone}</a>
              </p>
            ) : null}
            {member.email ? (
              <p className="team-profile-modal-contact">
                <span className="team-profile-modal-contact-label">Email: </span>
                <Link href={`mailto:${member.email}`}>{member.email}</Link>
              </p>
            ) : null}
          </footer>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
