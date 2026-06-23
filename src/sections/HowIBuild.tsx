import { Container, Eyebrow } from '../components/ui';
import { howIBuild, pillars, principles, builtPrinciples, runPrinciples } from '../lib/content';

function PrincipleList({ title, items, accent }: { title: string; items: typeof builtPrinciples; accent: 'teal' | 'magenta' }) {
  const dot = accent === 'magenta' ? 'text-magenta' : 'text-teal-bright';
  return (
    <div>
      <h4 className="font-display text-[18px] font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-3.5">
        {items.map((p) => (
          <li key={p.lead} className="flex gap-3 text-[15.5px] leading-relaxed text-paper-2/75">
            <span className={`mt-0.5 shrink-0 ${dot}`}>→</span>
            <span>
              <span className="font-semibold text-white">{p.lead}.</span> {p.desc}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HowIBuild() {
  return (
    <section id="build" className="border-t border-white/5 bg-navy-800/50">
      <Container className="py-20 md:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{howIBuild.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[28px] font-bold text-white md:text-[34px]">{howIBuild.heading}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-paper-2/75">{howIBuild.intro}</p>
        </div>

        {/* Three pillars */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-white/10 bg-navy-700/40 p-7">
              <span className="font-mono text-[13px] text-teal-bright">{p.step}</span>
              <h3 className="mt-3 text-[20px] font-semibold text-white">{p.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-paper-2/70">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Guiding principles — the differentiator */}
        <div className="mt-14 max-w-3xl">
          <Eyebrow accent="magenta">{principles.eyebrow}</Eyebrow>
          <h3 className="mt-4 text-[24px] font-bold text-white md:text-[28px]">{principles.heading}</h3>
          <p className="mt-5 text-[16.5px] leading-relaxed text-paper-2/75">{principles.intro}</p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <PrincipleList title="How it's built" items={builtPrinciples} accent="teal" />
          <PrincipleList title="How it's run" items={runPrinciples} accent="magenta" />
        </div>

        <p className="mt-12 max-w-3xl rounded-2xl border border-white/10 bg-navy-700/30 p-7 text-[16.5px] leading-relaxed text-paper-2/80">
          {principles.closing}
        </p>
      </Container>
    </section>
  );
}
