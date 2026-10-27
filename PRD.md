# Vibecoding Project Tracker — PRD

**Status:** Hackathon starter PRD · review and fill in the **`<TODO>`** sections before you tag `prd-done`.

---

## 1. Problem

Vibecoding teams have two recurring pains with large projects:

1. **They lose track of tasks.** Three teammates, a hundred small things, no shared view. Nothing tells them what state each task is actually in.
2. **They lose track of prompts.** The AI gave them working code two days ago but no one remembers the prompt that produced it. When they need to iterate, they start from scratch.

A spreadsheet doesn't solve this. A real project tool (Linear, Jira, Notion) is overkill, doesn't know about prompts, and takes hours to set up.

## 2. Target users

- **Primary:** the team members, for the remaining weeks of the summer semester.
- **Secondary:** future cohorts of vibecoders taking the same class.

We are designing the tool we ourselves will use. The pitch demo is also our first real user test.

## 3. Product overview

A single-page web app with two persistent surfaces:

- A **Kanban board** where vibecoding tasks move through four states.
- An **Anchor Board** above it that pins the four final-project deliverables (Presentation, Demo, Report, Documentation).

Each task carries the prompt context that produced it, so any teammate can click a button and copy the task + prompt history back into an AI chat to continue work.

Functional Requirements- 

FR1 - The system should show a Kanban board with four columns which are To Do, In progress, Review and Done 

FR2 - The system should allow users to create, edit and delete tasks if necessary.

FR3 - The system should allow users to click on an existing task to view and update the information, which could include the title, description, assignee and due date.

FR4 - The system should enable users to change the task state and assign tasks to any people working with you.

FR5 - The system should allow users to save prompt context for each task and copy it with the task details, for use in AI tools.

FR6 - The system should automatically save task and deliverable information so that it can be retrieved when the application is reopened.

FR7 - The system should should users to change a task's status and move it between the four Kanban columns.

FR8  — The system should allow users to select a tasky type of feature or bug.

FR9 — The system should allow users to select an AI tool to associate with each task's saved prompt context.

FR10 — The system should allow users to add and save URLs for the four project deliverables: Presentation, Demo, Report and Documentation.

FR11 – The system should allow users to switch between light mode and dark mode through the accessibility settings.

FR12 – The system should allow users to change the text size to default, large or extra large to improve readability.

FR13 – The system should allow users to reset their accessibility settings to the default options.

Non-functional Requirements 

NFR1 - The interface should be clear and easy for other members to navigate without complications.

NFR2 - The app should respond quickly to any user interactions and display the Kanban board without any delays for expected dataset.

NFR3 -The application should handle invalid inputs without crashing or saving invalid task data.

NFR4 - Task information should remain available after refreshing the application, giving browser local storage has not been cleared 

NFR5 - The application should operate in modern desktop web browsers that support its required technologies.

NFR6 - The changes to a task shall be reflected in the appropriate Kanban column and remain consistent with the saved data.

NFR7 - The interface should use sufficiently clear text, labels and visual distinctions to separate users identify task types and statuses.

NFR8 - The application should provide clear feedback to users when they perform actions such as copying prompt context, saving or deleting tasks.

NFR9 – The interface should maintain readable text and sufficient contrast between text and background colours in both light and dark modes.

NFR10 – Accessibility settings should give clear visual feedback for selected and hovered options so users can identify their current selection and read the option labels.

NFR11 – The interface should remain usable when users increase the text size, with text and controls remaining accessible and understandable.

Data Requirements:

DR1 - Each task should have  a unique ID, title and description.

DR2 - Each task should store a type and a valid status

DR3 - Each task should store an assignee, creation date and due date.

DR4- Each task should store its prompt context, linked AI tool and update the timestamp.

DR5 - The system should store task data in the browselocalStorage so the information can be retrieved between sessions.

DR6 - The system should store the type of each task as either feature or bug.

DR7 - When a task is edited, the system should update the existing stored record rather than create a duplicate task.

DR8 - The system should store the URLs associated with the Presentation, Demo, Report and Documentation deliverables, allowing them to remain empty until available.

DR9 – Each task's stored status should be updated when it is moved between Kanban columns, including through drag-and-drop.

DR10 – The system should calculate the task completion indicator using the number of tasks with a Done status and the total number of tasks.

DR11 – When users reset their accessibility settings, the appearance mode should return to light mode and the text size should return to Default.

DR12 – The system should maintain the selected appearance mode and text-size setting while the application is in use.

DR13 – The system should apply the selected text size consistently to the relevant interface elements.

## 4. Primary user flow

1. Open the Webapp. The board loads from local storage.
2. Click "+" to add a task. Fill in title, type, assignee, due date, prompt context.
3. Move the task across columns as you work.
4. When stuck, click "Copy as Prompt Context" on a task and paste it into Claude/ChatGPT/Cursor to continue.
5. Hand off a task to a teammate with one dropdown.
6. Drop final deliverable links into the Anchor Board as you produce them.

## 5. Data model

Locked. Do not change without team agreement.

