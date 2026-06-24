// All site copy lives here, lifted verbatim from the signed-off design
// (docs/reference/OwnIt (1).html) and brief §3/§8. Em-dash-free by rule.

export const nav = [
  { label: 'The idea', href: '#idea' },
  { label: 'How I build', href: '#build' },
  { label: 'Tools', href: '#tools' },
  { label: 'Meetup', href: '#meetup' },
];

export const hero = {
  eyebrow: "Prototype anywhere · own it when it's real",
  headline: 'Built your own product idea with AI? Now take ownership and control.',
  subhead:
    'A practical workflow for small businesses and sole traders who want to go further than Lovable or Replit. This is how you turn the idea into something solid. Something that’s secure, scalable, properly yours, and ready to hand to a dev team the day it takes off.',
  supporting:
    'I believe multiple humans-in-the-loop can build better products with AI than one person can. So I’m opening up how I work with AI as a starting point to share best-practice ideas together, rather than go it alone.',
};

export const idea = {
  eyebrow: 'The idea',
  heading: 'I’m sharing how I build.',
  paragraphs: [
    'I’m building this network and sharing my workflow for one reason. I know I’d build better products with AI if I weren’t the only human in the loop. Bigger teams can compound ideas and deliver at speed because they have many people thinking together. If we share how we build, and think out loud together, small operators can do the same.',
    'And the broader the network the better. AI gives everyone the capability, so we can learn from anyone. People who consider themselves less technical find inventive workarounds. They should be in the conversation as much as the coders.',
    'So here is my open invitation. This is how I do it. Let’s work together to determine how we can all do it better.',
  ],
};

export const coversIntro = {
  eyebrow: 'What OwnIt covers',
  heading: 'Three parts, drawn from real apps, not theory.',
};

export const coverCards = [
  {
    tag: '01 · Workflow',
    accent: 'teal' as const,
    title: 'How I build',
    body: 'The workflow. How to scope features and build them properly, running it like a product from day one. Drawn from real apps, not theory.',
    link: 'See the workflow',
    href: '#build',
  },
  {
    tag: '02 · Ownership',
    accent: 'magenta' as const,
    title: 'Built to last, and yours',
    body: 'The principles and infrastructure choices that keep your code and data yours, ready to scale and stay secured.',
    link: 'Why it matters',
    href: '#lasts',
  },
  {
    tag: '03 · Tools',
    accent: 'teal' as const,
    title: 'Select the right tools',
    body: 'The tools I use to build, with my choices and the alternatives.',
    link: 'See the tools',
    href: '#tools',
  },
];

export const lovable = {
  heading: 'Already built something? Let’s make it real.',
  body: 'Prototyped an app in Lovable, Replit or similar and it’s actually catching on? That’s the exciting part. You’ve proved the idea. The next step is turning it into something that can hold real users and data, stay secure and GDPR-clean, and grow without falling over. That’s exactly what OwnIt is for. Bring what you’ve got; we’ll work out what it takes to make it last.',
};

export const builtToLast = {
  eyebrow: 'Built to last',
  paragraphs: [
    'No-code tools are brilliant for a first cut, so use them. But when your app starts holding real data, taking real money, or carrying your name, “it works on the demo” isn’t enough.',
    'OwnIt assumes you’re building a proper product from the start, because AI can handle that from the start if you know what to ask. Your code in your repo, your data in your cloud, secure and ready to scale, and ready to hand to a developer without them tearing it down.',
    'And if you handle regulated or sensitive data (health, finance, legal, citizen or casework records), the off-the-shelf builders often aren’t even allowed; OwnIt keeps everything on infrastructure you control, your own cloud or your own hardware. You own it, and it lasts.',
  ],
  chips: [
    'Your code in your repo',
    'Your data in your cloud',
    'Secure and ready to scale',
    'Hand over without a teardown',
  ],
};

export const howIBuild = {
  eyebrow: 'How I build',
  heading: 'Here’s how to build it properly, so what you make is solid and yours.',
  intro:
    'Not a jargon dump. Three plain-English pillars, the same arc whether you’re deploying a booking form or a full product.',
};

export const pillars = [
  {
    step: 'Pillar 01',
    title: 'Scope what’s worth building',
    body: 'Use AI to scope the features that add value, not the features that look clever. Build the thing that pays for itself.',
  },
  {
    step: 'Pillar 02',
    title: 'Build it properly',
    body: 'A proven stack. React, TypeScript and Vite, sitting on Firebase by choice, though other options work, with your code in your repo and AI as your build partner. Solid foundations, not a house of cards.',
  },
  {
    step: 'Pillar 03',
    title: 'Run it like a product',
    body: 'Deploy it, monitor it, secure it, own the data and watch the costs. Delivery is part of the feature, not an afterthought.',
  },
];

