'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ContactForm from './contact/ContactForm';

// Pages that own the whole screen or must stay unlinked from the rest of the site.
const HIDDEN = [/^\/wormhole\//, /^\/agent-kit/, /^\/playground\/llm-sandbox/, /^\/contact-submissions/];

const links = [
  { href: '/home', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/playground', label: 'Playground' },
];

const navLink =
  'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size,color] duration-200 hover:bg-[length:100%_1px] hover:text-foreground';

export default function SiteNav() {
  const pathname = usePathname() ?? '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const closeContact = useCallback(() => setContactOpen(false), []);

  useEffect(() => setMenuOpen(false), [pathname]);

  if (HIDDEN.some((re) => re.test(pathname))) return null;

  // The Playground is always dark, whatever the visitor's colour scheme.
  const forceDark = pathname.startsWith('/playground');
  const theme = forceDark
    ? ({ '--background': '#05070d', '--foreground': '#ededed' } as React.CSSProperties)
    : undefined;
  const muted = forceDark ? 'text-slate-400' : 'text-gray-600 dark:text-gray-400';
  const rule = forceDark ? 'border-white/[.08]' : 'border-black/[.06] dark:border-white/[.08]';
  const solidHover = forceDark ? 'hover:bg-[#ccc]' : 'hover:bg-[#383838] dark:hover:bg-[#ccc]';

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const openContact = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  return (
    <div style={theme} className="contents">
      <header className={`sticky top-0 z-40 ${forceDark ? 'bg-background' : 'bg-background/85 backdrop-blur'} text-foreground border-b ${rule} font-sans`}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            James M. Smith
          </Link>

          <nav className={`hidden md:flex items-center gap-7 text-sm ${muted}`}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`${navLink} ${isActive(l.href) ? 'text-foreground bg-[length:100%_1px]' : ''}`}
              >
                {l.label}
              </Link>
            ))}
            <button type="button" onClick={openContact} className={navLink}>
              Contact
            </button>
            <Link
              href="/book"
              className={`inline-flex items-center h-9 px-4 rounded-full bg-foreground text-background font-medium transition-[transform,background-color] duration-150 hover:-translate-y-px ${solidHover} active:translate-y-0 active:scale-[0.98]`}
            >
              Book a meeting
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden -mr-2 p-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="md:hidden fixed inset-x-0 top-14 bottom-0 z-40 bg-background text-foreground font-sans px-6 py-8 flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-3xl font-semibold tracking-tight py-2">
              {l.label}
            </Link>
          ))}
          <button type="button" onClick={openContact} className="text-left text-3xl font-semibold tracking-tight py-2">
            Contact
          </button>
          <Link
            href="/book"
            className="mt-6 inline-flex items-center justify-center h-12 rounded-full bg-foreground text-background font-medium"
          >
            Book a meeting
          </Link>
        </div>
      )}

      {contactOpen && <ContactForm onClose={closeContact} />}
    </div>
  );
}
