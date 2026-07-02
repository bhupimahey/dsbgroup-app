'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    id: 'q1',
    question: 'What types of legal services do you offer?',
    answer:
      "Our firm offers a comprehensive range of legal services including civil litigation, corporate law, criminal defence, NBFC compliance, HR & labour law, and UCB advisory services. We tailor our approach to meet each client's unique needs.",
  },
  {
    id: 'q2',
    question: 'How does your consulting process work?',
    answer:
      'Our process involves four key steps: Discovery, Strategy, Implementation, and Review. We start by understanding your challenges and goals, then craft a customised legal strategy and support you through execution.',
  },
  {
    id: 'q3',
    question: 'What industries do you specialise in?',
    answer:
      'We specialise in banking & finance, cooperative societies, employment law, criminal defence, and general corporate advisory — with deep expertise built over decades of practice.',
  },
  {
    id: 'q4',
    question: 'What sets your law firm apart from others?',
    answer:
      'Our client-first philosophy, transparent communication, and proven track record across diverse practice areas set us apart. We are committed to delivering results that protect your interests.',
  },
  {
    id: 'q5',
    question: 'What can I expect during an initial consultation?',
    answer:
      'During the initial consultation you can expect a thorough review of your matter, an honest assessment of your legal position, and a clear explanation of the options available — with no obligation.',
  },
  {
    id: 'q6',
    question: 'What is the first step in engaging your services?',
    answer:
      'Simply reach out via our contact form, phone, or email. We will schedule a convenient time to discuss your matter and outline how we can assist you.',
  },
  {
    id: 'q7',
    question: 'Can your firm assist with crisis management?',
    answer:
      'Yes — we offer rapid-response legal support for urgent matters, including regulatory investigations, employment disputes, and criminal proceedings that require immediate attention.',
  },
  {
    id: 'q8',
    question: 'How does data and analytics inform your legal approach?',
    answer:
      'We leverage case-law databases, compliance analytics, and precedent research to build evidence-based legal strategies, ensuring our advice is grounded in the latest judicial developments.',
  },
];

export default function ContactFaq() {
  const [openId, setOpenId] = useState<string | null>('q1');

  const left = FAQ_ITEMS.slice(0, 4);
  const right = FAQ_ITEMS.slice(4);

  const renderItem = (item: (typeof FAQ_ITEMS)[0]) => {
    const isOpen = openId === item.id;
    return (
      <div key={item.id} className="contact2-accordion-item">
        <button
          type="button"
          className="contact2-accordion-btn"
          data-open={String(isOpen)}
          onClick={() => setOpenId(isOpen ? null : item.id)}
        >
          {item.question}
          <span className="contact2-accordion-indicator">{isOpen ? '−' : '+'}</span>
        </button>
        {isOpen && <div className="contact2-accordion-body">{item.answer}</div>}
      </div>
    );
  };

  return (
    <section className="contact2-faq">
      <div className="theme-inner-container">
        <h2 className="contact2-faq-title">Frequently Asked Questions</h2>
        <div className="contact2-faq-grid">
          <div>{left.map(renderItem)}</div>
          <div>{right.map(renderItem)}</div>
        </div>
      </div>
    </section>
  );
}