export const principles = {
  eyebrow: 'The guiding principles: this is the differentiator',
  heading: 'The iterable, repeatable guiding principles I apply to everything I build, so I have consistent ownership and control across everything.',
  intro:
    'This is the part the quick-build tools don’t give you. And it’s the real reason to build this way. Every build follows standards I keep as living docs (my build playbook, my CI/CD standards and my non-functional requirements) that travel with the project, so you, or a future dev team, can see exactly how it was built and run.',
  closing:
    'A Lovable or Replit prototype can do the fun 80%. This is the unglamorous 20% (security, privacy, ownership, scale, backups) that decides whether your idea survives real users, real money and real data. It’s also exactly what lets a dev team take it on later without starting from scratch.',
};

export const builtPrinciples = [
  { lead: 'Build the real product, not a demo shell', desc: 'If you want a working tool ready for production, this gets you that.' },
  { lead: 'Proven architecture', desc: 'React/TypeScript sitting on, my choice, Firebase. (Other options are available.) Stable and documented, so any developer or agent can pick it up.' },
  { lead: 'You own it from day one', desc: 'Your code in your repo, your data in your cloud project. Not rented space inside someone’s platform.' },
  { lead: 'Your data stays portable', desc: 'All my products have an API layer so data can be exported and exchanged, not trapped. Plug in other tools, be downstream, be upstream, whatever!' },
  { lead: 'Lock the doors server-side', desc: 'Real permission checks live on the server, not just hidden buttons in the browser.' },
  { lead: 'Repeatable, documented setup', desc: 'Scripts and docs instead of secret manual steps, so it can be maintained, moved, or handed over.' },
  { lead: 'Deployment is part of the build', desc: 'Deploys, previews and updates are wired in from early commits, not bolted on at the end.' },
];

export const runPrinciples = [
  { lead: 'Secure by default', desc: 'Secrets never live in the code; least-privilege access; sensitive actions audited.' },
  { lead: 'Encrypted, in transit and at rest', desc: 'Data is protected on the wire and in storage, not sitting in the open.' },
  { lead: 'Private and GDPR-ready', desc: 'Collect only what’s needed, capture consent, and delete on request.' },
  { lead: 'Protected against abuse', desc: 'Rate limits and validation on anything the public can submit.' },
  { lead: 'Watched', desc: 'Monitoring and alerts so you find out something broke before your users do.' },
  { lead: 'Costs tracked, service by service', desc: 'Spend broken down per service (hosting, database, AI calls, storage, email) so nothing creeps up on you.' },
  { lead: 'Built to scale sensibly', desc: 'Clear bands from 10 users to 100+, so it grows without falling over or bankrupting you.' },
  { lead: 'Backed up and recoverable', desc: 'Your data is safe, with a documented way to restore it.' },
  { lead: 'Maintained on a cadence', desc: 'Light weekly/monthly/quarterly checks so it stays healthy.' },
];

export const tools = {
  eyebrow: 'Select the right tools',
  heading: 'You don’t need to be technical to start, you need to be curious.',
  intro:
    'Here are the tools I use. Some are free, some you pay for as you grow. You can set them up at your own pace. Stuck on any of it? That’s what the meetup and a quick chat are for. I can help you through it.',
  pickNote: 'marks my choice.',
};

