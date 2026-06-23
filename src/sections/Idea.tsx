import { Container, Eyebrow } from '../components/ui';
import { idea } from '../lib/content';

export function Idea() {
  return (
    <section id="idea" className="border-t border-white/5 bg-navy-800/50">
      <Container className="py-20 md:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{idea.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[30px] font-bold text-white md:text-[38px]">{idea.heading}</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-paper-2/75">
            {idea.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
