import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { setGlobalOptions } from 'firebase-functions/v2';
import { defineSecret } from 'firebase-functions/params';
import { sendRsvpEmails, sendSignInEmail } from './email.js';
import { createIssue } from './github.js';

// GitHub PAT (issues:write on miggle/ownit), held in this project's Secret Manager.
const GITHUB_TOKEN = defineSecret('GITHUB_TOKEN');

initializeApp();
const db = getFirestore();

// London region, to match the web client (getFunctions(app, 'europe-west2')).
setGlobalOptions({ region: 'europe-west2', maxInstances: 10 });

const MAX_BUILDING_LEN = 1000;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // submissions per email+IP per window

interface RsvpInput {
  name?: unknown;
  email?: unknown;
  sessionId?: unknown;
  whatBuilding?: unknown;
  consent?: unknown;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/**
 * Public write path for meetup RSVPs. Validates, rate-limits by email+IP,
 * dedupes one-per-email-per-session, and honours session capacity.
 * (brief §6, NON_FUNCTIONAL_REQUIREMENTS.md)
 */
export const submitRsvp = onCall<RsvpInput>(async (request) => {
  const d = request.data ?? {};
  const name = typeof d.name === 'string' ? d.name.trim() : '';
  const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : '';
  const sessionId = typeof d.sessionId === 'string' && d.sessionId ? d.sessionId : null;
  const whatBuilding = typeof d.whatBuilding === 'string' ? d.whatBuilding.trim().slice(0, MAX_BUILDING_LEN) : '';
  const consent = d.consent === true;

  if (!name || name.length > 120) throw new HttpsError('invalid-argument', 'A valid name is required.');
  if (!isEmail(email)) throw new HttpsError('invalid-argument', 'A valid email is required.');
  if (!consent) throw new HttpsError('invalid-argument', 'Consent is required to register.');

  const ip = request.rawRequest.ip ?? 'unknown';
  await enforceRateLimit(email, ip);

  // Look up the session (if a specific one was chosen) for capacity + emails.
  let sessionTitle = 'general interest';
  let sessionLabel: string | null = null;
  let capacity: number | undefined;
  if (sessionId) {
    const sessionSnap = await db.collection('meetupSessions').doc(sessionId).get();
    if (!sessionSnap.exists) throw new HttpsError('not-found', 'That session no longer exists.');
    const s = sessionSnap.data()!;
    sessionTitle = s.title ?? sessionTitle;
    sessionLabel = `${s.dateLabel}, ${s.timeLabel}, ${s.location}`;
    capacity = typeof s.capacity === 'number' ? s.capacity : undefined;
  }

  const rsvps = db.collection('meetupRsvps');

  // Dedupe: one RSVP per email per session (general interest dedupes on null).
  const dupe = await rsvps.where('email', '==', email).where('sessionId', '==', sessionId).limit(1).get();
  if (!dupe.empty) return { status: 'duplicate' as const };

  // Capacity → waitlist.
  let waitlisted = false;
  if (sessionId && capacity !== undefined) {
    const count = (await rsvps.where('sessionId', '==', sessionId).where('waitlisted', '==', false).count().get()).data().count;
    if (count >= capacity) waitlisted = true;
  }

  await rsvps.add({
    name,
    email,
    sessionId,
    sessionTitle,
    sessionLabel,
    whatBuilding,
    consent,
    waitlisted,
    ip,
    createdAt: FieldValue.serverTimestamp(),
  });

  return { status: waitlisted ? ('waitlist' as const) : ('ok' as const) };
});

/** Sliding-ish window rate limit keyed on email+IP, stored with a TTL field. */
async function enforceRateLimit(email: string, ip: string) {
  const key = `${email}|${ip}`.replace(/[^a-zA-Z0-9@.|-]/g, '_');
  const ref = db.collection('rateLimits').doc(key);
  const now = Date.now();
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.data();
    const windowStart = data?.windowStart?.toMillis?.() ?? 0;
    let count = data?.count ?? 0;
    if (now - windowStart > RATE_LIMIT_WINDOW_MS) count = 0;
    if (count >= RATE_LIMIT_MAX) {
      throw new HttpsError('resource-exhausted', 'Too many attempts. Please try again later.');
    }
    const fresh = now - windowStart > RATE_LIMIT_WINDOW_MS;
    tx.set(ref, {
      count: count + 1,
      windowStart: fresh ? Timestamp.fromMillis(now) : (data?.windowStart ?? Timestamp.fromMillis(now)),
      // Firestore TTL policy on this field cleans the doc up automatically.
      expiresAt: Timestamp.fromMillis(now + RATE_LIMIT_WINDOW_MS),
    });
  });
}