```js
// A single vibecoding task.
Task = {
  id: string,                    // uuid or timestamp string
  title: string,
  description: string,
  type: 'feature' | 'bug',       // visual color coding
  status: 'todo' | 'in-progress' | 'review' | 'done',
  assignee: string,              // one of the three teammate names from §8
  dueDate: string | null,        // ISO date 'YYYY-MM-DD'
  createdDate: string,           // ISO date 'YYYY-MM-DD'

  // Added in later milestones:
  context: string,               // M9 context — curated briefing for the next AI / teammate
  contextTool: string | null,    // M9 context — 'Claude' | 'ChatGPT' | 'Cursor' | 'Lovable' | 'Replit' | 'Other'
  contextUpdatedAt: string|null, // M9 context — ISO timestamp set automatically on save
}

// One of four pinned deliverable slots.
Anchor = {
  id: 'presentation' | 'demo' | 'report' | 'documentation',
  label: string,                 // human-readable
  url: string | null,            // the link the team pastes in
}
```

## 6. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React (via Vite) | What the scaffold ships with. Don't migrate. |
| Styling | Tailwind | Already configured. Use utility classes; no separate CSS files. |
| State | React `useState` + a `useLocalStorage` hook | Simple, no library needed. |
| Persistence | **localStorage** | Zero infra. Pick this. Do not switch to a backend mid-hackathon. |
| Deploy | Vercel | One-click deploy from GitHub. |

> **Decision:** localStorage, not a shared backend. If you want a shared backend later, that's M14 — out of scope for the hackathon.

## 7. Stage names

Four columns, in this order, with these exact labels in the UI:

1. **To Do**
2. **In Progress**
3. **Review**
4. **Done**

## 8. Team

Fill these in before tagging `prd-done`:

| Slot | Name | GitHub handle |
|---|---|---|
| Teammate A | `<TODO>` | `<TODO>` |
| Teammate B | `<TODO>` | `<TODO>` |
| Teammate C | `<TODO>` | `<TODO>` |

These three names become the **only** allowed values for `Task.assignee`. No auth — just a dropdown.

## 9. Milestone ownership

Fill in the owner column. Recommended default in **bold**; change if your team has different strengths.

| # | Tag | Title | Suggested owner | Final owner |
|---|---|---|---|---|
| 3 | `design-done` | Design system + voice (DESIGN.md) | **B** | `<TODO>` |
| 4 | `data-model` | Task model + board view | **A** | `<TODO>` |
| 5 | `crud-modal` | Add / edit / delete modal | **A** | `<TODO>` |
| 6 | `tag-style` | Feature / bug colors | **B** | `<TODO>` |
| 7 | `task-owner` | Owner indicator + handoff | **A** | `<TODO>` |
| 8 | `due-tint` | Due-date color tinting | **B** | `<TODO>` |
| 9 | `context` | Context field on the task modal | **C** | `<TODO>` |
| 10 | `copy-prompt` | "Copy as Prompt Context" button | **C** | `<TODO>` |
| 11 | `anchors` | Deliverable Anchor Board | **B** | `<TODO>` |
| 12 | `secret-sauce` | The one thing that makes it yours | **C / All** | `<TODO>` |
| 13 | `pitch-ready` | Demo + pitch rehearsal | **All** | `<TODO>` |


Track A owns the state model and task ownership. Track B owns the visuals (and design — M3 runs parallel to M2 so the team starts Phase 3 with the palette already chosen). Track C owns the differentiator features (M9 + M10 — the context field and the Copy-as-Prompt button) and usually leads on M12 secret-sauce. Put your strongest prompter on Track C.

**Dependency note.** M3 (`design-done`) runs **in parallel with M2** — Person B drafts DESIGN.md and pastes the colors into `tailwind.config.js` while the rest of the team reviews the PRD. M6 / M7 / M8 / M11 all depend on M4 + M5 being done first. While Person A builds M4+M5 (first ~60 min of Phase 3), Person C should draft the Markdown template for the "Copy as Prompt Context" output (M10). M12 `secret-sauce` is open-ended — pick whatever makes the tracker uniquely yours; constraint is "must be visible in the demo and must not break anything else."

## 10. AI / vibe coding angle

Where AI will be heavily used:
- M4, M5: scaffold the board and the modal from a single prompt each.
- M9, M10: write the Markdown serialization helper for the Context field.
- M7: animation polish for the handoff toast.

Where AI will **not** save you time:
- M2 (this PRD review) — read it yourself.
- M3 (DESIGN.md) — design taste is yours, not the model's.
- M12 (secret-sauce) — the whole point is that AI can't predict it.
- M13 (pitch) — write the script in your own voice.

Keep the Context field of each real task up to date as you work. By the end of the hackathon you should have a handful of curated context blocks — those become part of your Module 5 "Vibe Coding History" deliverable.

## 11. Team identity

Fill in:

- **Team name:** `<TODO>`
- **Tagline (one sentence):** `<TODO>`
- **Tracker URL after deploy:** `<TODO>` (Vercel will give it to you)

## 12. Out of scope (do not build)

- Authentication / accounts.
- Real GitHub integration.
- A real backend / shared database.
- Mobile responsive — desktop only is fine.
- Multi-team support.
- Real-time collaboration.

## 13. Definition of done

The hackathon is "done" when all 13 milestone tags are pushed to your repo and visible on the dashboard. The pitch is "done" when:

- The board loads on Vercel without errors.
- The "Copy as Prompt Context" demo works on stage.
- 5 min pitch is rehearsed.

---

*PRD version: hackathon-starter v1 · maintained by Prof. Dr. Ignacio Alvarez*
