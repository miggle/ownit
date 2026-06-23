import { Container, Eyebrow, AssetImg } from '../components/ui';
import { about } from '../lib/content';
import { MIGGLE_URL, ASSETS } from '../lib/site';

export function About() {
  return (
    <section className="border-t border-white/5">
      <Container className="py-20 md:py-24">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <AssetImg
            src={ASSETS.alickPhoto}
            alt="Alick Mighall"
            className="h-40 w-40 shrink-0 rounded-2xl border border-white/10 object-cover md:h-48 md:w-48"
          />
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
        </div>
      </Container>
    </section>
  );
}
