import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui';

/** Shared layout for the /terms and /privacy pages. */
export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-900">
      <Container className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="text-[14px] text-teal-bright hover:underline">← Back to OwnIt</Link>
          </div>
          <h1 className="mt-6 text-[32px] font-bold text-white md:text-[40px]">{title}</h1>
          <p className="mt-2 text-[14px] text-paper-2/50">Last updated: {updated}</p>
          <div className="legal mt-8 space-y-8 text-[16px] leading-relaxed text-paper-2/80">{children}</div>
        </div>
      </Container>
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-[20px] font-semibold text-white">{heading}</h2>
      {children}
    </section>
  );
}
