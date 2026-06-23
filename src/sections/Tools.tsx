import { Container, Eyebrow } from '../components/ui';
import { tools, toolSteps } from '../lib/content';

export function Tools() {
  return (
    <section id="tools" className="border-t border-white/5">
      <Container className="py-20 md:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{tools.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[28px] font-bold text-white md:text-[34px]">{tools.heading}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-paper-2/75">{tools.intro}</p>
          <p className="mt-3 font-mono text-[13px] text-teal-bright">★ {tools.pickNote}</p>
        </div>

        <div className="mt-10 space-y-4">
          {toolSteps.map((step) => (
            <div
              key={step.n}
              className="grid gap-4 rounded-2xl border border-white/10 bg-navy-700/40 p-7 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-7"
            >
              <span className="font-mono text-[26px] font-medium text-slate-400">{step.n}</span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-[20px] font-semibold text-white">{step.title}</h3>
                  {step.pick && (
                    <span className="rounded-full bg-teal/15 px-3 py-1 font-mono text-[12.5px] text-teal-light">
                      ★ {step.pick}
                    </span>
                  )}
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[12.5px] text-slate-400">
                    {step.cost}
                  </span>
                </div>
                <p className="mt-1 text-[14px] italic text-paper-2/55">{step.whatis}</p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-paper-2/75">{step.why}</p>
                {step.own && <p className="mt-2 text-[15px] font-medium text-teal-light">{step.own}</p>}
              </div>
              {step.url && (
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener"
                  className="self-start whitespace-nowrap rounded-lg border border-white/15 px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {step.linkLabel} →
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
