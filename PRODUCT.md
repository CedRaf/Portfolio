# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring engineers screening junior full-stack / software developer candidates, both local (Cebu, Manila) and remote. Typical scene: a recruiter on a phone, often on a slow connection, deciding in about ten seconds whether to read further, open the résumé, or reach out. A second pass comes from hiring engineers who click through to repos, the live demo and the paper to check depth.

## Product Purpose

A personal portfolio for Cedric Thomas Y. Rafanan ("Ced"), Software Developer in Cebu City, Philippines. Its job: make a reader understand who he is and what he has built, then contact him or open/download his résumé. Success is a recruiter getting the point in ten seconds and taking one of those two actions.

## Positioning

**He ships real systems to real users.** Not coursework demos: an unfinished exit-clearance system taken to company-wide rollout at Alliance Software (replacing paper offboarding), two client systems in active use (a rice wholesaler's order module processing 100+ slips a day; a real-time pickleball scoreboard on 2 courts at <100ms latency), and JobTracker, a personal pipeline that runs twice daily in CI. Research credibility (IEEE Xplore paper, cum laude) supports this; it does not lead it.

## Operating Context

- Read mostly on phones, also on desktop by engineers cross-checking work.
- Readers jump out to: `public/resume.pdf` (view in a native dialog, or download), GitHub (github.com/CedRaf), LinkedIn (linkedin.com/in/cedric-rafanan), the JobTracker live demo, the IEEE Xplore paper, and email (cedricrafanan27@gmail.com).
- Single page, in-page anchor navigation, deployed on Vercel. No custom domain yet.

## Capabilities and Constraints

- Stack is fixed: Vite, React 19, TypeScript (strict), Tailwind v4, lucide-react; Motion is installed and optional. No new dependency or web font without asking first.
- All content comes from typed data files (`src/data/site.ts`, `experience.ts`, `projects.ts`), transcribed from `public/resume.pdf`. Facts trace to the résumé; nothing invented, embellished or rounded up.
- Content set that must ship: intro, projects (thesis, two client projects, JobTracker as featured; four smaller personal projects as secondary), experience (Freelance role linking to `#client-work`, Alliance internship), education, skills, certifications & activities, contact links, résumé view + download.
- Client work is presented under Projects, not Experience; an element with id `client-work` must exist.
- Résumé opens in a native `<dialog>` + `<iframe>` with visible Download and Open-in-new-tab fallbacks; no custom PDF viewer.
- Phone number never appears. No analytics without asking. No contact form (direct links only).
- Brand marks (GitHub, LinkedIn) must be uploaded assets, not hand-written SVG paths.

## Brand Commitments

- Name: Cedric Thomas Y. Rafanan; short form Cedric Rafanan; goes by "Ced".
- Voice: warm, first person, approachable and concise ("Hi, I'm Ced!"). Friendly, never cute; numbers stated plainly.
- Subtitle facts: Software Developer, PhilNITS certified, IEEE Xplore author.
- Real portrait: `public/images/profilepic.jpg`. Never replaced with a generated likeness.
- **Convention is the commitment (chosen 2026-11-05).** Offered distinctive visual worlds twice, the user chose the category standard: a clean developer portfolio, executed at full craft, with no irony or smuggled quirk. Craft bar: brittanychiang.com (its level of finish and legibility, not its look).
- Light and dark themes, following the OS by default, with a manual toggle in the header.
- **More character on top of the standard (2026-11-09):** the user found the pure standard too plain. Their v2 yellow (#ffe45b) is the brand colour across both themes. The vibe is joshwcomeau.com's warmth, toned down (not whimsical), with rauno.me-style subtle micro-interactions.
- Type: Geist for text, Bricolage Grotesque SemiBold for display headings. No other web fonts without asking.

## Evidence on Hand

- Résumé: `public/resume.pdf` (Oct 2026).
- Project screenshots in `public/images/`: rice-wholesaler order/inventory/login, scoreboard themes + controller, JobTracker jobs (dark/light), board, analytics, rules; IEEE listing crop; RAG repository card. All show sample/seed data.
- Measured results: thesis answer correctness 53% → 68%, context recall 49% → 66%, routing accuracy 97.5%, 17,000 QA pairs over 200 SEC filings; 100+ order slips/day; <100ms scoreboard latency; JobTracker 1,700+ listings in five days, ~80% auto-filtered, 237 tests, 500+ records migrated; ~15 employee testers at Alliance.
- The IEEE abstract misstates results; never show it. Scoreboard venue branding use is unconfirmed.
- **Absent, must not be fabricated:** testimonials, employer logos, client names, additional metrics, team sizes beyond what's stated, OG image, final favicon.

## Product Principles

1. **Proof before adjectives.** Show the shipped system, its users and its number; let the reader conclude "he ships".
2. **Ten seconds on a phone.** Name, role, the shipping claim and both actions (contact, résumé) are reachable without scrolling far on a 375px screen.
3. **True to the résumé.** Every fact traceable; when in doubt, leave it out.
4. **Light on the wire.** Every kilobyte is paid by a recruiter on a bad connection.
5. **Human, not a template.** Warm first-person voice; the person behind the work is visible.

## Accessibility & Inclusion

WCAG 2.2 AA throughout: semantic landmarks, one `<h1>`, keyboard operable with visible focus, skip link, ≥4.5:1 body contrast measured on the composited background, 3:1 for control boundaries, 44px touch targets on touch widths, full `prefers-reduced-motion` support. Lighthouse ≥95 in all four categories.
