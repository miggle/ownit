import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { logger } from 'firebase-functions/v2';
import { getAwsSecrets } from './lib/vaultSecrets.js';

// Reuses the SES identity already verified in the shared Miggle AWS account
// (eu-west-2), same as endgame — so no new domain verification is needed.
const SES_REGION = 'eu-west-2';
const FROM = 'OwnIt <noreply@susig.miggle.co>';
const NOTIFY = 'info@miggle.one'; // Alick's notification inbox

let sesClient: SESClient | null = null;
async function ses(): Promise<SESClient> {
  if (sesClient) return sesClient;
  const { awsAccessKeyId, awsSecretAccessKey } = await getAwsSecrets();
  sesClient = new SESClient({
    region: SES_REGION,
    credentials: { accessKeyId: awsAccessKeyId, secretAccessKey: awsSecretAccessKey },
  });
  return sesClient;
}

async function send(to: string, subject: string, text: string, html?: string) {
  const client = await ses();
  await client.send(
    new SendEmailCommand({
      Source: FROM,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: 'UTF-8' },
        Body: {
          Text: { Data: text, Charset: 'UTF-8' },
          ...(html ? { Html: { Data: html, Charset: 'UTF-8' } } : {}),
        },
      },
    }),
  );
}

export interface RsvpEmailData {
  name: string;
  email: string;
  sessionTitle: string;
  sessionLabel: string | null;
  whatBuilding: string;
  waitlisted: boolean;
}

/** Confirmation to the registrant + notification to Alick (brief §8 copy). */
export async function sendRsvpEmails(data: RsvpEmailData) {
  const sessionLine = data.sessionLabel
    ? `You're down for ${data.sessionTitle} on ${data.sessionLabel}.`
    : `I'll email you as soon as the next session's date and place are confirmed.`;
  const waitlistLine = data.waitlisted
    ? `\nThis session is currently full, so you're on the waitlist. I'll be in touch if a space opens up.\n`
    : '';

  const confirmationText =
    `Thanks for registering your interest in the meetup.\n\n` +
    `${sessionLine}\n${waitlistLine}\n` +
    `It's an informal session. Come with whatever you're trying to build and we'll dig in together.\n\n` +
    `If you can no longer make it, just reply and let me know.\n\n` +
    `See you there,\nAlick · miggle.one`;

  const notificationText =
    `${data.name} (${data.email}) registered for ${data.sessionLabel ? data.sessionTitle : 'general interest'}.\n` +
    `Building: ${data.whatBuilding || 'not given'}.` +
    (data.waitlisted ? '\n(Waitlisted — session full.)' : '');

  try {
    await Promise.all([
      send(data.email, "You're on the list: OwnIt meetup", confirmationText),
      send(NOTIFY, `New meetup RSVP: ${data.name}`, notificationText),
    ]);
  } catch (err) {
    // Don't fail the RSVP write if email hiccups; surface for monitoring.
    logger.error('Failed to send RSVP emails', err);
  }
}

/** Magic-link sign-in email for the /admin area (same shape as endgame). */
export async function sendSignInEmail(email: string, signInLink: string) {
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' });
  const text =
    `Hello,\n\n` +
    `You're receiving this because someone tried to sign in to the OwnIt admin using ${email}.\n\n` +
    `If this was you, use the link below to complete sign-in:\n${signInLink}\n\n` +
    `If you did not request this link, you can safely ignore this email.\n\n` +
    `Thanks,\nThe Miggle team`;
  const html = `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#0f2334;color:#f4f6f8;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#0f8576;color:#fff;padding:18px;text-align:center;border-radius:8px 8px 0 0;"><h1 style="margin:0;font-size:20px;">OwnIt admin</h1></div>
    <div style="background:#162f43;padding:24px;border-radius:0 0 8px 8px;">
      <p>Hello,</p>
      <p>You're receiving this because someone tried to sign in to the OwnIt admin using <strong>${email}</strong>.</p>
      <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin:20px auto;"><tr><td bgcolor="#e6356e" style="border-radius:6px;">
        <a href="${signInLink}" style="display:inline-block;background:#e6356e;color:#fff;padding:12px 22px;text-decoration:none;border-radius:6px;font-weight:600;">Sign in</a>
      </td></tr></table>
      <p style="font-size:13px;color:#9fb0bb;word-break:break-all;">${signInLink}</p>
      <p>If you did not request this link, you can safely ignore this email.</p>
      <p>Thanks,<br>The Miggle team</p>
    </div>
  </div></body></html>`;
  await send(email, `OwnIt admin sign-in requested ${date}`, text, html);
}
