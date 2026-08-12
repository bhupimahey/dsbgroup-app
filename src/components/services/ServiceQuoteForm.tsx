'use client';

import { FormEvent, useState } from 'react';
import UserSpinner from '@/components/auth/UserSpinner';

export default function ServiceQuoteForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="services-quote-form" onSubmit={onSubmit}>
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Email Address" required />
      <input type="tel" name="phone" placeholder="Phone Number" />
      <textarea name="message" placeholder="Your Message" required />
      <button type="submit" className="services-quote-submit" disabled={status === 'loading'}>
        {status === 'loading' ? <UserSpinner /> : null}
        Submit Now <span aria-hidden>→</span>
      </button>
      {status === 'success' ? (
        <p className="text-sm text-green-700">Thank you — we will contact you shortly.</p>
      ) : null}
      {status === 'error' ? (
        <p className="text-sm text-red-700">Could not send message. Please try again or call us.</p>
      ) : null}
    </form>
  );
}
