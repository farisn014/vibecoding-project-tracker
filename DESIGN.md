# Vibecoding Project Tracker — Design

**Status:** Hackathon starter design doc · fill in the **`<TODO>`** sections before you tag `design-done`.

**Why this file exists.** This tracker is your tool. It should look like *your* tool — not a generic Kanban with default Tailwind blue. Twenty minutes of design decisions here will be visible on every screen for the next six weeks of Module 5.

**Who owns this.** Person B, during the same window the rest of the team is reviewing the PRD. By the time the team converges to start M4 (`data-model`), this file should be filled in and the colors should already be in `tailwind.config.js`.

---

## 1. Mood / vibe

A calm, focused workspace for vibecoding teams that makes tasks, deadlines and AI prompt context easy to handle without the need of unnecessary information on the app.

`<TODO>`

Two or three references that capture the vibe (links to dribbble shots, screenshots of apps you admire, Pinterest boards — anything visual):


- `<TODO>` https://github.com/features/issues?utm_source=chatgpt.com
- `<TODO>` https://miro.com/
- `<TODO>` https://trello.com/

Anti-references — what we are explicitly **not** trying to look like:

Cluttered dashboards with too many bright colours, excessive gradients, heavy shadows or unnecessary animations. 

monday.com - just because there is too much information on the screen and it is hard for the user to get their head around it.
- `<TODO>`

## 2. Color palette

These are the colors the build milestones will reference. Once chosen, paste the hex values into `tailwind.config.js` so the rest of the team can use Tailwind utility classes (e.g. `bg-brand-primary`, `border-due-warning`).

### Brand

| Token | Hex | Where it shows up |
|---|---|---|
brand-primary | #0F766E | Header, "+" button, focus rings
brand-accent | #14B8A6	| Highlights, hover states, links
surface-page | #F8FAFC | Page background
surface-card | #FFFFFF | Card background
text-primary | #1E293B | Body text
text-muted | #64748B | Captions, dates, counts

### Task type (M6 `tag-style`)

| Token | Hex | When used |
|---|---|---|
type-feature | #2563EB | Feature cards: blue accent stripe and icon
type-bug | #DC2626 | Bug cards: red accent stripe and icon

### Due-date states (M8 `due-tint`)

| Token | Hex | When used |
|---|---|---|
due-safe | #16A34A | More than 2 days out
due-warning | #D97706 | Less than 24 hours
due-overdue | #DC2626 | Past due
due-neutral | #94A3B8 | Done; overrides due-date styling

## 3. Typography

| Role | Font | Why |
|---|---|---|
Heading	Inter | (Semibold, 600) | Creates a clear visual hierarchy while keeping the interface modern and professional.
Body | Inter (Regular, 400) | Keeps task descriptions and interface text readable at small sizes.
Monospace (tags, badges, code) | JetBrains Mono | Gives technical labels and code-related content a familiar developer-focused appearance.

Suggested sizes (override only if the design demands it):

- Page title: 24 px / semibold
- Section header: 16 px / semibold uppercase
- Card title: 14 px / medium
- Body: 14 px / regular
- Caption: 12 px / regular muted

## 4. Component principles

One short sentence per element. These set the tone for the build phase — Person A's modal and Person B's anchor board should both feel like they came from this doc.

Cards: White backgrounds, subtle 1px borders, compact spacing and minimal shadows that appear on hover.

Buttons: Solid teal primary buttons with consistent padding, moderately rounded corners and clear hover and focus states.

Modal: A centred, medium-width modal with clearly labelled fields, a subtle dark backdrop and an obvious close action.

Empty states: Friendly muted text with a clear next action, so an empty column feels like an opportunity rather than an error.

Drag affordance (if used): Show a grab cursor and subtle hover state on draggable cards, with a visible drop target and a status-change alternative.

## 5. Voice / microcopy

Three lines of microcopy that capture the tone of the product. Keep it short — these are the words a stressed user reads at 11pm.

| Where | Text |
|---|---|
"+" button label	Add task
Empty column placeholder | Nothing here yet — add a task to get started.
Toast after "Copy as Prompt Context" | Copied! Your task context is ready to paste into your AI tool.
Confirm-delete message | Delete this task? This action cannot be undone.
Handoff toast (M7 task-owner) | Task assigned to {name}.

## 6. Logo / wordmark

The tracker probably doesn't need a logo, but it does need a name and a wordmark style.

- **Product name:** Vibecoding Project Tracker
- **Wordmark style:** The product name in Inter Semibold, using brand-primary teal, with no separate icon.

## 7. Out of scope (this hackathon)

To keep design tight, the following are explicitly not part of `design-done`:

- A dark mode toggle. Pick one mode and ship it.
- Multiple themes. One brand, applied consistently.
- Animations beyond a 200 ms fade on toast notifications.
- A custom icon set. Use [Lucide icons](https://lucide.dev) via Tailwind classes if you need any.

---

*DESIGN.md version: hackathon-starter v1*
