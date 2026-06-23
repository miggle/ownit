import { Container, Eyebrow } from '../components/ui';
import { builtToLast } from '../lib/content';

export function BuiltToLast() {
  return (
    <section id="lasts" className="border-t border-white/5">
      <Container className="py-20 md:py-24">
        <div className="rounded-3xl border border-teal/30 bg-gradient-to-br from-teal/10 to-navy-700/40 p-8 md:p-12">
          <Eyebrow>{builtToLast.eyebrow}</Eyebrow>
          <div className="mt-5 max-w-3xl space-y-5 text-[17px] leading-relaxed text-paper-2/80">
            {builtToLast.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {builtToLast.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-teal-bright/30 bg-teal/10 px-4 py-2 text-[14px] font-medium text-teal-light"
              >
                ✓ {chip}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
