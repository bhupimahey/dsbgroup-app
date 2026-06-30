'use client';

import { FormEvent, useState } from 'react';

type ContactFormProps = {
  variant?: 'light' | 'dark' | 'blog';
};

export default function ContactForm({ variant = 'light' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const isDark = variant === 'dark';
  const isBlog = variant === 'blog';
  const fieldClass = isBlog ? 'blogmiddle-field' : isDark ? 'contact1-field' : 'theme-contact-field';
  const formClass = isBlog ? 'blogmiddle-form-grid' : isDark ? 'contact1-form-grid' : 'theme-contact-form-grid';
  const usePlaceholderOnly = isDark || isBlog;

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
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(body),
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
    <form onSubmit={onSubmit} className={formClass}>
      <div className={fieldClass}>
        <label htmlFor="firstName" className={usePlaceholderOnly ? 'sr-only' : undefined}>
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          placeholder={usePlaceholderOnly ? 'First Name' : undefined}
          required
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="lastName" className={usePlaceholderOnly ? 'sr-only' : undefined}>
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          placeholder={usePlaceholderOnly ? 'Last Name' : undefined}
          required
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="email" className={usePlaceholderOnly ? 'sr-only' : undefined}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={usePlaceholderOnly ? 'Email' : undefined}
          required
        />
      </div>

      <div className={fieldClass}>
        <label htmlFor="phone" className={usePlaceholderOnly ? 'sr-only' : undefined}>
          Phone
        </label>
        <input id="phone" name="phone" placeholder={usePlaceholderOnly ? 'Phone' : undefined} />
      </div>

      <div className={`${fieldClass} full`}>
        <label htmlFor="subject" className={usePlaceholderOnly ? 'sr-only' : undefined}>
          Subject
        </label>
        <input id="subject" name="subject" placeholder={usePlaceholderOnly ? 'Subject' : undefined} />
      </div>

      <div className={`${fieldClass} full`}>
        <label htmlFor="message" className={usePlaceholderOnly ? 'sr-only' : undefined}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder={usePlaceholderOnly ? 'Message' : undefined}
          required
          rows={5}
        />
      </div>
      {isBlog ? (
        <div className="blogmiddle-submit-wrap">
          <button type="submit" disabled={status === 'loading'} className="blogmiddle-submit">
            {status === 'loading' ? 'Sending...' : 'Submit Now'} <span aria-hidden>→</span>
          </button>
        </div>
      ) : (
        <button
          type="submit"
          disabled={status === 'loading'}
          className={isDark ? 'contact1-submit' : 'theme-contact-submit'}
        >
          {status === 'loading' ? 'Sending...' : 'Submit Now'}
        </button>
      )}

      {status === 'success' ? (
        <p
          className={
            isBlog
              ? 'blogmiddle-status blogmiddle-status--success'
              : isDark
                ? 'contact1-status contact1-status--success'
                : 'theme-contact-status text-green-700'
          }
        >
          Thank you — we will respond shortly.
        </p>
      ) : null}
      {status === 'error' ? (
        <p
          className={
            isBlog
              ? 'blogmiddle-status blogmiddle-status--error'
              : isDark
                ? 'contact1-status contact1-status--error'
                : 'theme-contact-status text-red-600'
          }
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
