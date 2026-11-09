---
name: Cedric Rafanan — Portfolio
description: A developer portfolio at full craft in the v2 yellow; proof of shipped systems first, both actions always in reach.
colors:
  canvas: "#fafaf8"
  surface: "#f1f0eb"
  hairline: "#e6e4de"
  control: "#878279"
  body: "#47433d"
  subtle: "#67625a"
  ink: "#1a1918"
  ochre: "#755600"
  highlight: "#ffe45b"
  on-highlight: "#1a1918"
  chip: "#fcf2c1"
  on-chip: "#1a1918"
  live: "#0a7650"
  canvas-dark: "#1a1918"
  surface-dark: "#242321"
  hairline-dark: "#2e2c29"
  control-dark: "#7a756c"
  body-dark: "#aba69e"
  subtle-dark: "#8f8a82"
  ink-dark: "#f5f3ef"
  ochre-dark: "#ffe45b"
  highlight-dark: "#ffe45b"
  on-highlight-dark: "#1a1918"
  chip-dark: "#353120"
  on-chip-dark: "#ffe45b"
  live-dark: "#4fd8a0"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.75rem"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bricolage Grotesque, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bricolage Grotesque, Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    fontFeature: "'ss01', 'cv11'"
  body-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  chip:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
  2xl: "1rem"
  full: "9999px"
spacing:
  gutter-sm: "1.5rem"
  gutter-md: "2.5rem"
  gutter-lg: "4rem"
  stack: "1.25rem"
  section: "3rem"
  section-lg: "4rem"
  card: "1.75rem"
  card-lg: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.on-highlight}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
  button-inverse:
    backgroundColor: "{colors.on-highlight}"
    textColor: "{colors.highlight}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  button-inverse-hover:
    backgroundColor: "color-mix(in oklab, {colors.on-highlight} 85%, transparent)"
  button-on-highlight-outline:
    backgroundColor: "transparent"
    textColor: "{colors.on-highlight}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: "0 1rem"
    height: "2.75rem"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.subtle}"
    rounded: "{rounded.lg}"
    size: "2.75rem"
  icon-button-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  chip:
    backgroundColor: "{colors.chip}"
    textColor: "{colors.on-chip}"
    typography: "{typography.chip}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.625rem"
  contact-card:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.on-highlight}"
    rounded: "{rounded.2xl}"
    padding: "1.75rem"
  media-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
  list-row-hover:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "0.75rem"
---

# Design System: Cedric Rafanan — Portfolio

## Overview

**Creative North Star: "The Marked-Up Workbench"**

The well-kept developer portfolio, with its yellow back. v3 began as the category standard at full finish; the user found it too plain, so this pass keeps v3's spacing, pinned layout and row grammar and brings back v2's character: the v2 yellow (`#ffe45b`), bolder surfaces, a display face for headings. Warmth is borrowed from joshwcomeau.com but turned well down, and the interaction finish comes from rauno.me: small, quick, physical CSS responses rather than spectacle. Everything still serves a recruiter on a phone deciding in ten seconds: identity and both actions (email, résumé) on the first screen, then shipped systems with their numbers.

Desktop is two columns: identity pinned on the left, the work scrolling on the right; below `lg` it is one column, identity first. Warm off-white or warm charcoal carry the page in two themes. Yellow does two jobs, each with its own token: a fill for the one primary action and the Contact card, and (as deep ochre in light mode) text for links and focus. Headings are plain ink in Bricolage; the highlighter swipe was tried and removed at the user's request. Structure is still hairline rows and a date column, not cards; the Contact card is the single deliberate exception.

Motion is CSS only, with no animation library: a once-only resolve on first load with the name fading in letter by letter, a rauno.me-style scroll minimap in the desktop nav, rows that quiet their siblings on hover, buttons that press, and an email-copy morph. Reduced motion collapses all of it.

**Key Characteristics:**
- Light and dark themes, following the OS, with a header toggle persisted in localStorage and applied before first paint.
- One yellow family split into two roles: fill (`highlight`) and text (`accent`, ochre in light).
- Two self-hosted faces: Bricolage Grotesque SemiBold for display, Geist variable for everything else.
- Hairline-divided rows and a fixed date column; one full-colour card closes the page.
- Flat: depth only on overlays that genuinely float.
- CSS-only micro-interactions; ~74 kB gzip JS total.

