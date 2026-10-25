# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Engineering hiring managers and technical recruiters at companies evaluating full-time engineering candidates. They are scanning many portfolios, pressed for time, and experienced enough to spot template work instantly. Secondary audience: technical co-founders and startup CEOs who may encounter this through referrals or GitHub.

## Product Purpose

Mihir Gupta's personal portfolio. Its job is to produce the feeling "this person ships" within five seconds — not through persuasion, but through evidence. Every element either proves capability or earns its place by serving the work. Success looks like a recruiter or engineering lead clicking through to a project, then reaching out.

## Positioning

A founding engineer who takes AI-integrated products from 0 to production and scale — five production platforms and a self-updating AI/RAG tool at Ivory, a B2B digital trade platform built end-to-end at Almond — and who proves range off the clock by shipping things that run end-to-end: a Windows desktop app, in-browser audio DSP, WebGL scroll films, multi-tenant AI SaaS. Breadth is evidence of shipping, not a list of interests.

## Operating Context

- Visitors arrive from referrals, GitHub, LinkedIn and job applications, usually with little time and often on a laptop between other candidates; some arrive on phones.
- The primary experience is the explorable 3D world ("Twilight Archipelago"): About, Projects, Experience, Research and Contact are places a visitor can travel to, and each opens a readable panel. Deep links (`#projects/<slug>`) open a panel directly.
- The classic single-page site is the fallback: served for `?classic`, browsers without WebGL, and runtime errors, and the prerendered HTML keeps all content readable for crawlers.
- Every 3D interaction has a direct path: the top nav, minimap, and guided tour reach every section without walking.

## Capabilities and Constraints

- Stack: React 18 + Vite, Tailwind for the classic site, React Three Fiber/drei for the world. Prerender step injects static HTML at build.
- All content lives in `src/data/constants.js`; both experiences read from it. Never fork content into the world layer.
- World art assets are specified in `imageprompt.md` and registered in `src/world/assets/manifest.js`; the world must run with every asset missing (procedural placeholders).
- No invented facts, metrics, capabilities or testimonials. Imagery is never AI-generated, stock, or downloaded substitutes; only real project screenshots and briefed assets.
- Optional ambient audio is off by default.

## Brand Commitments

- Name: Mihir Gupta. Role line: Software Engineer · Builder. Location: Bengaluru, India.
- Headline: "I turn ambitious ideas into software people use."
- Personality: **Precise** — deliberate, controlled, purposeful. Not trying to impress; demonstrating.
- Anti-references:
  - **Generic teal/purple SaaS portfolio**: gradient-text names, particle backgrounds covering every section, glassy cards, every heading a gradient — the aesthetic that signals "AI-generated template" to experienced reviewers (the look the classic fallback still carries).
  - **Over-animated showreel**: everything bouncing, sparkling, or spinning — motion that distracts from the work rather than guiding the eye.
  - **Dark hacker aesthetic**: terminal fonts, matrix vibes, green-on-black — not the audience or the tone.

## Evidence on Hand

- Projects: 10 shipped projects with titles, stacks, descriptions, live/source links and real screenshots (`src/data/constants.js` `PROJECTS`, images in `src/assets/`).
- Experience: 6 roles with dates, companies and bullet outcomes (`EXPERIENCE`); education (`EDUCATION`).
- Research: 2 published papers — symmetric encryption with ANNs (IJEAT 2022) and cardiovascular risk prediction (IJSR 2023), with links (`RESEARCH`).
- Stats, confirmed accurate: 4+ years of experience, 30+ projects completed, 2 research papers, 2000+ code commits (`STATS`).
- Résumé PDF and portrait photo in `src/assets/`.
- Absent, never fabricate: testimonials, client logos, user counts, revenue or performance figures beyond what `constants.js` states.

## Product Principles

1. **Evidence over assertion** — show the work; don't narrate it. Projects, commits, outcomes. Not "I am a passionate engineer" but a project that proves it.
2. **Absence as information** — white space is a design decision, not a gap. Crowded layouts signal insecurity; controlled space signals confidence.
3. **Precision, not minimalism** — every element placed with intent. Removing something must earn the remove; adding something must earn the add.
4. **Restraint earns trust** — a hiring manager trusts calm confidence, not a visual sales pitch. Animations that demand attention undermine credibility.
5. **The work is the hero** — no decorative system competes with or overshadows project and experience content.

## Accessibility & Inclusion

No specific standard required. Reasonable contrast, keyboard navigation support, and reduced-motion alternatives for animations. Don't sacrifice usability for decoration. The 3D world must never be the only route to content: keyboard-reachable nav, a no-WebGL fallback, and crawler-readable HTML are required.
