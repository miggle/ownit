import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface RsvpInput {
  name: string;
  email: string;
  /** Session id, or null for general interest. */
  sessionId: string | null;
  whatBuilding?: string;
  consent: boolean;
}

export type RsvpResult = { status: 'ok' | 'duplicate' | 'waitlist' };

const callable = httpsCallable<RsvpInput, RsvpResult>(functions, 'submitRsvp');

export async function submitRsvp(input: RsvpInput): Promise<RsvpResult> {
  const res = await callable(input);
  return res.data;
}
