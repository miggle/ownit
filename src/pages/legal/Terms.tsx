import { LegalShell, LegalSection } from './LegalShell';
import { contactEmail, openMail } from '../../lib/site';

export function Terms() {
  return (
    <LegalShell title="Terms of Use" updated="24 June 2026">
      <p>
        These terms cover your use of OwnIt (ownit.miggle.co), run by Miggle Ltd. By using the site you agree to
        them.
      </p>

      <LegalSection heading="1. What OwnIt is">
        <p>
          OwnIt is a free, openly shared resource: a workflow and set of guidance for building AI products you
          own, plus a local meetup and a way to suggest improvements. It is informational. Nothing here is
          professional, legal, or financial advice, and you use the guidance at your own discretion.
        </p>
      </LegalSection>

      <LegalSection heading="2. The meetup">
        <p>
          Registering interest is not a guaranteed place; sessions may change or be cancelled. Be respectful of
          other attendees and the venue. We may decline or remove attendance at our discretion.
        </p>
      </LegalSection>

      <LegalSection heading="3. Contributions">
        <p>
          When you submit a suggestion, you grant us permission to use, adapt, and act on it, including posting
          it publicly as a GitHub issue. Don’t submit anything confidential, unlawful, or that isn’t yours to
          share. We may edit, ignore, or remove submissions.
        </p>
      </LegalSection>

      <LegalSection heading="4. Third-party links">
        <p>
          The site links to external tools and services (for example Calendly, GitHub, Cursor, Firebase). We’re
          not responsible for their content or their terms; check theirs separately.
        </p>
      </LegalSection>

      <LegalSection heading="5. No warranty & liability">
        <p>
          The site and its guidance are provided “as is”, without warranties. To the extent permitted by law,
          Miggle Ltd is not liable for any loss arising from your use of the site or the guidance on it.
        </p>
      </LegalSection>

      <LegalSection heading="6. Changes & contact">
        <p>
          We may update these terms; the “last updated” date shows when. Questions:{' '}
          <a href="#" onClick={openMail} className="text-teal-bright hover:underline">{contactEmail()}</a>.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
