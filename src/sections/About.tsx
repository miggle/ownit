import { Container, Eyebrow } from '../components/ui';
import { about } from '../lib/content';
import { MIGGLE_URL } from '../lib/site';

export function About() {
  return (
    <section className="border-t border-white/5">
      <Container className="py-20 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <p className="mt-5 text-[19px] leading-relaxed text-paper-2/80">{about.body}</p>
          <a
            href={MIGGLE_URL}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-block text-[16px] font-semibold text-teal-bright transition-colors hover:text-teal-light"
          >
            {about.link} →
          </a>
        </div>
      </Container>
    </section>
  );
}
