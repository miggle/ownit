import { LegalShell, LegalSection } from './LegalShell';
import { contactEmail, openMail } from '../../lib/site';

const ul = 'list-disc space-y-1.5 pl-5 text-paper-2/75';

export function Privacy() {
  return (
    <LegalShell title="Privacy & Cookie Policy" updated="24 June 2026">
      <p>
        OwnIt (ownit.miggle.co) is run by Miggle Ltd. This policy explains what data we collect, why, and your
        rights over it. We collect only what we need, and we never sell your data.
      </p>

      <LegalSection heading="1. What we collect">
        <p>We only collect data you actively give us:</p>
        <ul className={ul}>
          <li><strong>Meetup RSVPs:</strong> your name, email address, your consent to be emailed, and optionally what you’re hoping to build.</li>
          <li><strong>Contributions:</strong> the suggestion you submit, and optionally your name and email.</li>
          <li><strong>Admin sign-in</strong> (Alick only): email address, for authentication.</li>
        </ul>
        <p>We do not run analytics, advertising, or third-party tracking on this site.</p>
      </LegalSection>

      <LegalSection heading="2. How we use it">
        <ul className={ul}>
          <li><strong>RSVPs:</strong> to confirm your place and email you about the meetup you registered for. We email you only because you ticked the consent box, and you can unsubscribe any time.</li>
          <li><strong>Contributions:</strong> to consider and act on your suggestion. Note: contributions are posted to our public GitHub repository as issues, so anything you submit (including a name or email if you add one) will be publicly visible there. Leave those blank to stay anonymous.</li>
          <li><strong>Admin email:</strong> solely to authenticate the site owner.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Storage & security">
        <p>
          Data is stored in Google Cloud (Firebase) in the UK region (europe-west2), encrypted in transit and at
          rest. Access is controlled by Firebase Authentication and server-side Firestore security rules; RSVP
          data is readable only by the site owner. Emails are sent via AWS SES.
        </p>
      </LegalSection>

      <LegalSection heading="4. Cookies & local storage">
        <p>
          This site sets <strong>no tracking or advertising cookies</strong>. The public site works without
          cookies at all. The only browser storage we use is a small, essential <code>localStorage</code> value
          during owner sign-in on the admin page, which keeps you signed in. Because we use only essential
          storage, no cookie consent banner is required.
        </p>
      </LegalSection>

      <LegalSection heading="5. Retention">
        <p>
          We keep RSVP data only as long as needed to run the meetup, and remove it on request. Contributions
          live as GitHub issues until closed or deleted. Ask us any time and we’ll remove your personal data.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your rights">
        <p>
          Under UK GDPR you can ask us to access, correct, or delete your personal data, or withdraw consent.
          To do any of these, contact{' '}
          <a href="#" onClick={openMail} className="text-teal-bright hover:underline">{contactEmail()}</a>.
        </p>
      </LegalSection>

      <LegalSection heading="7. Contact">
        <p>
          Miggle Ltd ·{' '}
          <a href="#" onClick={openMail} className="text-teal-bright hover:underline">{contactEmail()}</a> ·{' '}
          <a href="https://miggle.one" target="_blank" rel="noopener" className="text-teal-bright hover:underline">miggle.one</a>
        </p>
      </LegalSection>
    </LegalShell>
  );
}
