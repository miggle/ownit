import { useEffect, useState } from 'react';
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { auth, functions } from './firebase';

export interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

const STORAGE_KEY = 'ownit:emailForSignIn';

/** Tracks the signed-in user and whether they carry the `admin` custom claim. */
export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ user: null, isAdmin: false, loading: true });

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false });
        return;
      }
      // Force-refresh so a freshly-granted claim is picked up.
      const token = await user.getIdTokenResult(true);
      setState({ user, isAdmin: token.claims.admin === true, loading: false });
    });
  }, []);

  return state;
}

const callSendSignInEmail = httpsCallable<{ email: string; continueUrl: string }, { success: boolean }>(
  functions,
  'sendAdminSignInEmail',
);

/** Ask the backend to email a magic sign-in link for the /admin area. */
export async function requestSignInEmail(email: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  await callSendSignInEmail({ email: normalized, continueUrl: `${window.location.origin}/admin` });
  window.localStorage.setItem(STORAGE_KEY, normalized);
}

/** True if the current URL is a Firebase email sign-in link. */
export const urlIsSignInLink = () => isSignInWithEmailLink(auth, window.location.href);

/**
 * Completes sign-in when arriving via a magic link. Returns the email it needs
 * if it can't find the stored one (e.g. link opened on another device), so the
 * caller can prompt for it.
 */
export async function completeSignInFromLink(emailOverride?: string): Promise<'done' | 'need-email'> {
  if (!isSignInWithEmailLink(auth, window.location.href)) return 'done';
  const email = emailOverride?.trim().toLowerCase() || window.localStorage.getItem(STORAGE_KEY);
  if (!email) return 'need-email';
  await signInWithEmailLink(auth, email, window.location.href);
  window.localStorage.removeItem(STORAGE_KEY);
  // Strip the link params from the URL.
  window.history.replaceState({}, '', '/admin');
  return 'done';
}

export const signOut = () => fbSignOut(auth);
