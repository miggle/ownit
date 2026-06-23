import { initializeApp } from 'firebase-admin/app';

initializeApp();

// Functions land here as the backend milestones are built:
//   M2 #12  submitRsvp        — validate, dedupe, rate-limit, write meetupRsvps
//   M2 #13  on RSVP create    — send branded confirmation + notify Alick
//   M3 #14  submitContribution — create a GitHub Issue via server-side token
//
// Each public write path must validate inputs, cap free-text length, and
// rate-limit by email + IP with a TTL (brief §6, NON_FUNCTIONAL_REQUIREMENTS.md).
export {};
