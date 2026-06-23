import { Container, Eyebrow } from '../components/ui';
import { workTogether } from '../lib/content';
import { CALENDLY_URL } from '../lib/site';

export function WorkTogether() {
  return (
    <section className="border-t border-white/5">
      <Container className="py-20 md:py-24">
        <Eyebrow>{workTogether.eyebrow}</Eyebrow>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {workTogether.cards.map((card) => {
            const isCalendly = card.href === 'calendly';
            return (
              <div key={card.title} className="flex flex-col rounded-2xl border border-white/10 bg-navy-700/40 p-8">
                <h3 className="text-[22px] font-semibold text-white">{card.title}</h3>
                <p className="mt-3 grow text-[16px] leading-relaxed text-paper-2/70">{card.body}</p>
                <a
                  href={isCalendly ? CALENDLY_URL : card.href}
                  {...(isCalendly ? { target: '_blank', rel: 'noopener' } : {})}
                  className="mt-6 inline-flex w-fit items-center rounded-xl bg-magenta px-5 py-2.5 font-display text-[15px] font-semibold text-white transition-colors hover:bg-magenta/90"
                >
                  {card.cta} →
                </a>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
