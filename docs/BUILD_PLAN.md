# OwnIt build plan (ownit.miggle.co)

Source of truth: `AI Toolkit - Brief v2.5.md`. Design reference: `OwnIt (1).html` (Claude design mockup, visual only, not deployable code).

This plan is structured as GitHub issues grouped into milestones. Each issue has a title, scope, acceptance criteria, and dependencies, so it can be pasted straight into the repo's tracker (or created with the script at the bottom). Issue numbers below are planning IDs, not GitHub numbers.

Build order: **M0 → M1 → M2 → M3 → M4 → M5**. M3 (backend) and M4 (SEO/AEO) can overlap once M1 is done.

---

## Milestone M0: Repository and project foundation

### #1 Create the public GitHub repo
**Scope:** Create public repo `ownit` under the Miggle account. Public so GitHub Issues are open for contributions (per brief §3 Contribute, §6). Add `README.md`, `LICENSE`, `.gitignore` (Node), and copy in the four standards docs referenced in brief §4 (`APP_BUILD_PLAYBOOK.md`, `CICD_AND_DEPLOYMENT.md`, `NON_FUNCTIONAL_REQUIREMENTS.md`, `APP_GUIDANCE_INDEX.md`) plus this `BUILD_PLAN.md` and the brief.
**Acceptance:** Repo exists, public, Issues enabled, standards docs present, this plan filed as issues.
**Depends on:** nothing.

### #2 Scaffold Vite + React + TS + Tailwind
**Scope:** Per brief §6. `npm create vite@latest` (react-ts), add Tailwind, Prettier/ESLint, set up the Miggle palette as Tailwind theme tokens (dark navy, teal `#0F8576`, magenta `#E6356E` — pulled from the mockup). Add `Comfortaa` + `IBM Plex Mono` fonts (self-hosted, not base64). Folder structure: `src/components`, `src/sections`, `src/lib`, `public/`.
**Acceptance:** `npm run dev` serves a blank themed shell; `npm run build` succeeds; fonts and colours match the mockup.
**Depends on:** #1.

### #3 Firebase project wiring
**Scope:** Create/confirm Firebase project in Alick's GCP. Enable Hosting, Firestore, Functions (Node), and a secret store (for SMTP creds + GitHub token). Add `firebase.json`, `.firebaserc`, Firestore rules + indexes files (locked down by default). No app logic yet.
**Acceptance:** `firebase emulators:start` runs Hosting + Firestore + Functions locally; rules deny all client writes by default.
**Depends on:** #1.

---

## Milestone M1: Static one-pager (port the design)

> The mockup's visual design is signed off. This milestone is translation to real components, not redesign. Drop in real copy from brief §3 and §8; the mockup still shows `{{ card.title }}` placeholders.

### #4 Layout shell: header, sticky CTAs, footer
**Scope:** Anchored single-page layout. Sticky/repeated CTAs ("Book a 30-minute chat" → `https://calendly.com/miggleone/ownit`; "Join the meetup" → scrolls to Meetup section). Footer with obfuscated `info@miggle.one` (JS-assembled, never plain `mailto:` in source — brief §6), phone, miggle.one link, terms/privacy links, copyright.
**Acceptance:** Nav anchors scroll correctly; email not present as plaintext in built HTML; Calendly links correct.
**Depends on:** #2.

### #5 Hero section
**Scope:** Headline, subhead, two primary CTAs, supporting "multiple humans-in-the-loop" line. Copy verbatim from brief §3 Hero.
**Acceptance:** Matches mockup hero; CTAs wired; mobile-first responsive.
**Depends on:** #4.

### #6 Content sections: The idea / What OwnIt covers / Started in Lovable
**Scope:** "I'm sharing how I build" (first-person block, brief §3). "What OwnIt covers" 3 cards (real titles/copy, brief §3 + §4). "Started in Lovable or Replit?" with chat CTA. Replace all `{{ }}` placeholders with real copy.
**Acceptance:** No template placeholders remain; copy matches brief; em-dash rule respected.
**Depends on:** #4.

### #7 "Built to last" callout + guiding principles
**Scope:** Visually distinct callout (brief §3). Guiding principles in plain English — "How it's built" + "How it's run" lists from brief §4. This is the differentiator section; mention the living standards docs.
**Acceptance:** Both principle groups present, plain-English, matches mockup styling.
**Depends on:** #4.

### #8 "Select the right tools" section
**Scope:** Reassurance-first intro (brief §5), then the 5 tools with Alick's picks vs alternatives, "free to start" notes, links to canonical sign-up pages. No command-line copy on the page.
**Acceptance:** All 5 tools present with picks marked; tone matches §5 guardrails.
**Depends on:** #4.

### #9 About Alick + Ways we can work together
**Scope:** Short About paragraph + photo + miggle.one link (brief §3). "Ways we can work together" (meetup + chat CTAs).
**Acceptance:** Matches brief copy; photo asset in repo, not base64.
**Depends on:** #4.

---

## Milestone M2: Meetup feature (Firestore-backed)

