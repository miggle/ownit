import { defineSecret } from 'firebase-functions/params';
import { logger } from 'firebase-functions/v2';
import nodemailer from 'nodemailer';

// SMTP credentials are secret-managed (never in code). Set with:
//   firebase functions:secrets:set SMTP_HOST   (etc.)
export const SMTP_HOST = defineSecret('SMTP_HOST');
export const SMTP_PORT = defineSecret('SMTP_PORT');
export const SMTP_USER = defineSecret('SMTP_USER');
export const SMTP_PASS = defineSecret('SMTP_PASS');

/** Bind these to any function that sends mail (see index.ts). */
export const EMAIL_SECRETS = [SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS];

const FROM = 'OwnIt <info@miggle.one>';
const NOTIFY = 'info@miggle.one'; // Alick's notification inbox

export interface RsvpEmailData {
  name: string;
  email: string;
  sessionTitle: string;
  sessionLabel: string | null;
  whatBuilding: string;
  waitlisted: boolean;
}

function transport() {
  const host = SMTP_HOST.value();
  if (!host) return null; // not configured (e.g. local emulator) → log only
  return nodemailer.createTransport({
    host,
    port: Number(SMTP_PORT.value() || 587),
    secure: Number(SMTP_PORT.value() || 587) === 465,
    auth: { user: SMTP_USER.value(), pass: SMTP_PASS.value() },
  });
}

export async function sendRsvpEmails(data: RsvpEmailData) {
  const t = transport();

  const sessionLine = data.sessionLabel
    ? `You're down for ${data.sessionTitle} on ${data.sessionLabel}.`
    : `I'll email you as soon as the next session's date and place are confirmed.`;
  const waitlistLine = data.waitlisted
    ? `\nThis session is currently full, so you're on the waitlist. I'll be in touch if a space opens up.\n`
    : '';

  const confirmation = {
    from: FROM,
    to: data.email,
    subject: "You're on the list: OwnIt meetup",
    text:
      `Thanks for registering your interest in the meetup.\n\n` +
      `${sessionLine}\n${waitlistLine}\n` +
      `It's an informal session. Come with whatever you're trying to build and we'll dig in together.\n\n` +
      `If you can no longer make it, just reply and let me know.\n\n` +
      `See you there,\nAlick · miggle.one`,
  };

  const notification = {
    from: FROM,
    to: NOTIFY,
    subject: `New meetup RSVP: ${data.name}`,
    text:
      `${data.name} (${data.email}) registered for ${data.sessionLabel ? data.sessionTitle : 'general interest'}.\n` +
      `Building: ${data.whatBuilding || 'not given'}.` +
      (data.waitlisted ? '\n(Waitlisted — session full.)' : ''),
  };

  if (!t) {
    logger.info('SMTP not configured; would have sent RSVP emails', { confirmation, notification });
    return;
  }
  await Promise.all([t.sendMail(confirmation), t.sendMail(notification)]);
}