## Colors

Warmed neutrals in two themes around the v2 yellow; every token is defined once in `@theme` and overridden for dark, so markup never uses a `dark:` variant.

### Primary
- **Highlighter Yellow** (`{colors.highlight}`, same in both themes): yellow as a **fill**. The primary button, the Contact card, text selection. Ink on it: primary button 13.79:1 in both themes, Contact card body text (ink at 80%) 7.93:1.
- **Ink on Yellow** (`{colors.on-highlight}`): text, icons, focus rings and hairlines on a yellow fill only.
- **Ochre Ink** (light `{colors.ochre}`, dark `{colors.ochre-dark}`): yellow as **text**, the `accent` token. Link hover, the global focus ring, the emphasised pipeline node's border. Light mode uses deep ochre because the true yellow on the light canvas is about 1.3:1. Measured 6.51:1 light (5.96:1 on surface), 13.79:1 dark (12.34:1 on surface).

### Secondary
- **Stack Chip** (`{colors.chip}` on `{colors.on-chip}`; dark `{colors.chip-dark}` on `{colors.on-chip-dark}`): technology chips. 15.56:1 light, 10.24:1 dark.

### Tertiary
- **Running Green** (`{colors.live}` / `{colors.live-dark}`): only the "In use now" status dot and label. Green keeps meaning "running"; yellow never does. 5.40:1 light, 9.75:1 dark.

### Neutral
- **Warm Paper** (`{colors.canvas}` / `{colors.canvas-dark}`): page background.
- **Bench** (`{colors.surface}` / `{colors.surface-dark}`): one step up. Hover fills on rows, icon and secondary buttons; media wells; the disclosure hover.
- **Hairline** (`{colors.hairline}` / `{colors.hairline-dark}`): decorative dividers, row borders, media frames, the portrait ring. Deliberately below 3:1; never a control boundary.
- **Control** (`{colors.control}` / `{colors.control-dark}`): borders that are the affordance (secondary button, carousel and lightbox buttons) and list bullets. 3.65:1 light (3.35:1 on surface), 3.84:1 dark (3.43:1).
- **Body** (`{colors.body}` / `{colors.body-dark}`): running text. 9.40:1 light (8.61:1 on surface), 7.26:1 dark (6.49:1).
- **Subtle** (`{colors.subtle}` / `{colors.subtle-dark}`): meta text: dates, locations, labels, idle icons and "Details". 5.79:1 light (5.30:1 on surface), 5.12:1 dark (4.58:1).
- **Ink** (`{colors.ink}` / `{colors.ink-dark}`): the name, headings, emphasised phrases, figures, link text at rest; also the primary button's hover fill.

### Named Rules
**The Two-Yellows Rule.** Yellow as fill is `highlight`, yellow as text is `accent`. No yellow behind text: the highlighter swipe was removed. Never put `highlight` itself on text against the light canvas; use `accent`, which is ochre there.

**The One-Yellow-Surface Rule.** The Contact card is the only full yellow surface; the primary button is the only other yellow fill. Don't tint another section, card or "featured" item yellow.

**The Two-Border Rule.** A border is either a hairline (decoration, `border`) or a control edge (`control`, ≥3:1). On a yellow fill the control edge is ink at 60% (4.25:1).

**The One-Token-Two-Values Rule.** New colours are added as a light value in `@theme` and a dark override in both dark blocks (OS-preference and `data-theme='dark'`). No component-level hex, no stock Tailwind palette; the dialog scrims (`black/60`, `black/80`) are the only exception.

## Typography

**Display Font:** Bricolage Grotesque SemiBold 600 (Latin, 22.4 kB), falling back to Geist then ui-sans-serif
**Body Font:** Geist variable 100–900 (Latin, 29.4 kB), with ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto
**Label/Mono Font:** ui-monospace, SF Mono, Consolas (declared as `--font-mono`; not used in rendered UI)

**Character:** Bricolage brings a slightly quirky, warm grotesque to the few big words; Geist stays neutral and precise for everything read at length, with `ss01` and `cv11` on. Both faces are user-chosen. The root is 106.25% (17px at the browser default), so all rem values scale with the visitor's setting.

