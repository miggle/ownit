import { Container, Eyebrow, BookChatButton } from '../components/ui';
import { coversIntro, coverCards, lovable } from '../lib/content';

export function Covers() {
  return (
    <section className="border-t border-white/5">
      <Container className="py-20 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>{coversIntro.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[28px] font-bold text-white md:text-[34px]">{coversIntro.heading}</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {coverCards.map((card) => {
            const accent = card.accent === 'magenta' ? 'text-magenta' : 'text-teal-bright';
            return (
              <a
                key={card.title}
                href={card.href}
                className="group flex flex-col gap-3.5 rounded-2xl border border-white/10 bg-navy-700/40 p-7 transition-colors hover:border-white/20 hover:bg-navy-700/70"
              >
                <span className={`font-mono text-[13px] ${accent}`}>{card.tag}</span>
                <h3 className="text-[22px] font-semibold text-white">{card.title}</h3>
                <p className="text-[15.5px] leading-relaxed text-paper-2/70">{card.body}</p>
                <span className={`mt-1 text-[15px] font-semibold ${accent}`}>
                  {card.link} <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            );
          })}
        </div>

        {/* Started in Lovable / Replit */}
        <div className="mt-12 rounded-2xl border border-magenta/25 bg-magenta/5 p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[13px] text-paper-2/60">
            <span className="rounded-md bg-white/5 px-2 py-1">Lovable</span>
            <span className="rounded-md bg-white/5 px-2 py-1">Replit</span>
            <span className="text-magenta">→ OwnIt</span>
          </div>
          <h3 className="mt-4 text-[24px] font-bold text-white md:text-[28px]">{lovable.heading}</h3>
          <p className="mt-4 max-w-3xl text-[16.5px] leading-relaxed text-paper-2/75">{lovable.body}</p>
          <div className="mt-7">
            <BookChatButton />
          </div>
        </div>
      </Container>
    </section>
  );
}
