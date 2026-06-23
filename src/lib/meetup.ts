import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type SessionStatus = 'upcoming' | 'full' | 'past';

export interface MeetupSession {
  id: string;
  title: string;
  /** Human-readable date, e.g. "Monday 1 September 2026". */
  dateLabel: string;
  /** Human-readable time, e.g. "7:00pm". */
  timeLabel: string;
  location: string;
  capacity?: number;
  status: SessionStatus;
  notes?: string;
  /** Used for sorting and to drive the empty state. */
  startsAt: Timestamp;
}

export const MEETUP_SESSIONS = 'meetupSessions';

/** Upcoming/full sessions, soonest first. Empty array => show the empty state. */
export async function fetchUpcomingSessions(): Promise<MeetupSession[]> {
  const q = query(
    collection(db, MEETUP_SESSIONS),
    where('status', 'in', ['upcoming', 'full']),
    orderBy('startsAt', 'asc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MeetupSession, 'id'>) }));
}
