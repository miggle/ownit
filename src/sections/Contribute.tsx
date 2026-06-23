import { useState } from 'react';
import { Container } from '../components/ui';
import { contribute } from '../lib/content';

export function Contribute() {
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO(M3 #14): POST to the submitContrib Function, which creates a GitHub
    // Issue via a server-side token. Local state only for now.
    setDone(true);
  };

  const input = 'w-full rounded-lg border border-white/15 bg-navy-900/60 px-4 py-2.5 text-[15px] text-white placeholder:text-paper-2/35 focus:border-teal-bright focus:outline-none';
  const label = 'block text-[14px] font-medium text-paper-2/80';

  return (
    <section className="border-t border-white/5 bg-navy-800/50">
      <Container className="py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[28px] font-bold text-white md:text-[34px]">{contribute.heading}</h2>
          <p className="mt-4 text-[18px] font-semibold text-teal-light">{contribute.subheading}</p>
          <p className="mt-3 text-[16px] leading-relaxed text-paper-2/70">{contribute.intro}</p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          {done ? (
            <div className="rounded-2xl border border-teal/30 bg-navy-700/40 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/20 text-2xl text-teal-light">✓</div>
              <h3 className="mt-4 text-[20px] font-semibold text-white">{contribute.success.title}</h3>
              <p className="mt-2 text-[15.5px] text-paper-2/70">{contribute.success.body}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-navy-700/40 p-7">
              <div className="space-y-4">
                <div>
                  <label className={label} htmlFor="c-idea">{contribute.fields.idea}</label>
                  <textarea id="c-idea" name="idea" rows={4} required className={`mt-1.5 ${input}`} placeholder="What would you change, add, or do differently?" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="c-name">{contribute.fields.name}</label>
                    <input id="c-name" name="name" className={`mt-1.5 ${input}`} placeholder="So I can credit you" />
                  </div>
                  <div>
                    <label className={label} htmlFor="c-email">{contribute.fields.email}</label>
                    <input id="c-email" name="email" type="email" className={`mt-1.5 ${input}`} placeholder="Only if you’d like a reply" />
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-6 w-full rounded-xl bg-magenta px-6 py-3 font-display text-[16px] font-semibold text-white transition-colors hover:bg-magenta/90">
                {contribute.fields.submit}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
