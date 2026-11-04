# Jakub Švihel Portfolio (svihel-cv)

## Project Stack & Commands

- **Framework:** Next.js 14 (Pages Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Custom Animations, Glassmorphism
- **Libraries:** framer-motion, lucide-react
- **Dev Server:** `npm run dev`
- **Verification:** `npx tsc --noEmit`
- **Production Build:** `npm run build`

## Architecture & Data Contracts

- Data files are stored in `public/data/*.json` (CZ and EN versions).
- NEVER remove, rename, or hardcode data keys/values from the JSON files.
- Static generation is handled via `getStaticProps` in `pages/index.tsx`.
- Components reside in `components/` with prefix `J*`.

---

# Design System & Visual Guardrails

All UI components generated must adhere to a strict "Linear / Raycast / Vercel" aesthetic: modern, minimalist, tactile, dark-mode-first, with micro-animations and depth.

## 1. Absolute Prohibitions (Never generate these)

- NO generic flat gray backgrounds (`bg-gray-800`, `bg-neutral-800` without gradients or borders).
- NO basic linear hover states (`transition duration-200` without easing curves).
- NO raw emojis or legacy raster images (`.webp` icons); use `lucide-react` or inline SVG paths.
- NO cartoonish, high-contrast box shadows (`shadow-2xl` without negative spread).
- NO centered plain white text on flat dark boxes.

## 2. Core Visual Principles

- **Specular Edge Highlights:** Buttons, cards, and tabs must have an inner top highlight simulating a light source from above: `shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]`.
- **Microscopic Borders:** Use borders with transparency: `border-neutral-800/80` or `border-neutral-700/50`.
- **Ambient Glows:** Use radial gradients with low opacity in corners: `bg-amber-500/[0.04] blur-3xl pointer-events-none`.
- **Tactile Responses:** Interactive elements must have physical spring responses on press: `active:scale-[0.97]` and smooth focus rings `focus-visible:ring-2 focus-visible:ring-amber-400/40`.
- **Monospaced Micro-badges:** Use `font-mono text-[10px] tracking-wider uppercase` for categories, dates, and statuses.

## 3. Motion & Animation Standards

- Prefer **Framer Motion** for state transitions and entry animations.
- Use **Spring Physics** over duration-based tweens:
  `transition: { type: "spring", stiffness: 350, damping: 25 }`
- Entry animations must combine opacity with subtle translation (`y: 8 -> 0`, never large `y: 100` slides).
- Stagger children elements (`staggerChildren: 0.08`).

## 4. Color DNA (Accent: Warm Amber / Gold)

- Base: Deep Neutral (`bg-neutral-950`, text in `text-neutral-300`).
- Accent: Amber/Warm Gold (`amber-400`, `amber-500/10` for glows, `amber-500/30` for borders).
- Status Colors: Emerald (success/active) `emerald-400`, Indigo (planned) `indigo-400`.
