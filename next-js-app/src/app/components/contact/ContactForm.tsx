'use client';

import { useEffect } from 'react';

import ContactFormBody from './ContactFormBody';

export default function ContactForm({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        className="w-full sm:max-w-lg bg-background text-foreground rounded-t-2xl sm:rounded-2xl border border-black/[.08] dark:border-white/[.12] shadow-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="contact-dialog-title" className="text-2xl font-semibold tracking-tight mb-6">
          Send me a message
        </h2>
        <ContactFormBody source="modal" onCancel={onClose} />
      </div>
    </div>
  );
}
