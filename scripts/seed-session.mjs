// Seeds the confirmed first meetup session (brief §7). Bootstrap only — ongoing
// management happens through the authed admin view.
//
// Against the emulator:
//   FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 GCLOUD_PROJECT=ownit-afc0f node scripts/seed-session.mjs
//
// Against production (needs gcloud application-default creds or GOOGLE_APPLICATION_CREDENTIALS):
//   GCLOUD_PROJECT=<real-project-id> node scripts/seed-session.mjs
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const projectId = process.env.GCLOUD_PROJECT || 'ownit-afc0f';
const usingEmulator = !!process.env.FIRESTORE_EMULATOR_HOST;

initializeApp(
  usingEmulator ? { projectId } : { credential: applicationDefault(), projectId },
);

const db = getFirestore();

const session = {
  title: 'OwnIt meetup · Session 01',
  dateLabel: 'Monday 1 September 2026',
  timeLabel: '7:00pm',
  location: 'BN6 Craft and Tap, Hassocks',
  status: 'upcoming',
  notes: '',
  // 2026-09-01 19:00 BST (Europe/London, UTC+1)
  startsAt: Timestamp.fromDate(new Date('2026-09-01T18:00:00Z')),
};

const ref = db.collection('meetupSessions').doc('session-01');
await ref.set(session, { merge: true });
console.log(`Seeded ${ref.path} (${usingEmulator ? 'emulator' : 'production'})`);
process.exit(0);
