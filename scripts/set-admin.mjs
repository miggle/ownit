// Grants the `admin: true` custom claim to a user, which is what the Firestore
// rules and the /admin view check. Run once for Alick's account after he has
// signed in to the site at least once (so the account exists).
//
// Against the emulator:
//   FIREBASE_AUTH_EMULATOR_HOST=127.0.0.1:9099 GCLOUD_PROJECT=ownit-afc0f \
//     node scripts/set-admin.mjs alick@miggle.one
//
// Against production (needs application-default creds):
//   GCLOUD_PROJECT=<real-project-id> node scripts/set-admin.mjs alick@miggle.one
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/set-admin.mjs <email>');
  process.exit(1);
}

const projectId = process.env.GCLOUD_PROJECT || 'ownit-afc0f';
const usingEmulator = !!process.env.FIREBASE_AUTH_EMULATOR_HOST;

initializeApp(usingEmulator ? { projectId } : { credential: applicationDefault(), projectId });

const auth = getAuth();
const user = await auth.getUserByEmail(email);
await auth.setCustomUserClaims(user.uid, { admin: true });
console.log(`Granted admin to ${email} (uid ${user.uid}). They must sign out/in for it to take effect.`);
process.exit(0);
