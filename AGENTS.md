# AGENTS.md

## Design Philosophy

Cards are so 2016.

This project uses a **typographic-first, motion-driven** design language. Every UI decision should feel like it belongs in 2026 — not a Dribbble shot from eight years ago.

---

## Core Rules

### No cards

Do not reach for `rounded-lg border bg-card p-4` as a default container. Cards create visual noise, flatten hierarchy, and make every section look the same. Instead:

- Let **typography carry the weight** — size, weight, and spacing do more than a border ever will
- Use **full-bleed sections** with generous whitespace as the container
- Separate content with **dividers, rhythm, and negative space** — not boxes

### Motion is meaning

Animations are not decoration. Every transition should communicate something:

- Use `transition-all duration-[600ms]` or slower for state changes that deserve attention (active indicators, slide transitions)
- Entrance animations should be **staggered**, not simultaneous
- Prefer `opacity` + `translateY` exits over instant removes — things should leave gracefully
- Respect `prefers-reduced-motion` — wrap keyframe animations in the media query

### Typography first

- Font size drives hierarchy, not containers
- Use `clamp()` for fluid headings — `clamp(1.25rem, 3vw, 1.75rem)` is a good starting point
- Quote marks, pull quotes, and large numerals are design elements, not just punctuation
- Two weights only: `400` regular, `500` medium. Never `600` or `700` — they fight the layout

### Color is intentional

- `--primary` for emphasis, `--secondary` for supporting text, `--foreground/30` for muted states
- Stars: `#f0a500` — warm, not neon
- Active indicators use `--primary` at full opacity; inactive use `--foreground/30`
- No gradients. No shadows. Flat surfaces, sharp accents

---

## Components

### Reviews

Vertical Swiper with a pill-shaped active bullet pagination. No cards. The quote fills the stage at headline scale — one review at a time, full attention.

```
stage: full-width quote + author + stars
pagination: vertical pill bullets, right-aligned, clickable
transition: duration-[600ms] on bullets, Swiper speed ~600ms
autoplay: 4500ms delay, pauseOnMouseEnter
```

### Pagination bullets

```css
.swiper-pagination-bullet        → h-1.5 w-1.5 rounded-full bg-foreground/30
.swiper-pagination-bullet-active → h-8 w-2.5 bg-primary rounded-full
transition-all duration-[600ms] on both states
```

### Section headers

Plain text, no card wrapper. Eyebrow → title → description stacked with tight rhythm.

---

## What to avoid

| Instead of…                      | Do this                                        |
| -------------------------------- | ---------------------------------------------- |
| `<div className="card">`         | Full-bleed section with whitespace             |
| Swiper horizontal card carousel  | Vertical typographic stage                     |
| `font-bold` / `font-semibold`    | `font-medium` (`500`) at most                  |
| Gradient backgrounds             | Flat `--background` with strong type           |
| Pagination dots (circles)        | Pill bullets that grow on active               |
| `opacity-50` hover on everything | Intentional `opacity-55` with `transition-all` |
| Fixed pixel font sizes           | `clamp()` for headings, `rem` for body         |

---

## File structure

```
components/
  ReviewsSection.tsx   ← vertical swiper, no cards
  ...

styles/
  reviews.css          ← @apply-based, Tailwind tokens only
  ...
```

---

> If you're about to wrap something in a card, stop. Ask whether whitespace, type scale, or a single divider can do the same job. It usually can.
