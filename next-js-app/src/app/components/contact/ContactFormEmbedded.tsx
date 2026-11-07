import Link from 'next/link';

import ContactFormBody, { buttonSecondary } from './ContactFormBody';

export default function ContactFormEmbedded() {
  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start border-t border-black/[.08] dark:border-white/[.12] pt-16">
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Get in touch</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-md">
          Hiring, a project, or just want to talk AI? Send a note or grab 30 minutes on my calendar.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/book" className={buttonSecondary}>
            Book a meeting
          </Link>
          <a href="mailto:james.smith.tig@gmail.com" className={buttonSecondary}>
            Email me
          </a>
        </div>
      </div>
      <ContactFormBody source="embedded" />
    </div>
  );
}
