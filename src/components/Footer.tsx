import { Container, AssetImg } from './ui';
import { footer } from '../lib/content';
import { MIGGLE_URL, PHONE, ASSETS, contactEmail, openMail } from '../lib/site';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-800">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="font-display text-[22px] font-bold text-white">
              Own<span className="text-teal-bright">It</span>
            </div>
            <p className="mt-2 max-w-xs text-[15px] text-paper-2/60">{footer.tagline}</p>
            <a href={MIGGLE_URL} target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 text-[13px] text-paper-2/50 transition-colors hover:text-paper-2/80">
              <span>Part of</span>
              <AssetImg src={ASSETS.miggleLogo} alt="Miggle" className="h-5 w-auto opacity-80" />
            </a>
          </div>
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-slate-400">Contact</div>
            <ul className="mt-3 space-y-2 text-[15px] text-paper-2/80">
              <li>
                {/* Email assembled at runtime — no plain mailto: in source. */}
                <a href="#" onClick={openMail} className="transition-colors hover:text-white">
                  {contactEmail()}
                </a>
              </li>
              <li>{PHONE}</li>
              <li>
                <a href={MIGGLE_URL} target="_blank" rel="noopener" className="transition-colors hover:text-white">
                  miggle.one
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.08em] text-slate-400">Legal</div>
            <ul className="mt-3 space-y-2 text-[15px] text-paper-2/80">
              <li>
                <a href="/terms" className="transition-colors hover:text-white">Terms</a>
              </li>
              <li>
                <a href="/privacy" className="transition-colors hover:text-white">Privacy</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">Cookie settings</a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-[18px]">
          <p className="text-[12.5px] text-paper-2/40">© 2026 Miggle Ltd · A subdomain of miggle.one</p>
        </Container>
      </div>
    </footer>
  );
}
