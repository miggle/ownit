import type { ReactNode } from 'react';
import { CALENDLY_URL } from '../lib/site';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, accent = 'teal' }: { children: ReactNode; accent?: 'teal' | 'magenta' }) {
  const color = accent === 'magenta' ? 'text-magenta' : 'text-teal-bright';
  return (
    <span className={`font-mono text-[13px] uppercase tracking-[0.08em] ${color}`}>{children}</span>
  );
}

/** Primary CTA: "Book a 30-minute chat" → Calendly. */
export function BookChatButton({ className = '', label = 'Book a 30-minute chat' }: { className?: string; label?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center justify-center rounded-xl bg-magenta px-6 py-[15px] font-display text-[16px] font-semibold text-white transition-colors hover:bg-magenta/90 ${className}`}
    >
      {label}
    </a>
  );
}

/** Secondary CTA: scrolls to an on-page anchor (no third party). */
export function AnchorButton({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-[15px] font-display text-[16px] font-semibold text-white transition-colors hover:bg-white/10 ${className}`}
    >
      {children}
    </a>
  );
}
