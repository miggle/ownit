# OwnIt (ownit.miggle.co): Brief v2.5 (complete, self-contained)

**Site:** ownit.miggle.co (subdomain of the Miggle brand; core site is miggle.one)
**Owner:** Alick Mighall · alick@miggle.one (owner identity; public contact uses info@miggle.one) · +44 (0) 7748 188012
**For:** Claude Code (build the site + the living resource) **and** Claude design (one-pager layout, look and feel).
**Version:** v2.5, complete and self-contained. Builds on v2 (`AI Toolkit - Brief v2.md`). v1 is `AI Toolkit - Working Brief.md`. Both v1 and v2 are untouched.

> **⚠️ Copy style rule (apply everywhere):** No em dashes (—) anywhere in the site copy, and don't introduce any when writing new copy. Use full stops, commas, colons or brackets instead. Reason: the em dash has become a tell-tale sign of AI-written text, and this site needs to read as genuinely human. (This brief is written em-dash-free for the same reason.)

> **Name (decided):** This is called **OwnIt**, on **ownit.miggle.co**. "Toolkit / kit" language is retired. OwnIt is framed as a way of working (a workflow/approach) for building AI products you own. The name leads on the core differentiator: you own what you build.

Sections 1 to 2 are positioning (read first, don't put it all on the page). Section 3 is the page itself (for Claude design). Sections 4 to 8 are practical content and build notes (for Claude Code).

### What changed from v2 to v2.5
- Named **OwnIt** (ownit.miggle.co). Reframed from "toolkit / starter kit" to a way of working you own. Calendly slug switched to `/ownit`.
- "Built to last" callout now leads with: the workflow assumes you're building a proper product from the start, because AI can handle that from the start if you know what to ask.
- Pillar 1 reworded: scope the features that add value, not the ones that look clever.
- Guiding principles now make explicit that they're codified in living README/standards docs that ship with every build (this is the missing proof point).
- Section 5 renamed **"Select the right tools"** (not a "kit"); tools are not all free; the repo line item generalised (GitHub is the pick, other repos noted).
- Added principles: **data stays portable via an API**, and **encrypted in transit and at rest**. Cost monitoring retained.
- Public contact email set to **info@miggle.one**, to be protected/obfuscated in source (never a plain mailto in the HTML).
- Light-touch **compliance angle**: noted that regulated/sensitive data often can't go on off-the-shelf cloud builders, and added a self-hosted/on-prem option (Docker, Supabase, PocketBase) for ownership under the strictest rules.
- Added **AEO** (answer-engine optimisation) guidance alongside expanded SEO notes in Section 6.

---

## 1. What this is, in one line

**A public, build-in-the-open workflow: how I build real products with AI, and an open invitation to build alongside me, or hire me to do it for you.**

It is a "subdomain hustle": it sits beside the core fractional AI/data-in-sport offering (miggle.one), it does not distract from it, and it exists to pick up work opportunities in an exciting time for AI while building trust and authority locally.

## 2. The beliefs behind it (the "why", keep these in the tone, not as a wall of text)

- **I build better with AI when I'm not the only human in the loop.** As a sole trader I'm one person with good ideas. Bigger teams compound ideas and ship fast because many people think together. Sharing how we build lets small operators compete with the big ones.
- **You can learn from anybody.** People with fewer technical skills aren't held back by them. They find inventive workarounds, because they're smart and AI now gives them the capability. I want those people in the conversation as much as the coders.
- **So I'm not here to preach.** I'm just stating plainly how I do it, in the open, and inviting better ideas back.
- **Prototype anywhere, own it when it's real.** The quick-build tools (Lovable, Replit) are great for a first cut. OwnIt is for when the idea matters: built properly so it's secure, scalable, yours, and ready to hand to a dev team without a teardown.
- **The honest goal:** build trust, build authority, and earn a living. If the conversation ends with "can we just hire you to do this?", perfect.

*Audience:* local small businesses and sole traders, plus anyone who wants to go further than AI prompts and agentic workflows and actually build and own products.

## 3. The one-pager (for Claude design)

Single scrolling page. Reuse the Miggle brand palette (dark navy, teal, magenta/pink accents) and logo so it's clearly part of miggle.one, but lighter and more inviting than a corporate site. Mobile-first.

**Tone guardrails (apply throughout):**
- **Be Lovable/Replit-friendly, never sneery.** Name them as a great starting point; the pitch is "the step after," not "you did it wrong."
- **Translate "own it" into plain benefits:** no rising subscription rent, your code, your data, ready to scale, ready to hand over. Avoid ideology/lecture tone.
- **Keep "hand off to a dev team" as reassurance, not the headline;** it implies complexity if it leads.
- **Warm and welcoming:** no tech background required, just curiosity.

### Hero
- **Headline:** Built your own product idea with AI? Now take ownership and control.
- **Subhead:** A practical workflow for small businesses and sole traders who want to go further than Lovable or Replit. This is how you turn the idea into something solid: secure, scalable, properly yours, and ready to hand to a dev team the day it takes off.
- **Primary CTAs (two buttons, side by side):**
  - **Book a 30-minute chat** → https://calendly.com/miggleone/ownit
  - **Join the meetup** → scrolls to the Meetup section (own RSVP form on this site)
- **Supporting line under the buttons (the core tenet, must land on this first page):** *I believe multiple humans-in-the-loop can build better products with AI than one. So I'm opening up how I work as a starting point to share best practice ideas together rather than go it alone.*

*Alternative headline options (pick to taste):*
- *Built something in Lovable? Make it yours, and make it last.*
- *From quick prototype to a product you own and control.*
- *You proved the idea. Now own it properly.*

### Section: The idea
Short, first-person, his voice. Heading: **I'm sharing how I build.**

> I'm building this network and sharing my workflow for one reason: as a sole trader, I know I'd build better products with AI if I weren't the only human in the loop. Bigger teams compound ideas and ship fast because they have many people thinking together. We don't, but if we share how we build, and think out loud together, small operators can compete with the big ones.
>
> And you can learn from anyone. People with fewer technical skills aren't held back by them. They find inventive workarounds, because they're smart and AI now gives them the capability. I want those people in the conversation as much as the coders.
>
> So this isn't a lecture. It's an open invitation: here's how I do it. Let's work together to determine how we can all do it better.

### Section: What OwnIt covers
Three cards (link each to the deeper content built per Sections 4 to 5):

1. **How I build.** The workflow: scope what's worth building, build it properly, run it like a product. Drawn from real apps, not theory. *(See Section 4.)*
2. **Built to last, and yours.** The principles and infrastructure choices that keep your code and data yours and ready to scale. *(See the "Built to last" callout + Section 4 principles.)*
3. **Select the right tools.** The tools I use to build, with my picks and the alternatives. *(See Section 5.)*

### Section: Started in Lovable or Replit?
*(Place just after "What OwnIt covers".)*
- **Heading:** Already built something? Let's make it real.
- **Body:** Prototyped an app in Lovable, Replit or similar and it's actually catching on? That's the exciting part. You've proved the idea. The next step is turning it into something that can hold real users and data, stay secure and GDPR-clean, and grow without falling over. That's exactly what OwnIt is for. Bring what you've got; we'll work out what it takes to make it last.
- **CTA:** Book a 30-minute chat → https://calendly.com/miggleone/ownit

### Callout: Built to last (make this visually distinct)
> No-code tools are brilliant for a first cut, so use them. But when your app starts holding real data, taking real money, or carrying your name, "it works on the demo" isn't enough. OwnIt assumes you're building a proper product from the start, because AI can handle that from the start if you know what to ask: your code in your repo, your data in your cloud, secure and ready to scale, and ready to hand to a developer without them tearing it down. And if you handle regulated or sensitive data (health, finance, legal, citizen or casework records), the off-the-shelf builders often aren't even allowed; OwnIt keeps everything on infrastructure you control, your own cloud or your own hardware. You own it, and it lasts.

### Section: Meetup (own sign-up, hosted on this site)
A local, regular get-together to talk through the workflow, share what you're building and iterate on it together. Run our own sign-up, no third-party platform, so the contact data stays in Alick's own project (consistent with owning your stack).

- **First session (confirmed):** **Monday 1 September 2026, 7:00pm** · **BN6 Craft and Tap, Hassocks**. Show this as the upcoming session card with a Register interest button.
- **Upcoming sessions:** list one or more sessions, each with **date, time and location** (content-managed, see build notes). If no future date is set, show a "register your interest and I'll let you know when the next one's confirmed" state.
- **Express interest / RSVP form:** name, email, optional "what are you hoping to build?" free-text, and (if sessions are listed) which date they'd prefer. Consent checkbox for being emailed about this meetup.
- On submit: store the RSVP, send a confirmation, and let Alick see who's coming.

### Section: Ways we can work together
- **Come to the meetup.** See the Meetup section above. *(CTA: Join the meetup.)*
- **Book a 30-minute chat.** Tell me what you're trying to build; I'll show you how the workflow applies to it. *(CTA: Book a 30-minute chat → https://calendly.com/miggleone/ownit)*

### Section: Contribute
Light-touch invitation to comment, suggest, or send a better way of doing something. Keep the open, non-preachy spirit: this workflow gets better when more people poke at it.

**Mechanism, GitHub Issues:** On a *public* repo, anyone with a free GitHub account can open an issue directly, so the simplest route is a public repo with Issues enabled and a "Suggest / discuss this" link to it. To remove the friction of needing a GitHub account, put a simple **form on the site** that posts to GitHub Issues via the GitHub API using a server-side token (a Firebase Function), so visitors contribute with no account and no exposure of the token. Validate, rate-limit, and moderate before anything is acted on. See Section 6.

### Section: About Alick (brief)
One short paragraph + photo + link to miggle.one:

> Experienced digital technologist currently building his own AI sports products. This is the open, local-facing companion to that work.

### Footer
Contact: **info@miggle.one** (protected/obfuscated in source, see Section 6) and phone. Link to miggle.one, terms/privacy links, cookie consent. Keep GDPR basics per the Miggle build standards.

---

## 4. How I build: the workflow (summarise from existing docs; do NOT paste them wholesale)

The site should give a **readable summary** of the build approach and link to / lift from the four standards docs already in this workspace:

- `APP_BUILD_PLAYBOOK.md`: product-first, boring/proven stack (React + TS + Vite + Tailwind, Firebase Auth/Firestore/Functions/Hosting, Cloud Run when needed), tenant-aware from day one, server-side permissions, scripts and docs as first-class.
- `CICD_AND_DEPLOYMENT.md`: deployment is part of the feature (GitHub Actions, Firebase Hosting previews + live deploys, rules, indexes, workers).
- `NON_FUNCTIONAL_REQUIREMENTS.md`: security, monitoring, rate limits, backups, GDPR/privacy, maintenance cadence.
- `APP_GUIDANCE_INDEX.md`: how the above fit together.

Frame this for a mixed audience: the headline is *"here's how to build it properly, so what you make is solid, and yours"*, not a jargon dump. Three plain-English pillars:
1. **Scope what's worth building.** Use AI to scope the features that add value, not the features that look clever.
2. **Build it properly** (proven stack, your code in your repo, AI as build partner).
3. **Run it like a product** (deploy, monitor, secure, own the data, watch costs).

This mirrors the talk's slide 7 to 9 arc, so the deck and the site reinforce each other.

### The guiding principles: this IS the differentiator (don't skip)

This is the part the quick-build tools don't give you, and the real reason to build this way. And it isn't hand-waving: every build follows standards I keep written down as living docs (my build playbook, my CI/CD and deployment standards, and my non-functional requirements). These README/standards files travel with the project, so you, or a future dev team, can see exactly how it was built and run, and hold it to that. Surface the principles below on the site in plain English. Pitch as *"the things I always do so what you build is solid, safe and actually yours"*, not a compliance lecture.

**How it's built (from the Playbook's core principles):**
- **Build the real product, not a demo shell.** If you wanted a working tool, that's what you get.
- **Boring, proven architecture.** React/TypeScript/Vite + Firebase/Google Cloud. Unfashionable on purpose: stable, well-documented, and any developer can pick it up.
- **You own it from day one.** Your code in your repo, your data in your cloud project. Not rented space inside someone's platform.
- **Your data stays portable.** Built with an API so your data can be exported and exchanged, not trapped. Plug in other tools, or move on, without a rebuild.
- **Lock the doors server-side.** Real permission checks live on the server, not just hidden buttons in the browser. (The difference between "looks private" and "is private.")
- **Repeatable, documented setup.** Scripts and docs instead of secret manual steps, so it can be maintained, moved, or handed over.
- **Deployment is part of the build.** Shipping, previews and updates are wired in, not bolted on at the end.

**How it's run (from the Non-Functional Requirements, the stuff that keeps you out of trouble):**
- **Secure by default.** Secrets never live in the code; least-privilege access; sensitive actions audited.
- **Encrypted, in transit and at rest.** Data is protected on the wire and in storage, not sitting in the open.
- **Private and GDPR-ready.** Collect only what's needed, capture consent, and be able to delete someone's data on request. Essential the moment you hold real customer data.
- **Protected against abuse.** Rate limits and validation on anything the public can submit (forms, sign-ups, uploads).
- **Watched.** Monitoring and alerts so you find out something broke before your users do.
- **Costs tracked, service by service.** Keep an eye on spend broken down per service (hosting, database, AI calls, storage, email) so you always know what each part costs and nothing creeps up on you.
- **Built to scale sensibly.** Clear bands from 10 users to 100+, so it grows without falling over or bankrupting you.
- **Backed up and recoverable.** Your data is safe, and there's a documented way to restore it.
- **Maintained on a cadence.** Light weekly/monthly/quarterly checks (costs, security, dependencies) so it stays healthy.

**Why this matters to the visitor (the one-liner):** a Lovable/Replit prototype can do the fun 80%. This is the unglamorous 20% (security, privacy, ownership, scale, backups) that decides whether your idea survives real users, real money and real data. It's also exactly what lets a dev team take it on later without starting from scratch.

## 5. Select the right tools (DRAFT CONTENT + BUILD NOTES)

**⚠️ Tone is everything here. This is the section most likely to scare people off.** We must not present setup as a wall to clear before you're allowed to build. Borrow the welcoming tone: *no tech background needed, just come curious, I'll walk you through it.* These are the tools I use, not a "kit", and they aren't all free: some are free to start, some you'll pay for as you grow.

So this section is **reassurance first, list second**:
- **These are normal apps and websites.** The tools below (a friendly code app, your editor, your cloud's web console) do the technical bits with buttons.
- Frame it as **"here's what I use, we'll set it up together,"** not "install all this first."

### Intro copy (drop-in)
> **You don't need to be technical to start. You need to be curious.** Here are the tools I use. Some are free, some you pay for as you grow, and you can set them up at your own pace. Stuck on any of it? That's what the meetup and a quick chat are for. I'll walk you through it.

### The tools (mark Alick's picks)
1. **An AI-enabled editor, where you build.** **Cursor** *(my pick)*. It's an app like any other; you describe what you want and it writes the code with you. *(Alternatives: VS Code + Copilot, Windsurf, Google Antigravity, or Claude Code.)*
2. **A code repository, the safe home for your work.** **GitHub** *(my pick)*, ideally with **GitHub Desktop**, a friendly app that saves and backs up versions of your project with buttons. This is where "you own your code" begins. *(Other repos work too: GitLab or Bitbucket.)*
3. **A cloud account, where your app and data live, under your control.** **Google Cloud + Firebase** *(my pick)*: generous free tier to start, set up through a normal website, your data stays in *your* project. *(Alternatives that also keep ownership with you: AWS, Microsoft Azure, Cloudflare, or Supabase. Or self-hosted on your own hardware with Docker, Supabase or PocketBase if compliance means nothing can sit on a shared cloud. Pick on familiarity, compliance and cost.)*
4. **An AI key (when your app itself needs AI).** From Anthropic (Claude), OpenAI, or Google's **Gemini API / Gemini Enterprise Agent Platform** (formerly Vertex AI, rebranded April 2026). Kept safely, never in your code.
5. **A domain (when you're ready to go live).** So your product has a real address you own.

**Build notes for Claude Code (make this a *living* resource, not a static list):**
- Keep it app-led: every step is "download this, click here, sign up there." No command-line instructions on the page.
- Each step: short "why" and a friendly "what this actually is" line. Link to the canonical install/sign-up page rather than spelling out steps that will date.
- Be clear which are Alick's picks and which are alternatives, so it reads as opinionated-but-open.
- Be honest that not everything is free, without turning it into a pricing table; per-item "free to start" notes are enough.
- Reinforce ownership inline (your code goes to your repo; your data goes to your cloud project).

## 6. Tech & build notes for the site itself (Claude Code)

- **Stack:** same as the playbook. React + TypeScript + Vite + Tailwind, deployed on Firebase Hosting in Alick's Google Cloud project. The site should itself be an example of the principle: it lives in his repo and his cloud.
- **Keep it a one-pager** with anchored sections and the two CTAs sticky/repeated. Fast, light, mobile-first.
- **CTAs:** wire "Book a 30-minute chat" to the Calendly link https://calendly.com/miggleone/ownit. "Join the meetup" scrolls to the on-site Meetup section (no third party).
- **Email protection:** all public email addresses use **info@miggle.one** and must be protected/obfuscated in source. Don't put a plain `mailto:` in the HTML (it gets scraped). Use a Function, an encoded/JS-assembled address, or a contact form instead.
- **Meetup feature (build our own):**
  - **Sessions** in a Firestore collection (`meetupSessions`): `title`, `date`/`time`, `location`, `capacity` (optional), `status` (`upcoming` / `full` / `past`), `notes`. Alick manages these: provide either a tiny authed admin view or a documented script/seed so he can add/edit dates and locations without a developer.
  - **RSVPs** in a Firestore collection (`meetupRsvps`): `name`, `email`, `sessionId` (nullable for general-interest), `whatBuilding` (optional), `consent` (bool), server `createdAt`. One RSVP per email per session (dedupe).
  - **Public write path** = abuse-prone: validate inputs, rate-limit by email + IP with `expiresAt` + Firestore TTL, cap free-text length, and (optional) add a simple anti-spam check. Per NFR standards.
  - **Confirmation email** server-side (branded, secret-managed) to the registrant; optional notification email to Alick on each RSVP.
  - **Capacity/full state:** if `capacity` is set and reached, show "full, join the waitlist" and flag the RSVP accordingly.
  - **Privacy:** store only what's needed; honour the consent flag; RSVPs are owner/admin-readable only; include in the privacy policy and allow removal on request.
- **Contribution mechanism:** a public repo with GitHub Issues enabled, plus a site form that posts to GitHub Issues via the GitHub API using a server-side token held in a Firebase Function (so visitors don't need an account and the token is never exposed). Apply validation, rate limiting and TTL on the public write path; moderate/triage issues before acting. (Simplest v1 fallback if needed: protected info@miggle.one address.)
- **Analytics + consent:** privacy-first, cookie consent per Miggle standards; only collect what's needed.
- **SEO:** clean crawlable HTML, one clear `<h1>`, semantic headings, descriptive title and meta description around "build and own your own AI products", Open Graph image using the Miggle brand, a sitemap.xml and sensible robots rules. Fast load and mobile-first both help ranking.
- **AEO (answer-engine optimisation):** write to be quoted by AI search and assistants, not just ranked by Google. Lead sections with a direct, self-contained answer (answer-first, then detail). Add schema.org structured data (`Organization`/`LocalBusiness`, `Event` for the meetup, `FAQPage` for any Q&A, `Person` for Alick). Include an `llms.txt` at the site root summarising what OwnIt is, who it's for, the meetup, and how to get in touch, so models have a clean, accurate source to draw from.
- **Legal:** `/terms` and `/privacy`, footer links, cookie banner, reusing the established Miggle patterns.

## 7. Open questions / confirmed decisions

- Name: **confirmed: OwnIt.** "Toolkit / kit" retired. OwnIt is the product/approach name.
- Domain: **confirmed: ownit.miggle.co.** (Migrating from aitoolkit.miggle.co; redirect the old subdomain.)
- Booking tool for the 30-minute chat: **Calendly, slug switched to `/ownit`: https://calendly.com/miggleone/ownit** (Alick updating the Calendly event to match.)
- Meetup mechanism: **confirmed: own sign-up hosted on this site** (no third party; RSVP data stays in Alick's project). First session: **Mon 1 Sep 2026, 7:00pm, BN6 Craft and Tap, Hassocks.**
- Public contact email: **info@miggle.one**, protected in source.
- £100 POC price: **not shown publicly**, kept to the conversation.

---

## 8. Finished microcopy (drop-in copy for Claude Code)

### Meetup section
- **Section heading:** Build it together: the meetup
- **Intro:** A relaxed, regular local get-together for anyone building (or wanting to build) with AI. Bring an idea, a half-finished project, or just questions. We talk through the workflow, share what's working, and improve it together.
- **When sessions are listed (per session card):** `{title}` · `{date}, {time}` · `{location}`, with a **Register interest** button.
- **When no session is scheduled yet (empty state):** No date set just yet. Register your interest below and I'll email you as soon as the next session is confirmed.

#### RSVP form labels & microcopy
- **Form heading:** Register your interest
- **Name** (placeholder: *Your name*)
- **Email** (placeholder: *you@example.com*; helper: *I'll only use this to email you about the meetup.*)
- **Which session?** (only if sessions exist): dropdown of dates plus an *"Any / let me know about future ones"* option
- **What are you hoping to build?** (optional, placeholder: *A booking tool, a tidier spreadsheet, an app idea… anything.*)
- **Consent checkbox** (required): *Yes, email me about this meetup. I can unsubscribe any time.*
- **Submit button:** Count me in
- **Success message:** Thanks, you're on the list. Check your inbox for a confirmation.
- **Error message:** Something went wrong saving that. Please try again, or email info@miggle.one.
- **Duplicate message:** Looks like you're already registered for this one. See you there.

#### Confirmation email (to the registrant)
- **Subject:** You're on the list: OwnIt meetup
- **Body:**
  > Thanks for registering your interest in the meetup.
  >
  > *(If a session was chosen:)* You're down for **{title}** on **{date} at {time}**, **{location}**.
  > *(If general interest:)* I'll email you as soon as the next session's date and place are confirmed.
  >
  > It's an informal session. Come with whatever you're trying to build and we'll dig in together.
  >
  > If you can no longer make it, just reply and let me know.
  >
  > See you there,
  > Alick · miggle.one

#### Optional notification email (to Alick)
- **Subject:** New meetup RSVP: {name}
- **Body:** {name} ({email}) registered for {session or "general interest"}. Building: {whatBuilding or "not given"}.

### Contribute form labels & microcopy
- **Section heading:** Found a better way? Tell me.
- **Intro:** This workflow gets better the more people poke at it. Spotted something wrong, got a sharper approach, or want to suggest an addition? Send it over.
- **Your idea or suggestion** (required, placeholder: *What would you change, add, or do differently?*)
- **Name** (optional, placeholder: *So I can credit you*)
- **Email** (optional, helper: *Only if you'd like a reply.*)
- **Submit button:** Send it over
- **Success message:** Got it, thank you. I read every one.
- *(Posts to GitHub Issues via the server-side function described in Section 6.)*
