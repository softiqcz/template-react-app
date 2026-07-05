# AGENTS.md

## Project UI Direction

This application uses a restrained interface with **neumorphism reserved for
buttons and table wrappers**. Preserve the existing visual system when adding
or changing UI. The source of truth is `src/app/globals.css`.

## Core Surface Rules

- Use the same `--background` surface for the page, panels, controls, and tables.
- Panels, cards, inputs, dialogs, and page sections remain flat. Table wrappers
  are the sole non-button exception and use the shared raised shadow.
- Do not apply raised or inset shadows to non-button elements.
- Use spacing, typography, and subtle flat fills to separate non-button content.
- Do not add gradients.
- Keep radii consistent at `rounded-lg` / `--radius` (8px).
- Non-button elements must not have visible borders. Inputs, tables, panels,
  cards, and dividers rely on spacing and subtle flat fills.
- Do not introduce arbitrary shadow values. Reuse `--neo-shadow-light` and
  `--neo-shadow-dark` with the existing shadow recipes.

## Buttons and Tabs

Every button-like control must look like the same component family.

- Standard height: at least 44px (`min-h-11`).
- Typography: `text-base font-medium`; never bold or semibold.
- Default: same background as the page, no visible border, 8px radius, and a
  raised neumorphic shadow.
- Hover: increase elevation without adding a border.
- Active/selected: use the inset shadow so the control looks pressed.
- Focus: keep the visible two-pixel focus ring and offset.
- Disabled: preserve the shape, reduce opacity, and disable interaction.
- Icon buttons use the same 44px height and pressed/hover behavior.
- Dataset tabs (`Agenti`, `Subjekty`, `Statistiky`) use `neo-tab`; they must
  remain visually identical to other buttons.
- Never create flat ghost buttons whose affordance appears only on hover.

## Inputs

- Inputs have no visible border or neumorphic shadow.
- Use the shared `ui-input` class and its subtle flat fill.
- Standard height is 44px.
- Every input needs an associated visible label or an accessible screen-reader
  label.
- Preserve clear focus rings, keyboard behavior, and disabled states.

## Tables

- Keep headers, intro content, tabs, and pagination inside the standard admin
  container. Only table wrappers break out to near-full viewport width.
- Use the shared `neo-table` wrapper for horizontal overflow and a raised
  neumorphic shadow. Rows remain flat and have no hover animation.
- Tables do not use visible borders or separator lines.
- Use `text-sm` as the minimum table text size.
- Keep every table header label on one line with `whitespace-nowrap`; allow the
  table wrapper to scroll horizontally when necessary.
- Keep every table value on one line. Use `table-auto` so columns size to their
  content and let the wrapper scroll horizontally. Never wrap, break, or squeeze
  cell values.
- Header labels use Czech display names while data access and sorting retain the
  original API keys.
- Display `Exportováno do CDFP` as `Expo…` and expose the full label through a
  hover tooltip and accessible label.
- The first cell in every row is a semantic row header (`th scope="row"`).
- Use alternating rows:
  - odd: `bg-background`
  - even: `bg-foreground/[0.04]`
- Tables have no row hover effect. Use a subtle flat header fill, alternating
  row surfaces, and primary-colored row headers as the permanent treatment.
- Keep sortable headers keyboard accessible and retain `aria-sort`.
- `isReported` / `is_reported` is intentionally hidden.
- Format `created_dt` and `updated_dt` as `D.M.YYYY` without leading zeros.
- When sorting by `created_dt` or `updated_dt`, compare calendar dates first and
  use `id` as the secondary key for rows on the same day. Apply the selected
  direction to both keys.

## Statistics

- Statistics are derived from both agent and subject datasets.
- Origin/source fields may use common variants such as `origin`, `source`,
  `sourceOrigin`, `domain`, or `website`.
- “Naposledy nalezen nový agent” is calculated from `created_dt` (or its
  camel-case equivalent), never `updated_dt`.
- “Currently syncing” comes from the authenticated backend GET endpoint
  `/api/v2/admin/data/utils/get`, which returns `start_char` from agent sync row
  `id = 1` in the `utils` table.
- Display today's date as `Dnes`, yesterday as `Včera`, and older dates as
  `D.M.YYYY`.

## Typography and Color

- Use weights `400` and `500` only.
- Dashboard headings must not exceed 28px.
- Use `clamp()` for responsive headings.
- Use semantic color tokens (`primary`, `secondary`, `foreground`,
  `muted-foreground`) rather than raw component colors.
- Maintain WCAG AA contrast: 4.5:1 for normal text and 3:1 for meaningful UI
  indicators.
- Do not communicate state through color alone; combine color with text, icons,
  position, or inset/raised depth.

## Motion and Accessibility

- Keep state transitions around 200ms.
- Respect the global `prefers-reduced-motion` behavior.
- Interactive targets must be at least 44px on touch layouts.
- Preserve the skip link, semantic landmarks, heading order, table semantics,
  visible keyboard focus, and accessible labels.

## Component Structure

Do not rebuild the dashboard as one large component. Keep responsibilities in:

```text
src/components/AdminDashboard.tsx       # data and state coordinator only
src/components/admin/AdminHeader.tsx    # header and intro
src/components/admin/DashboardTabs.tsx  # dataset navigation
src/components/admin/DataTable.tsx      # sortable dataset table
src/components/admin/StatisticsView.tsx # statistics metrics and filters
src/components/admin/TablePagination.tsx
src/components/admin/types.ts
src/components/admin/utils.ts
```

New substantial behavior belongs in a focused component or utility. Avoid files
that mix fetching, aggregation, presentation, filtering, and pagination.

## Verification

After UI changes, run:

```bash
npm run typecheck
npm run build
```

Run `npm run lint` as well, but note that the generated `next-env.d.ts` currently
triggers the repository's triple-slash-reference lint rule.