### Hierarchy
- **Display** (Bricolage 600, 2.75rem → 3rem at `sm`, 1.02, -0.025em, balanced): the name; the only `<h1>`.
- **Headline** (Bricolage 600, 1.5rem → 1.875rem at `lg`, -0.015em): section `<h2>`s, plain ink.
- **Title** (Bricolage 600, 1.25rem → 1.375rem at `sm`, snug, -0.015em): featured project titles.
- **Contact email** (Bricolage 600, 1.375rem → 1.875rem at `sm`, -0.02em): the one oversized link, ink on yellow with an ink underline at 35% that firms up on hover.
- **Role line** (Geist 500, 1.125rem, ink) under the name. Sub-groups (Education, Skills, "Earlier projects") and role titles are Geist 600.
- **Body** (Geist 400, 1rem, 1.625): intro and project prose, capped at 36ch (header tagline), 46ch (Contact) and 62ch (About, project and role prose). Bullets and secondary prose use **body-sm** (0.9375rem).
- **Label** (Geist 400, 0.875rem): dates, meta lines, footer; `tabular-nums` wherever figures or dates align.
- **Chip** (Geist 500, 0.75rem, line-height 1): technology names.

### Named Rules
**The Display-Is-Rare Rule.** Bricolage sets only the h1, section h2s, featured project titles and the Contact email. Everything else, including buttons, nav and sub-headings, is Geist. A third family needs the user's sign-off.

**The Negative-Tracking-Scales-With-Size Rule.** Tracking tightens only as size grows: -0.025em on the name, -0.02em on the email, -0.015em on h2s and project titles, zero for body and labels.

## Layout

A centred page capped at 78rem with side padding of 1.5rem → 2.5rem at `sm` → 4rem at `lg`. From `lg` it becomes a 5fr / 7fr grid with a 4rem gap (6rem at `xl`): the header column is `sticky top-0`, full viewport height and independently scrollable; the right column holds `main` and the footer. Below `lg` the header is simply the first screen, and section nav is hidden (sticky section headings take over wayfinding).

Sections are spaced 3rem (4rem at `lg`) top and bottom. Featured projects form an **expandable index**: hairline-divided rows, each a disclosure button with a 16:10 thumbnail (5.5rem, 9rem from `sm`), meta line, title, headline figure and stack chips (chips move into the panel below `sm`). A row expands in place to its full detail, which stacks with a uniform 1.25rem gap. Every row starts collapsed; following `#client-work` (or arriving with it in the URL) opens the first client project. Experience, Education, Skills and Certifications share one row grammar: a 9.5rem date/label column beside content from `sm`, stacked on phones. Project media is always 2:1 so every featured project opens at the same height. The pipeline diagram uses a container query (`@3xl`), not a viewport breakpoint. Breakpoints are Tailwind defaults only (`sm` 40rem, `lg` 64rem, `xl` 80rem). Anchor targets keep a 4.5rem (5rem at `lg`) scroll margin. The Contact card pads 1.75rem → 2.5rem at `sm`.

### Named Rules
**The Pinned-Identity Rule.** On desktop the name, both actions and the nav never leave view; on mobile they are the first screen. New sections go in the right column, never into the header.

**The Same-Row Rule.** Any dated list uses the date-column row (`9.5rem` + content). Don't invent a new list shape for a new kind of entry.

## Elevation & Depth

Flat by default. Depth is conveyed by tone (canvas → surface on hover and in media wells), hairlines, and, once, by colour (the yellow Contact card sits forward by hue, not shadow). Shadows exist only on things that physically float over content.

### Shadow Vocabulary
- **Overlay control** (`box-shadow: 0 4px 12px -4px rgb(0 0 0 / 0.3)`): carousel arrows sitting over an image.
- **Dialog** (`box-shadow: 0 24px 60px -20px rgb(0 0 0 / 0.45)`): the résumé dialog.

Translucency appears twice: mobile sticky section headings (canvas at 90% with a medium backdrop blur) and the overlay buttons (canvas at 90%).

### Named Rules
**The Floats-Only Rule.** A shadow means "this is above the page". Cards, rows, chips and buttons at rest carry none, including the Contact card.

## Shapes

