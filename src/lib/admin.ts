import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { MEETUP_SESSIONS, type MeetupSession, type SessionStatus } from './meetup';

export type SessionDraft = {
  title: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  capacity?: number;
  status: SessionStatus;
  notes?: string;
  /** ISO datetime (from a datetime-local input) used to compute startsAt. */
  startsAtIso: string;
};

/** All sessions, soonest first — admin sees past ones too. */
export async function fetchAllSessions(): Promise<MeetupSession[]> {
  const snap = await getDocs(query(collection(db, MEETUP_SESSIONS), orderBy('startsAt', 'asc')));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MeetupSession, 'id'>) }));
}

function toDoc(draft: SessionDraft) {
  return {
    title: draft.title,
    dateLabel: draft.dateLabel,
    timeLabel: draft.timeLabel,
    location: draft.location,
    capacity: draft.capacity ?? null,
    status: draft.status,
    notes: draft.notes ?? '',
    startsAt: Timestamp.fromDate(new Date(draft.startsAtIso)),
  };
}

export const createSession = (draft: SessionDraft) => addDoc(collection(db, MEETUP_SESSIONS), toDoc(draft));
export const updateSession = (id: string, draft: SessionDraft) => updateDoc(doc(db, MEETUP_SESSIONS, id), toDoc(draft));
export const deleteSession = (id: string) => deleteDoc(doc(db, MEETUP_SESSIONS, id));

export interface AdminRsvp {
  id: string;
  name: string;
  email: string;
  sessionId: string | null;
  sessionTitle: string;
  whatBuilding: string;
  waitlisted: boolean;
  createdAt: Timestamp | null;
}

/** RSVPs for a session id, or general-interest RSVPs when sessionId is null. */
export async function fetchRsvps(sessionId: string | null): Promise<AdminRsvp[]> {
  const snap = await getDocs(
    query(collection(db, 'meetupRsvps'), where('sessionId', '==', sessionId)),
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<AdminRsvp, 'id'>) }));
}