/** On each RSVP, send the registrant a confirmation and (optionally) notify Alick. */
export const onRsvpCreated = onDocumentCreated('meetupRsvps/{rsvpId}', async (event) => {
  const rsvp = event.data?.data();
  if (!rsvp) return;
  await sendRsvpEmails({
    name: rsvp.name,
    email: rsvp.email,
    sessionTitle: rsvp.sessionTitle,
    sessionLabel: rsvp.sessionLabel ?? null,
    whatBuilding: rsvp.whatBuilding ?? '',
    waitlisted: rsvp.waitlisted ?? false,
  });
});

const isEmailShape = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/**
 * Magic-link sign-in for the /admin area. Generates a Firebase email sign-in
 * link server-side and sends it via SES. Anyone can request a link, but only an
 * account carrying the `admin` custom claim can actually use the admin views
 * (enforced by Firestore rules + the client guard), so this is safe to leave open.
 */
export const sendAdminSignInEmail = onCall<{ email?: unknown; continueUrl?: unknown }>(async (request) => {
  const email = typeof request.data?.email === 'string' ? request.data.email.trim().toLowerCase() : '';
  const continueUrl = typeof request.data?.continueUrl === 'string' ? request.data.continueUrl : '';
  if (!isEmailShape(email)) throw new HttpsError('invalid-argument', 'A valid email is required.');
  if (!continueUrl) throw new HttpsError('invalid-argument', 'A continue URL is required.');

  const link = await getAuth().generateSignInWithEmailLink(email, { url: continueUrl, handleCodeInApp: true });
  await sendSignInEmail(email, link);
  return { success: true };
});

const MAX_IDEA_LEN = 5000;
const MAX_NAME_LEN = 120;

/**
 * Public contribution form → a GitHub Issue on miggle/ownit, created with a
 * server-side token (never exposed to the client). Validated and rate-limited
 * on this public write path (brief §6).
 */
export const submitContribution = onCall<{ idea?: unknown; name?: unknown; email?: unknown }>(
  { secrets: [GITHUB_TOKEN] },
  async (request) => {
    const d = request.data ?? {};
    const idea = typeof d.idea === 'string' ? d.idea.trim().slice(0, MAX_IDEA_LEN) : '';
    const name = typeof d.name === 'string' ? d.name.trim().slice(0, MAX_NAME_LEN) : '';
    const email = typeof d.email === 'string' ? d.email.trim() : '';
    if (idea.length < 5) throw new HttpsError('invalid-argument', 'Please share a bit more detail.');
    if (email && !isEmailShape(email)) throw new HttpsError('invalid-argument', 'That email looks invalid.');

    const ip = request.rawRequest.ip ?? 'unknown';
    await enforceRateLimit(email || 'contrib', ip);

    // First line (capped) becomes the issue title; full idea + attribution the body.
    const firstLine = idea.split('\n')[0].slice(0, 80);
    const title = `Contribution: ${firstLine}${firstLine.length < idea.split('\n')[0].length ? '…' : ''}`;
    const attribution = name || email ? `\n\n— ${[name, email].filter(Boolean).join(' · ')}` : '\n\n— (submitted anonymously)';
    const body = `${idea}${attribution}\n\n_Submitted via the OwnIt site contribution form._`;

    const issue = await createIssue(GITHUB_TOKEN.value(), { title, body });
    return { status: 'ok' as const, issue: issue.number };
  },
);
