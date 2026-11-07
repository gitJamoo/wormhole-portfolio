'use client';

import { useState } from 'react';
import posthog from 'posthog-js';

// Shared by the embedded form on /home and the nav's Contact dialog.
const field =
  'mt-1.5 block w-full rounded-lg border border-black/[.12] dark:border-white/[.15] bg-background px-3 py-2.5 text-base sm:text-sm placeholder:text-gray-400 transition-colors focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground';
const label = 'block text-sm font-medium text-gray-700 dark:text-gray-300';

export const buttonPrimary =
  'inline-flex items-center justify-center h-11 px-5 rounded-full font-medium text-sm bg-foreground text-background transition-[transform,background-color] duration-150 ease-out hover:-translate-y-px hover:bg-[#383838] dark:hover:bg-[#ccc] active:translate-y-0 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none';
export const buttonSecondary =
  'inline-flex items-center justify-center h-11 px-5 rounded-full font-medium text-sm border border-foreground/20 transition-[transform,border-color,background-color] duration-150 ease-out hover:-translate-y-px hover:border-foreground hover:bg-foreground/[.04] active:translate-y-0 active:scale-[0.98]';

export default function ContactFormBody({
  source,
  onCancel,
}: {
  source: 'embedded' | 'modal';
  onCancel?: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        posthog.capture('contact_submitted', { form: source });
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-lg border border-green-600/30 bg-green-50 dark:bg-green-950/40 p-4 text-green-800 dark:text-green-300">
        Thanks, your message was sent. I&apos;ll reply by email.
        {onCancel && (
          <div className="mt-4">
            <button type="button" onClick={onCancel} className={buttonSecondary}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${source}-name`} className={label}>Name</label>
          <input id={`${source}-name`} type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} required />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className={label}>Email</label>
          <input id={`${source}-email`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} required />
        </div>
      </div>
      <div>
        <label htmlFor={`${source}-message`} className={label}>Message</label>
        <textarea id={`${source}-message`} rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={field} required />
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className={buttonSecondary}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={submitting} className={buttonPrimary}>
          {submitting ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}
