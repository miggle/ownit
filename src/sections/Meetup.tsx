import { useEffect, useState } from 'react';
import { Container, Eyebrow } from '../components/ui';
import { meetup, rsvpForm } from '../lib/content';
import { fetchUpcomingSessions, type MeetupSession } from '../lib/meetup';
import { submitRsvp } from '../lib/rsvp';

function SessionCard({ sessions, loading }: { sessions: MeetupSession[]; loading: boolean }) {
  if (loading) {
    return <div className="rounded-2xl border border-white/10 bg-navy-700/40 p-7 text-paper-2/50">Loading sessions…</div>;
  }
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-navy-700/40 p-7">
        <span className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-slate-400">
          {meetup.emptyState.label}
        </span>
        <h3 className="mt-3 text-[20px] font-semibold text-white">{meetup.emptyState.title}</h3>
        <p className="mt-2 text-[15.5px] leading-relaxed text-paper-2/70">{meetup.emptyState.body}</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {sessions.map((s) => (
        <div key={s.id} className="rounded-2xl border border-teal/30 bg-teal/5 p-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-teal-bright">
              {meetup.seedLabel}
            </span>
            <span className="rounded-full bg-teal/20 px-3 py-1 font-mono text-[12px] text-teal-light">
              {s.status === 'full' ? 'Full' : 'Confirmed'}
            </span>
          </div>
          <h3 className="mt-3 text-[20px] font-semibold text-white">{s.title}</h3>
          <dl className="mt-4 space-y-2 text-[15.5px] text-paper-2/80">
            <div className="flex gap-3">
              <dt className="w-14 font-mono text-[12.5px] text-slate-400">WHEN</dt>
              <dd>{s.dateLabel}, {s.timeLabel}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-14 font-mono text-[12.5px] text-slate-400">WHERE</dt>
              <dd>{s.location}</dd>
            </div>
          </dl>
          <a href="#rsvp" className="mt-5 inline-block rounded-lg bg-teal px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-teal/90">
            Register interest
          </a>
        </div>
      ))}
      <p className="text-[13.5px] text-paper-2/50">{meetup.moreSessions}</p>
    </div>
  );
}

function RsvpForm({ sessions }: { sessions: MeetupSession[] }) {
  const [state, setState] = useState<'idle' | 'submitting' | 'done' | 'duplicate' | 'waitlist' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', sessionId: '', whatBuilding: '', consent: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('submitting');
    try {
      const res = await submitRsvp({
        name: form.name.trim(),
        email: form.email.trim(),
        sessionId: form.sessionId || null,
        whatBuilding: form.whatBuilding.trim() || undefined,
        consent: form.consent,
      });
      setState(res.status === 'duplicate' ? 'duplicate' : res.status === 'waitlist' ? 'waitlist' : 'done');
    } catch {
      setState('error');
    }
  };

  if (state === 'done' || state === 'waitlist' || state === 'duplicate') {
    const body =
      state === 'waitlist' ? rsvpForm.waitlist : state === 'duplicate' ? rsvpForm.duplicate : rsvpForm.success.body;
    return (
      <div className="rounded-2xl border border-teal/30 bg-navy-700/40 p-7 text-center" id="rsvp">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal/20 text-2xl text-teal-light">✓</div>
        <h3 className="mt-4 text-[20px] font-semibold text-white">{rsvpForm.success.title}</h3>
        <p className="mt-2 text-[15.5px] leading-relaxed text-paper-2/70">{body}</p>
      </div>
    );
  }

  const input = 'w-full rounded-lg border border-white/15 bg-navy-900/60 px-4 py-2.5 text-[15px] text-white placeholder:text-paper-2/35 focus:border-teal-bright focus:outline-none';
  const label = 'block text-[14px] font-medium text-paper-2/80';
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value });

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-navy-700/40 p-7" id="rsvp">
      <h3 className="text-[20px] font-semibold text-white">{rsvpForm.heading}</h3>
      <div className="mt-5 space-y-4">
        <div>
          <label className={label} htmlFor="rsvp-name">{rsvpForm.fields.name}</label>
          <input id="rsvp-name" value={form.name} onChange={set('name')} required className={`mt-1.5 ${input}`} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor="rsvp-email">{rsvpForm.fields.email}</label>
          <input id="rsvp-email" type="email" value={form.email} onChange={set('email')} required className={`mt-1.5 ${input}`} placeholder="you@example.com" />
          <p className="mt-1.5 text-[13px] text-paper-2/50">{rsvpForm.fields.emailHelp}</p>
        </div>
        {sessions.length > 0 && (
          <div>
            <label className={label} htmlFor="rsvp-session">{rsvpForm.fields.session}</label>
            <select id="rsvp-session" value={form.sessionId} onChange={set('sessionId')} className={`mt-1.5 ${input}`}>
              {sessions.map((s) => (
                <option key={s.id} value={s.id} className="bg-navy-800">{s.dateLabel}, {s.timeLabel}, {s.location}</option>
              ))}
              <option value="" className="bg-navy-800">Any / let me know about future ones</option>
            </select>
          </div>
        )}
        <div>
          <label className={label} htmlFor="rsvp-building">{rsvpForm.fields.building}</label>
          <textarea id="rsvp-building" value={form.whatBuilding} onChange={set('whatBuilding')} rows={3} className={`mt-1.5 ${input}`} placeholder="A booking tool, a tidier spreadsheet, an app idea… anything." />
        </div>
        <label className="flex items-start gap-3 text-[14.5px] text-paper-2/75">
          <input type="checkbox" checked={form.consent} onChange={set('consent')} required className="mt-1 accent-teal" />
          <span>{rsvpForm.fields.consent}</span>
        </label>
      </div>
      {state === 'error' && <p className="mt-4 text-[14px] text-pink-light">{rsvpForm.error}</p>}
      <button type="submit" disabled={state === 'submitting'} className="mt-6 w-full rounded-xl bg-magenta px-6 py-3 font-display text-[16px] font-semibold text-white transition-colors hover:bg-magenta/90 disabled:opacity-60">
        {state === 'submitting' ? rsvpForm.submitting : rsvpForm.fields.submit}
      </button>
    </form>
  );
}

export function Meetup() {
  const [sessions, setSessions] = useState<MeetupSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingSessions()
      .then(setSessions)
      .catch(() => setSessions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="meetup" className="border-t border-white/5 bg-navy-800/50">
      <Container className="py-20 md:py-24">
        <div className="max-w-3xl">
          <Eyebrow>{meetup.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[28px] font-bold text-white md:text-[34px]">{meetup.heading}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-paper-2/75">{meetup.intro}</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <SessionCard sessions={sessions} loading={loading} />
          <RsvpForm sessions={sessions} />
        </div>
      </Container>
    </section>
  );
}