### #10 Meetup data model + admin/seed
**Scope:** `meetupSessions` collection (`title`, `date`, `time`, `location`, `capacity?`, `status`, `notes`) per brief §6. Seed the confirmed first session: Mon 1 Sep 2026, 7:00pm, BN6 Craft and Tap, Hassocks. **Decision: build a small authed admin view** (Firebase Auth, restricted to Alick's account) for managing sessions — friendlier long-term than a seed script. Include a documented one-off seed script too, purely to bootstrap the first session before the admin view lands.
**Acceptance:** Session renders from Firestore; Alick can add/edit/retire sessions through the authed admin view without a dev; only his account can access it (rules + UI guard); empty-state copy shows when no upcoming session (brief §8).
**Depends on:** #3.

### #11 Meetup section UI + session cards
**Scope:** Render upcoming session card(s) with Register-interest button; empty state per §8 microcopy. Wire to #10 data.
**Acceptance:** Card renders from Firestore data; empty state correct; matches mockup.
**Depends on:** #10, #9.

### #12 RSVP form + Firestore write (Function)
**Scope:** RSVP form (name, email, session select, "what building?", consent) per brief §8. Posts via a callable/HTTPS Function to `meetupRsvps`. Server-side: validate, dedupe (one per email per session), rate-limit by email+IP with `expiresAt`+TTL, cap free-text length, capacity/full → waitlist flag (brief §6). Success/error/duplicate microcopy from §8.
**Acceptance:** Valid RSVP stored; duplicate blocked with correct message; rate limit works; capacity full → waitlist; rules keep `meetupRsvps` owner-readable only.
**Depends on:** #10, #11.

> Note: now that #10 builds an authed admin view, extend it here to also list RSVPs per session (the brief's "let Alick see who's coming"), reading the owner-only `meetupRsvps` collection.

### #13 Confirmation + notification emails
**Scope:** Server-side branded confirmation email to registrant (subject/body from §8, session-aware vs general-interest). Optional notification email to Alick per RSVP. SMTP creds via secret store.
**Acceptance:** Confirmation email sends on RSVP with correct branching; Alick notification optional toggle; no secrets in code.
**Depends on:** #12.

---

## Milestone M3: Contribute → GitHub Issues

### #14 Contribute form + GitHub Issues Function
**Scope:** "Found a better way?" form (idea required, name optional, email optional) per brief §8. Posts via Firebase Function that creates a GitHub Issue using a server-side token (held in secret store, never exposed to client). Apply validation, rate-limit, TTL on this public write path (brief §6). Success microcopy from §8.
**Decision: build the full GitHub Issues integration** (not the email-only v1 fallback) — best long-term, since it turns every contribution into a tracked, public, actionable item in the repo and needs no manual triage step.
**Acceptance:** Submission creates a real issue in the repo; token never in client bundle or network response; rate limiting active; spam validation in place; new contributions land with a `contribution` label for moderation/triage.
**Depends on:** #3, #1.

---

## Milestone M4: SEO / AEO

### #15 Core SEO
**Scope:** Per brief §6. One `<h1>`, semantic headings, descriptive `<title>` + meta description around "build and own your own AI products", Open Graph image (Miggle brand), `sitemap.xml`, sensible `robots.txt`. Confirm fast load / mobile-first.
**Acceptance:** Lighthouse SEO ~100; OG preview renders; sitemap + robots served.
**Depends on:** M1.

### #16 AEO: structured data + llms.txt
**Scope:** Per brief §6. JSON-LD: `Organization`/`LocalBusiness`, `Event` (1 Sep 2026 meetup), `FAQPage` (any Q&A), `Person` (Alick). Answer-first section intros. `llms.txt` at site root summarising what OwnIt is, who it's for, the meetup, and contact.
**Acceptance:** Structured data validates (Rich Results Test); `llms.txt` reachable at root and accurate.
**Depends on:** M1, #10.

---

## Milestone M5: Compliance, hosting, launch

### #17 Legal + cookie consent + analytics
**Scope:** `/terms` and `/privacy` pages (reuse Miggle patterns), footer links, privacy-first cookie consent banner, privacy-first analytics collecting only what's needed (brief §6). Privacy policy must cover meetup RSVP data + removal-on-request.
**Acceptance:** Both legal pages live; consent banner gates analytics; RSVP data handling documented in privacy policy.
**Depends on:** M1, M2.

### #18 CI/CD pipeline
**Scope:** GitHub Actions per `CICD_AND_DEPLOYMENT.md`: PR preview deploys to Firebase Hosting, merge-to-main live deploy, deploy Firestore rules/indexes + Functions. Secrets via GitHub Actions secrets.
**Acceptance:** PR opens → preview URL; merge → live deploy; rules/functions deploy in pipeline.
**Depends on:** #3.

### #19 Domain, redirect, launch
**Scope:** Point `ownit.miggle.co` at Firebase Hosting. Redirect old `aitoolkit.miggle.co` → `ownit.miggle.co` (brief §7). Confirm Calendly `/ownit` slug live. Final cross-browser/mobile QA pass.
**Acceptance:** Site live on ownit.miggle.co with TLS; old subdomain 301s; all CTAs and forms work in production.
**Depends on:** #17, #18, M2, M3, M4.

---

## Creating these as GitHub issues

Once the repo (#1) exists, create issues with `gh` (one milestone shown; repeat per issue):

```bash
gh repo create ownit --public --description "OwnIt: build and own your own AI products. ownit.miggle.co"
# then, e.g.:
gh issue create --repo <owner>/ownit \
  --title "Scaffold Vite + React + TS + Tailwind" \
  --body "Per brief §6. ... (paste scope/acceptance from #2)" \
  --label "M0,setup"
```

Suggested labels: milestones `M0`–`M5`; types `setup`, `frontend`, `backend`, `seo`, `infra`, `legal`. Suggested GitHub milestones mirror M0–M5.
