# OwnIt

The site for **OwnIt** (ownit.miggle.co): a public, build-in-the-open workflow for building AI products you actually own. A subdomain of [miggle.one](https://miggle.one).

The site is itself an example of the principle it preaches: its code lives in this repo and it runs on Firebase in Alick's own Google Cloud project.

## Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS v4
- **Backend:** Firebase (Hosting, Firestore, Cloud Functions, Auth)
- **Hosting:** Firebase Hosting on `ownit.miggle.co`

## Local development

```bash
npm install
npm run dev      # Vite dev server (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

### Firebase emulators (backend work, M2 onwards)

```bash
cd functions && npm install && cd ..
firebase emulators:start
```

## Project layout

```
src/
  components/   shared UI (Header, Footer, buttons)
  sections/     one-pager sections (Hero, Idea, Tools, Meetup, …)
  lib/          content.ts (all copy) + site.ts (constants, email obfuscation)
functions/      Cloud Functions (RSVP, contribution → GitHub Issues, emails)
docs/
  BUILD_PLAN.md           milestones M0–M5 as issues
  reference/              the brief + the signed-off design mockup
firestore.rules           deny-by-default; admin gated on a custom claim
```

## Build plan

See [docs/BUILD_PLAN.md](docs/BUILD_PLAN.md). Status:

- **M0 Foundation** — repo, Vite/React/Tailwind scaffold, Firebase config ✅
- **M1 Static one-pager** — all sections built from the signed-off design ✅
- **M2 Meetup** — Firestore sessions + RSVP Function + emails + authed admin view ⬜
- **M3 Contribute** — form → GitHub Issues via a server-side token ⬜
- **M4 SEO / AEO** — meta, OG, JSON-LD, sitemap, llms.txt ⬜
- **M5 Launch** — legal/consent, CI/CD, domain + redirect ⬜

## Contributing

Once live, anyone can suggest improvements through the form on the site (which opens
a GitHub Issue here) or by opening an issue directly. This workflow gets better the
more people poke at it.
