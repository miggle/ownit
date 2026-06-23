import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';

export interface AuthState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
}

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

export const signInWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
export const signOut = () => fbSignOut(auth);