Gently rounded, stepping up with container size. Buttons and small controls use 0.5rem (`rounded.lg`); framed containers (media frames, thumbnails' row hover, the disclosure, the résumé dialog) use 0.75rem (`rounded.xl`); the Contact card, the largest container, uses 1rem (`rounded.2xl`). The portrait, chips, status dots, bullets and overlay arrows are fully round. The focus ring is a 2px outline at 3px offset with its own 0.375rem radius (`rounded.md`). Borders are 1px throughout.

## Components

### Buttons
Solid, compact and physical: the same height side by side whether link or button (shared `buttonStyles.ts`), and every one presses to 97% scale on `:active`.
- **Shape:** gently rounded (0.5rem); 2.75rem tall below `lg`, 2.5rem at `lg`; 1rem horizontal padding; 0.9375rem medium label with an optional 1rem leading icon.
- **Primary:** yellow fill, ink text. One per action group ("Email me").
- **Hover / Focus:** primary flips to an ink fill with canvas text; secondary darkens its border to ink and gains a surface fill. 150ms transition on colour and transform. Focus is the global 2px `accent` outline at 3px offset.
- **Secondary:** transparent with a 1px `control` border and ink text ("View résumé" in the header).
- **Inverse:** ink fill, yellow text, for use on the yellow card ("View résumé" in Contact); hover lightens the ink to 85%.
- **Copy email (on yellow):** transparent, 1px ink-at-60% border, ink text; hover firms the border and adds a 5% ink wash. Click cross-fades the copy icon to a check (300ms, scale 0.5 ↔ 1 with a blur, expo-out), the label reads "Copied" for two seconds through an `aria-live` region, falls back to `execCommand('copy')`, and says "Copy failed" if both fail.
- **Icon button:** 2.75rem square (2.5rem at `lg`), subtle icon, surface fill and ink icon on hover. Theme toggle and social links.

### Chips
- **Style:** pale yellow fill (`chip`) with ink text in light; deep olive fill with yellow text in dark. Fully round, 0.25rem × 0.625rem padding, 0.75rem medium.
- **State:** static; chips label a project's stack and are never interactive. Secondary projects list their stack as a plain " · "-joined subtle line instead.

### Cards / Containers
Content is not carded; containers are frames, plus one card.
- **Corner Style:** 0.75rem frames; 1rem for the Contact card.
- **Background:** surface (media wells, the iframe); highlight for the Contact card.
- **Shadow Strategy:** none (see Elevation).
- **Border:** 1px hairline on frames; the Contact card has none, and divides its profile links with an ink-at-15% hairline.
- **Internal Padding:** media frames none (image edge to edge); disclosure body 1rem → 1.25rem; Contact card 1.75rem → 2.5rem.

### Navigation
- Desktop only, in the pinned header under a hairline: a **scroll minimap** after rauno.me. A ruler of 28 hairline ticks (1px × 1.125rem, `control` at 60%) with a 1.875rem outlined tracker (1px ink border, `rounded.md`) that rides it by scroll progress. The progress is written to a `--progress` custom property once per animation frame, never through React state, and smoothed by a 120ms linear transition. The current section's name (xs, subtle) sits under the tracker, moves with it, clamped to the ruler's ends, and fades in afresh (250ms) on each change. The ruler is also a `role="slider"` (Page position, 0–100, value text names the current section): clicking a point glides there, dragging scrubs the page with no easing lag (cursor `grabbing`), and when focused the arrow keys move 5%, Page Up/Down 20% and Home/End jump to either end, with rapid presses adding up. Its hit area extends 0.625rem above and below the ticks; on hover the ticks darken and the tracker border turns `accent`. Glides respect reduced motion. Real links sit below in a wrapping row (0.9375rem medium, 2.5rem tall, subtle → ink, current one ink with `aria-current`). The current section is the one crossing the viewport's middle band (IntersectionObserver).
- Mobile has no nav bar; each section's `<h2>` sticks to the top on a translucent, blurred canvas.

### Identity header
From top: the real portrait (5rem, 6rem from `sm`, round, hairline ring) on the left with the theme toggle in the top-right corner of the same row; then the Bricolage name, role and location, tagline, credentials line, and one action row: Email me (primary), View résumé (secondary), then the GitHub and LinkedIn icon buttons. Desktop padding is 3.5rem top and bottom so the pinned column fits a 1366×768 screen without its own scrollbar. Tried and rejected: a larger portrait centred over the column (looked detached) and a portrait beside the name (the user preferred it on top).

### Name entrance (signature)
The h1 types itself in: each letter fades in (250ms) 28ms after the previous one, starting at 80ms. Screen readers get the name once from a visually hidden copy; the letters are `aria-hidden`. The rest of the header resolves in its 50ms stagger around it.

### Contact card (signature)
The page's close on the one full yellow surface: ink body text at 80%, the oversized Bricolage email, the copy-email button and the inverse résumé button, then profile links divided by a faint ink hairline. Every focus ring inside switches to ink, because the yellow ring would vanish against the card.

### Results list (signature)
Each featured project states its measured results as a definition list between two hairlines: the figure in ink, semibold and tabular, right-aligned in an auto-width column, its label beside it in body-sm. The number always comes first.

### Project row (signature)
Collapsed: a full-width `<button aria-expanded>` inside the project's `<h3>`; hover fills it with surface, scales the thumbnail to 1.04 inside its frame (500ms expo-out, motion-safe), turns "Details" ink, and, on pointer devices, dims the sibling rows to 55% opacity (250ms) so the hovered row reads as the subject. A "Details / Close" label with a rotating chevron sits at the right (under the figure on phones). Expanded: the panel stays mounted (`inert` when closed, so a carousel keeps its slide), opens with a 300ms `grid-template-rows` 0fr → 1fr transition on an exponential ease-out, and its content fades and un-blurs 100ms after. Several rows can be open at once.

### Status marker
"In use now": a 6px `live` dot plus a `live` medium label, appended to a project's meta line only when the system is running.

### Carousel and lightbox
Manual only (no autoplay). Slides cross-fade with a 300ms opacity transition in one grid cell; arrows (round, `control` border, translucent canvas, overlay shadow) appear on hover/focus on hover-capable devices and stay visible on touch. Every project image is a zoom button opening a native `<dialog>` lightbox that eases in over 220ms (`cubic-bezier(0.16, 1, 0.3, 1)`, from 97% scale) on an 80% black scrim.

### Résumé dialog
Native `<dialog>` with the browser's PDF viewer in an iframe; the header bar carries Download, Open in new tab and Close as ghost actions (surface on hover). Same ease-in as the lightbox; 60% black scrim.

### Text links
Ink and medium at rest, `accent` on hover, no underline; external links carry an up-right arrow that nudges 2px diagonally on hover (motion-safe only). In-page links use a right arrow that nudges horizontally. 2.75rem minimum hit height below `lg`. On the yellow card, links stay ink and gain an ink underline on hover instead.

### Entrance
On first load the header's direct children resolve in turn (from opacity 0, a 6px blur and 6px lower; 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, 50ms stagger, capped at 350ms), and About resolves the same way after a 300ms delay. It runs once; nothing re-animates on scroll.

## Do's and Don'ts

### Do:
- **Do** define every colour as a token with a light value and a dark override; check both themes for contrast (body ≥4.5:1, control edges ≥3:1) on the composited background, including on the yellow card.
- **Do** use `accent` for yellow text and `highlight` for yellow fills; text on a yellow fill is `on-highlight` (ink).
- **Do** switch focus rings to ink inside any yellow surface.
- **Do** keep touch targets at 2.75rem (44px) below `lg` and 2.5rem (40px) from `lg`.
- **Do** separate content with 1px hairlines and the date-column row; signal importance with order, size or a label.
- **Do** put new motion in CSS on opacity, transform, filter or colour, gate hover effects to hover-capable devices, and make sure the `prefers-reduced-motion` reset covers it.
- **Do** lead project results with the number, in tabular figures.

### Don't:
- **Don't** add a JS animation library or JS-driven animation; all motion is CSS by decision.
- **Don't** add per-section scroll reveals; the entrance runs once, on the header and About only.
- **Don't** set body copy, buttons or nav in Bricolage, or add a third web font.
- **Don't** add a second yellow surface or give one item a tinted "featured" fill; the Contact card is the only one.
- **Don't** put `#ffe45b` text on the light canvas, or use yellow for "running" status; that is `live` green.
- **Don't** wrap content in shadowed cards, or use the hairline token as a control border.
- **Don't** hardcode hex values or Tailwind's stock palette in components (dialog scrims excepted).