export const toolSteps = [
  {
    n: '01',
    title: 'An AI-enabled editor',
    pick: 'Cursor',
    cost: 'Free to start',
    whatis: 'where you build',
    why: 'It’s an app like any other. You describe what you want and it writes the code with you. Alternatives: VS Code + Copilot, Windsurf, Google Antigravity, or Claude Code.',
    own: '',
    url: 'https://cursor.com',
    linkLabel: 'Download Cursor',
  },
  {
    n: '02',
    title: 'A code repository',
    pick: 'GitHub',
    cost: 'Free to start',
    whatis: 'the safe home for your work',
    why: 'GitHub, ideally with GitHub Desktop, a friendly app that saves and backs up versions of your project with buttons. Other repos work too: GitLab or Bitbucket.',
    own: 'Your code goes to your repo. This is where owning your code begins.',
    url: 'https://desktop.github.com',
    linkLabel: 'Get GitHub Desktop',
  },
  {
    n: '03',
    title: 'A cloud account',
    pick: 'Google Cloud + Firebase',
    cost: 'Free credits to start',
    whatis: 'where your app and data live, under your control',
    why: 'Generous free credits for new users to get going, set up through a normal website. Alternatives that also keep ownership with you: AWS, Microsoft Azure, Cloudflare, or Supabase. Or self-hosted on your own hardware with Docker, Supabase or PocketBase if compliance means nothing can sit on a shared cloud. Pick on familiarity, compliance and cost.',
    own: 'Your data goes to your cloud project. Not rented space inside someone’s platform.',
    url: 'https://firebase.google.com',
    linkLabel: 'Open Firebase',
  },
  {
    n: '04',
    title: 'An AI key',
    pick: '',
    cost: 'Pay as you go',
    whatis: 'only when your app itself needs AI',
    why: 'From Anthropic (Claude), OpenAI, or Google’s Gemini API. Kept safely, never in your code.',
    own: '',
    url: 'https://console.anthropic.com',
    linkLabel: 'Get a Claude key',
  },
  {
    n: '05',
    title: 'A domain',
    pick: '',
    cost: 'Paid yearly',
    whatis: 'when you’re ready to go live',
    why: 'So your product has a real address you own. Pick a registrar you trust and point it at your site.',
    own: '',
    url: '',
    linkLabel: '',
  },
];

export const meetup = {
  eyebrow: 'Build it together: the meetup',
  heading: 'A relaxed, regular local get-together.',
  intro:
    'Bring an idea, a half-finished project, or just questions. We talk through the workflow, share what’s working and improve it together.',
  seedLabel: 'Upcoming session',
  emptyState: {
    label: 'Next date coming',
    title: 'No date set just yet.',
    body: 'Register your interest below and I’ll email you as soon as the next session is confirmed.',
  },
  moreSessions: 'More sessions will be listed here as they’re confirmed.',
};

export const rsvpForm = {
  heading: 'Register your interest',
  success: { title: 'Thanks, you’re on the list.', body: 'Check your inbox for a confirmation. It’s an informal session. Come with whatever you’re building and we’ll dig in together.' },
  duplicate: 'Looks like you’re already registered for this one. See you there.',
  waitlist: 'This one’s full, so you’re on the waitlist. I’ll be in touch if a space opens up.',
  error: 'Something went wrong saving that. Please try again, or email info@miggle.one.',
  submitting: 'Saving…',
  fields: {
    name: 'Name',
    email: 'Email',
    emailHelp: 'I’ll only use this to email you about the meetup.',
    session: 'Which session?',
    sessionOptions: ['Mon 1 Sep 2026, 7:00pm, BN6 Craft and Tap', 'Any / let me know about future ones'],
    building: 'What are you hoping to build? (optional)',
    consent: 'Yes, email me about this meetup. I can unsubscribe any time.',
    submit: 'Count me in',
  },
};

export const workTogether = {
  eyebrow: 'Ways we can work together',
  cards: [
    {
      title: 'Come to the meetup',
      body: 'A relaxed local session to talk through the workflow, share what you’re building, and iterate on it together.',
      cta: 'Join the meetup',
      href: '#meetup',
    },
    {
      title: 'Book a 30-minute chat',
      body: 'Tell me what you’re trying to build; I’ll show you how the workflow applies to it. No pitch.',
      cta: 'Book a chat',
      href: 'calendly',
    },
  ],
};

export const contribute = {
  heading: 'Found a better way? Tell me.',
  subheading: 'This workflow gets better the more people poke at it.',
  intro: 'Spotted something wrong, got a sharper approach, or want to suggest an addition? Send it over.',
  success: { title: 'Got it, thank you.', body: 'I read every one.' },
  error: 'Something went wrong sending that. Please try again, or email info@miggle.one.',
  submitting: 'Sending…',
  publicNote: 'Heads up: suggestions are posted publicly as issues on our GitHub. Leave name and email blank to stay anonymous.',
  fields: {
    idea: 'Your idea or suggestion',
    name: 'Name (optional)',
    email: 'Email (optional)',
    submit: 'Send it over',
  },
};

export const about = {
  eyebrow: 'About Alick',
  body: 'Experienced digital technologist currently building his own AI sports products. This is the open, local-facing companion to that work.',
  link: 'Visit miggle.one',
};

export const footer = {
  tagline: 'Build AI products you actually own',
};
