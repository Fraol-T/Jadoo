# AGENTS.md

## Project context

_(fill in before running)_

- **Project:** Jadoo travel agency
- **What it's for:** landing page

## Role

You're improving an existing React/Next.js landing page. Two goals this session: make it fully responsive across devices, and add motion/animation that makes it feel premium — without breaking anything currently working.

**Suggested autonomy profile:** Review-driven development. Visual and motion work is subjective — checkpoint with the human before big layout or animation-direction changes rather than running fully autonomous.

## Step 0 — Audit before changing anything

1. Inventory every page/route and section that exists today.

2. Identify the real styling approach in use — check `package.json` and `tailwind.config.*` rather than assuming (Tailwind? CSS Modules? styled-components? plain CSS?).

3. Check `package.json` for any animation library already installed (`motion`, `framer-motion`, `gsap`, `aos`, `react-spring`).

4. Using the built-in browser, capture baseline screenshots as artifacts at:
   
   - 375px (mobile) · 768px (tablet) · 1280px (laptop) · 1920px (large desktop)
   
   These are the "before" reference for every later comparison.

## Step 1 — Responsive pass

Mobile-first: base styles for the smallest screen, then layer up with `min-width` breakpoints (Tailwind: `sm: md: lg: xl:`; otherwise standard CSS media queries at the widths above).

- [ ] Nav collapses to a hamburger/drawer below tablet width; reachable and dismissible on touch
- [ ] Zero horizontal scroll/overflow at any of the four widths
- [ ] Images/video use `next/image` (Next.js) or `max-width: 100%; height: auto` — nothing crops or stretches
- [ ] Grid/flex layouts reflow to single-column on mobile
- [ ] Typography uses fluid sizing (`clamp()`) instead of a pile of per-breakpoint font sizes
- [ ] Tap targets ≥ 44×44px on touch devices
- [ ] Hero headline/CTA never crops on short mobile viewports
- [ ] Forms stay usable and validate correctly at narrow widths

## Step 2 — Motion pass

Two libraries, two jobs — don't reach for both for the same effect:

**Scroll-driven work (reveals, parallax, pinning, scrub):** GSAP + ScrollTrigger via `@gsap/react`'s `useGSAP()` hook — handles cleanup automatically and avoids the memory leaks raw `useEffect` GSAP code runs into.

```bash
npm install gsap @gsap/react
```

```jsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

function Section() {
  const scope = useRef();
  useGSAP(() => {
    gsap.from(".reveal", {
      scrollTrigger: { trigger: scope.current, start: "top 80%" },
      y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out",
    });
  }, { scope });
  return <div ref={scope}>...</div>;
}
```

**Component-level micro-interactions (hover, entrance, layout transitions):** Motion — same library formerly called "Framer Motion," just renamed. Install `motion`, not the old package.

```bash
npm install motion
```

```jsx
import { motion } from "motion/react";
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.03 }}
/>
```

Add:

- [ ] Hero entrance animation on load (staggered headline/CTA)
- [ ] Scroll reveals for feature blocks, testimonials, stats sections
- [ ] One consistent hover language on buttons/cards (pick scale, lift, or color-shift — not all three)
- [ ] Smooth-scroll for in-page anchor links
- [ ] Count-up animation if there's a stats/numbers section

Guardrails:

- [ ] Respect `prefers-reduced-motion` — reduced-motion users get instant/simplified states, never broken ones
- [ ] Animate `transform`/`opacity` only — never `width`/`height`/`top`/`left` (causes layout thrash)
- [ ] Micro-interactions 150–300ms, scroll reveals 400–800ms — nothing should feel sluggish
- [ ] Content stays visible if JS fails — no CSS `opacity: 0` base state without a no-JS fallback

## Verification

1. Re-capture screenshots at the same four widths; compare against the baseline artifacts
2. Record a scroll-through browser session to confirm animations trigger cleanly, no jank
3. Check console for errors
4. Confirm every existing link, button, and form still works

## Out of scope

- Copy, content, business logic — flag anything questionable, don't rewrite it
- No new UI/CSS framework just to fix one component
- Don't strip existing meta tags, alt text, or semantic HTML — SEO shouldn't regress

## Definition of done

- [ ] Zero horizontal scroll at 375 / 768 / 1280 / 1920px
- [ ] Nav fully usable on mobile
- [ ] Hero + at least one scroll-reveal + hover states animated
- [ ] `prefers-reduced-motion` respected
- [ ] Before/after screenshots attached as artifacts
- [ ] No new console errors, no broken links/forms
