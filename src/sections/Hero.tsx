import { Container, BookChatButton, AnchorButton } from '../components/ui';
import { hero } from '../lib/content';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-teal/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-magenta/15 blur-[120px]" />
      <Container className="relative py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-teal-light">
            {hero.eyebrow}
          </span>
          <h1 className="mt-5 text-[40px] font-bold leading-[1.05] text-white md:text-[58px]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-paper-2/75">{hero.subhead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BookChatButton />
            <AnchorButton href="#meetup">Join the meetup</AnchorButton>
          </div>
          <p className="mt-10 max-w-2xl border-l-2 border-teal-bright/50 pl-5 text-[16px] italic leading-relaxed text-paper-2/65">
            {hero.supporting}
          </p>
        </div>
      </Container>
    </section>
  );
}
