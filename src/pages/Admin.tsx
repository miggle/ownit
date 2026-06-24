import { useEffect, useState } from 'react';
import { useAuth, requestSignInEmail, completeSignInFromLink, urlIsSignInLink, signOut } from '../lib/auth';
import {
  fetchAllSessions,
  createSession,
  updateSession,
  deleteSession,
  fetchRsvps,
  type SessionDraft,
  type AdminRsvp,
} from '../lib/admin';
import type { MeetupSession } from '../lib/meetup';

const shell = 'min-h-screen bg-navy-900 text-paper-2';
const card = 'rounded-2xl border border-white/10 bg-navy-700/40 p-6';
const input = 'w-full rounded-lg border border-white/15 bg-navy-900/60 px-3 py-2 text-[14px] text-white focus:border-teal-bright focus:outline-none';
const btn = 'rounded-lg bg-teal px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-teal/90';

const emptyDraft: SessionDraft = {
  title: '',
  dateLabel: '',
  timeLabel: '',
  location: '',
  status: 'upcoming',
  startsAtIso: '',
};

export function Admin() {
  const { user, isAdmin, loading } = useAuth();
  // Computed synchronously on first render so the form never flashes before we
  // know we're mid-sign-in (the endgame pattern).
  const [completing, setCompleting] = useState(urlIsSignInLink());
  const [needEmail, setNeedEmail] = useState(false);
  const [linkError, setLinkError] = useState(false);

  // If we arrived via a magic link, finish the sign-in. On success we do NOT
  // drop the gate here — onAuthStateChanged hasn't populated `user` yet, and
  // dropping it now would flash the sign-in form for one render. The effect
  // below clears it once `user` actually arrives.
  useEffect(() => {
    if (!urlIsSignInLink()) return;
    completeSignInFromLink()
      .then((r) => {
        if (r === 'need-email') {
          setNeedEmail(true);
          setCompleting(false);
        }
      })
      .catch(() => {
        setLinkError(true);
        setCompleting(false);
      });
  }, []);

  // Drop the magic-link gate only once auth reflects the signed-in user.
  useEffect(() => {
    if (user) setCompleting(false);
  }, [user]);

  if (completing) return <Centered>Completing sign-in…</Centered>;
  if (needEmail) return <CompleteWithEmail onError={() => setLinkError(true)} />;
  if (loading) return <Centered>Checking sign-in…</Centered>;

  if (!user) return <SignIn linkError={linkError} />;

  if (!isAdmin) {
    return (
      <Centered>
        <h1 className="font-display text-[24px] font-bold text-white">Not authorised</h1>
        <p className="mt-2 max-w-md text-paper-2/70">
          {user.email} doesn’t have admin access. If you think it should, contact the site owner.
        </p>
        <button onClick={() => signOut()} className="mt-6 text-teal-bright hover:underline">Sign out</button>
      </Centered>
    );
  }

  return <Dashboard email={user.email ?? ''} />;
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${shell} flex flex-col items-center justify-center px-6 text-center`}>{children}</div>
  );
}

function SignIn({ linkError }: { linkError: boolean }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      await requestSignInEmail(email);
      setState('sent');
    } catch {
      setState('error');
    }
  };

  if (state === 'sent') {
    return (
      <Centered>
        <h1 className="font-display text-[24px] font-bold text-white">Check your inbox</h1>
        <p className="mt-2 max-w-md text-paper-2/70">
          If {email} can access the admin, a sign-in link is on its way. Open it on this device to continue.
        </p>
      </Centered>
    );
  }

  return (
    <Centered>
      <h1 className="font-display text-[28px] font-bold text-white">OwnIt admin</h1>
      <p className="mt-2 text-paper-2/70">Enter your email and I’ll send you a sign-in link.</p>
      {linkError && <p className="mt-3 text-[14px] text-pink-light">That sign-in link didn’t work. Request a fresh one.</p>}
      <form onSubmit={submit} className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@miggle.one"
          className={input}
        />
        <button type="submit" disabled={state === 'sending'} className={`${btn} disabled:opacity-60`}>
          {state === 'sending' ? 'Sending…' : 'Email me a sign-in link'}
        </button>
        {state === 'error' && <p className="text-[14px] text-pink-light">Couldn’t send that. Please try again.</p>}
      </form>
    </Centered>
  );
}

/** Magic link opened on a device without the stored email — ask for it. */
function CompleteWithEmail({ onError }: { onError: () => void }) {
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await completeSignInFromLink(email);
      window.location.reload();
    } catch {
      onError();
      setBusy(false);
    }
  };

  return (
    <Centered>
      <h1 className="font-display text-[24px] font-bold text-white">Confirm your email</h1>
      <p className="mt-2 max-w-md text-paper-2/70">To finish signing in, enter the email you requested the link with.</p>
      <form onSubmit={submit} className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@miggle.one" className={input} />
        <button type="submit" disabled={busy} className={`${btn} disabled:opacity-60`}>
          {busy ? 'Signing in…' : 'Complete sign-in'}
        </button>
      </form>
    </Centered>
  );
}

function Dashboard({ email }: { email: string }) {
  const [sessions, setSessions] = useState<MeetupSession[]>([]);
  const [draft, setDraft] = useState<SessionDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = () => fetchAllSessions().then(setSessions).catch(() => setSessions([]));
  useEffect(() => { void load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (editingId) await updateSession(editingId, draft);
      else await createSession(draft);
      setDraft(emptyDraft);
      setEditingId(null);
      await load();
    } finally {
      setBusy(false);
    }
  };

  const edit = (s: MeetupSession) => {
    setEditingId(s.id);
    setDraft({
      title: s.title,
      dateLabel: s.dateLabel,
      timeLabel: s.timeLabel,
      location: s.location,
      capacity: s.capacity,
      status: s.status,
      notes: s.notes,
      startsAtIso: s.startsAt?.toDate().toISOString().slice(0, 16) ?? '',
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this session?')) return;
    await deleteSession(id);
    await load();
  };

  const set = (k: keyof SessionDraft) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setDraft({ ...draft, [k]: k === 'capacity' ? (e.target.value ? Number(e.target.value) : undefined) : e.target.value });

  return (
    <div className={shell}>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-4">
          <span className="font-display text-[18px] font-bold text-white">OwnIt admin</span>
          <div className="flex items-center gap-4 text-[14px] text-paper-2/60">
            <span>{email}</span>
            <button onClick={() => signOut()} className="text-teal-bright hover:underline">Sign out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] space-y-8 px-6 py-10">
        <section>
          <h2 className="font-display text-[20px] font-bold text-white">{editingId ? 'Edit session' : 'Add a session'}</h2>
          <form onSubmit={save} className={`mt-4 ${card} grid gap-3 sm:grid-cols-2`}>
            <Field label="Title"><input className={input} value={draft.title} onChange={set('title')} required /></Field>
            <Field label="Starts at"><input type="datetime-local" className={input} value={draft.startsAtIso} onChange={set('startsAtIso')} required /></Field>
            <Field label="Date label (e.g. Monday 1 September 2026)"><input className={input} value={draft.dateLabel} onChange={set('dateLabel')} required /></Field>
            <Field label="Time label (e.g. 7:00pm)"><input className={input} value={draft.timeLabel} onChange={set('timeLabel')} required /></Field>
            <Field label="Location"><input className={input} value={draft.location} onChange={set('location')} required /></Field>
            <Field label="Capacity (optional)"><input type="number" min="1" className={input} value={draft.capacity ?? ''} onChange={set('capacity')} /></Field>
            <Field label="Status">
              <select className={input} value={draft.status} onChange={set('status')}>
                <option value="upcoming">upcoming</option>
                <option value="full">full</option>
                <option value="past">past</option>
              </select>
            </Field>
            <div className="flex items-end gap-3">
              <button type="submit" disabled={busy} className={`${btn} disabled:opacity-60`}>{editingId ? 'Save changes' : 'Add session'}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setDraft(emptyDraft); }} className="text-[14px] text-paper-2/60 hover:underline">Cancel</button>}
            </div>
          </form>
        </section>

        <section>
          <h2 className="font-display text-[20px] font-bold text-white">Sessions</h2>
          <div className="mt-4 space-y-3">
            {sessions.length === 0 && <p className="text-paper-2/50">No sessions yet.</p>}
            {sessions.map((s) => (
              <div key={s.id} className={`${card} flex flex-wrap items-center justify-between gap-3`}>
                <div>
                  <div className="font-semibold text-white">{s.title} <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] text-paper-2/60">{s.status}</span></div>
                  <div className="text-[14px] text-paper-2/60">{s.dateLabel}, {s.timeLabel} · {s.location}</div>
                </div>
                <div className="flex items-center gap-3 text-[14px]">
                  <button onClick={() => edit(s)} className="text-teal-bright hover:underline">Edit</button>
                  <button onClick={() => remove(s.id)} className="text-pink-light hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <RsvpViewer sessions={sessions} />
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] text-paper-2/70">{label}</span>
      {children}
    </label>
  );
}

function RsvpViewer({ sessions }: { sessions: MeetupSession[] }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [rsvps, setRsvps] = useState<AdminRsvp[]>([]);
  const [loading, setLoading] = useState(false);

  const load = (id: string | null) => {
    setSessionId(id);
    setLoading(true);
    fetchRsvps(id).then(setRsvps).catch(() => setRsvps([])).finally(() => setLoading(false));
  };

  return (
    <section>
      <h2 className="font-display text-[20px] font-bold text-white">RSVPs</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => load(null)} className={`rounded-lg border border-white/15 px-3 py-1.5 text-[13px] ${sessionId === null ? 'bg-white/10' : ''}`}>General interest</button>
        {sessions.map((s) => (
          <button key={s.id} onClick={() => load(s.id)} className={`rounded-lg border border-white/15 px-3 py-1.5 text-[13px] ${sessionId === s.id ? 'bg-white/10' : ''}`}>{s.dateLabel}</button>
        ))}
      </div>
      <div className={`mt-4 ${card}`}>
        {loading ? (
          <p className="text-paper-2/50">Loading…</p>
        ) : rsvps.length === 0 ? (
          <p className="text-paper-2/50">No RSVPs here yet.</p>
        ) : (
          <table className="w-full text-left text-[14px]">
            <thead className="text-paper-2/50">
              <tr><th className="pb-2">Name</th><th className="pb-2">Email</th><th className="pb-2">Building</th><th className="pb-2"></th></tr>
            </thead>
            <tbody>
              {rsvps.map((r) => (
                <tr key={r.id} className="border-t border-white/5">
                  <td className="py-2 text-white">{r.name}</td>
                  <td className="py-2 text-paper-2/70">{r.email}</td>
                  <td className="py-2 text-paper-2/60">{r.whatBuilding || '—'}</td>
                  <td className="py-2">{r.waitlisted && <span className="rounded-full bg-magenta/20 px-2 py-0.5 font-mono text-[11px] text-pink-light">waitlist</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
