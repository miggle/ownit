import { Container, AssetImg } from './ui';
import { nav } from '../lib/content';
import { CALENDLY_URL, MIGGLE_URL, ASSETS } from '../lib/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/85 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <a
            href={MIGGLE_URL}
            target="_blank"
            rel="noopener"
            className="flex items-center transition-opacity hover:opacity-80"
            aria-label="Miggle (miggle.one)"
          >
            <AssetImg src={ASSETS.miggleLogo} alt="Miggle" className="h-6 w-auto" />
          </a>
          <a
            href="#top"
            className="border-l border-white/15 pl-3 font-display text-[20px] font-bold tracking-tight text-white"
          >
            Own<span className="text-teal-bright">It</span>
          </a>
        </div>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[15px] text-paper-2/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener"
            className="rounded-lg bg-magenta px-4 py-2 text-[15px] font-semibold text-white transition-colors hover:bg-magenta/90"
          >
            Book a chat
          </a>
        </nav>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener"
          className="rounded-lg bg-magenta px-4 py-2 text-[15px] font-semibold text-white md:hidden"
        >
          Book a chat
        </a>
      </Container>
    </header>
  );
}
