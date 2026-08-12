'use client';

import { useState } from 'react';
import type { AboutTabPanel } from '@/lib/site/about-page-content';

type Props = {
  heading: string;
  lead: string;
  tabs: AboutTabPanel[];
};

export default function AboutVisionTabs({ heading, lead, tabs }: Props) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className="about-vision-copy">
      <h2 className="about-section-title">{heading}</h2>
      <p className="about-body-text">{lead}</p>
      <div className="about-vision-divider" aria-hidden />

      <ul className="about-tab-list" role="tablist" aria-label="About sections">
        {tabs.map((tab) => (
          <li key={tab.id} role="presentation">
            <button
              type="button"
              role="tab"
              id={`about-tab-${tab.id}`}
              aria-selected={activeTab?.id === tab.id}
              aria-controls={`about-panel-${tab.id}`}
              className={`about-tab-btn${activeTab?.id === tab.id ? ' is-active' : ''}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {activeTab ? (
        <div
          className="about-tab-panel"
          role="tabpanel"
          id={`about-panel-${activeTab.id}`}
          aria-labelledby={`about-tab-${activeTab.id}`}
        >
          {activeTab.paragraphs.map((paragraph) => (
            <p key={`${activeTab.id}-${paragraph.text.slice(0, 24)}`}>
              {paragraph.lead ? <strong>{paragraph.lead}: </strong> : null}
              {paragraph.text}
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
