'use client';

import { FormEvent, useState } from 'react';

export default function BlogReplyForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value.trim();
    const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value.trim();
    const subject = (form.elements.namedItem('subject') as HTMLInputElement).value.trim();
    const messageText = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim();

    const body = {
      name: `${firstName} ${lastName}`.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: subject ? `Subject: ${subject}\n\n${messageText}` : messageText,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setError('Could not send your message. Please try again.');
    }
  }

  return (
    <div className="blogright-contact-section">
      <h2>Leave a Reply</h2>
      <p>Provide clear contact information, including phone number, email, and address.</p>

      <form onSubmit={onSubmit} className="blogright-form-grid">
        <div className="blogright-input">
          <input type="text" name="firstName" placeholder="First Name" required />
        </div>
        <div className="blogright-input">
          <input type="text" name="lastName" placeholder="Last Name" required />
        </div>
        <div className="blogright-input">
          <input type="email" name="email" placeholder="Email" required />
        </div>
        <div className="blogright-input">
          <input type="text" name="phone" placeholder="Phone" />
        </div>
        <div className="blogright-input full">
          <input type="text" name="subject" placeholder="Subject" />
        </div>
        <div className="blogright-input full">
          <textarea name="message" placeholder="Message" required rows={10} />
        </div>

        <div className="blogright-submit-wrap">
          <button type="submit" disabled={status === 'loading'} className="blogright-submit">
            {status === 'loading' ? 'Sending...' : 'Submit Now'} <span aria-hidden>→</span>
          </button>
        </div>

        {status === 'success' ? (
          <p className="blogright-status blogright-status--success">
            Thank you — we will respond shortly.
          </p>
        ) : null}
        {status === 'error' ? (
          <p className="blogright-status blogright-status--error">{error}</p>
        ) : null}
      </form>
    </div>
  );
}
