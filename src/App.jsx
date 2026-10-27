
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'vibetracker.tasks';

// MILESTONE 11: Keep deliverable links separate from saved task data.
const DELIVERABLES_STORAGE_KEY = 'vibetracker.deliverables';

const DELIVERABLES = [
  {
    id: 'presentation',
    title: 'Presentation',
    description: 'Slides for presenting the project.',
  },
  {
    id: 'demo',
    title: 'Demo',
    description: 'Link to the working project demonstration.',
  },
  {
    id: 'report',
    title: 'Report',
    description: 'Project report and written deliverables.',
  },
  {
    id: 'documentation',
    title: 'Documentation',
    description: 'Supporting and technical documentation.',
  },
];

function loadDeliverables() {
  const emptyDeliverables = Object.fromEntries(
    DELIVERABLES.map((deliverable) => [deliverable.id, '']),
  );

  try {
    const saved = window.localStorage.getItem(
      DELIVERABLES_STORAGE_KEY,
    );

    if (!saved) {
      return emptyDeliverables;
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      typeof parsed !== 'object' ||
      Array.isArray(parsed)
    ) {
      return emptyDeliverables;
    }

    return Object.fromEntries(
      DELIVERABLES.map((deliverable) => [
        deliverable.id,
        typeof parsed[deliverable.id] === 'string'
          ? parsed[deliverable.id]
          : '',
      ]),
    );
  } catch {
    return emptyDeliverables;
  }
}

function DeliverablesBoard({ deliverables, onUpdate }) {
  return (
    <section
      aria-labelledby="deliverables-title"
      className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h2
          id="deliverables-title"
          className="font-bold text-slate-900"
        >
          Project deliverables
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Keep the key project links together so your team can find
          them quickly.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DELIVERABLES.map((deliverable) => {
          const url = deliverables[deliverable.id] || '';
          const hasUrl = url.trim().length > 0;

          return (
            <div
              key={deliverable.id}
              className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  aria-label={
                    hasUrl ? 'Link added' : 'No link added'
                  }
                  title={hasUrl ? 'Link added' : 'No link added'}
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    hasUrl
                      ? 'bg-emerald-500'
                      : 'border-2 border-slate-300 bg-white'
                  }`}
                />

                <h3 className="font-semibold text-slate-900">
                  {deliverable.title}
                </h3>
              </div>

              <p className="mb-3 min-h-10 text-sm leading-5 text-slate-500">
                {deliverable.description}
              </p>

              <label
                htmlFor={`deliverable-${deliverable.id}`}
                className="mb-1.5 block text-xs font-semibold text-slate-600"
              >
                URL
              </label>

              <input
                id={`deliverable-${deliverable.id}`}
                type="url"
                inputMode="url"
                value={url}
                onChange={(event) =>
                  onUpdate(deliverable.id, event.target.value)
                }
                placeholder="https://..."
                className="w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {hasUrl && (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block break-all text-sm font-semibold text-indigo-700 hover:text-indigo-900 hover:underline"
                >
                  Open link ↗
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

const STAGES = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

const TEAM = ['Teammate A', 'Teammate B', 'Teammate C'];

const AVATAR_STYLES = [
  'bg-teal-700 text-white',
  'bg-violet-700 text-white',
  'bg-amber-400 text-slate-950',
];

const TASK_TYPES = {
  feature: {
    label: 'Feature',
    icon: '✦',
    badge: 'bg-blue-100 text-blue-800',
    card: 'border-l-blue-500',
  },
  bug: {
    label: 'Bug',
    icon: '🐛',
    badge: 'bg-red-100 text-red-800',
    card: 'border-l-red-500',
  },
};

const AI_TOOLS = [
  'Claude',
  'ChatGPT',
  'Cursor',
  'Lovable',
  'Replit',
  'Other',
];

const CONTEXT_TEMPLATE = `Background:
What are you trying to build or fix?

Constraints:
What requirements or limitations matter?

Tried so far:
What have you already attempted? What happened?

Pick up:
What should you ask the AI tool to do next?`;

const INITIAL_TASKS = [
  {
    id: 'task-001',
    title: 'Set up project repository',
    description:
      'Create the repository and establish the initial project structure.',
    type: 'feature',
    status: 'done',
    assignee: 'Teammate A',
    dueDate: '',
    createdDate: '2026-10-01',
  },
  {
    id: 'task-002',
    title: 'Build the Kanban board',
    description: 'Display tasks in the four workflow columns.',
    type: 'feature',
    status: 'in-progress',
    assignee: 'Teammate B',
    dueDate: '',
    createdDate: '2026-10-02',
  },
  {
    id: 'task-003',
    title: 'Fix task status updates',
    description:
      'Make sure a task retains its selected status when edited.',
    type: 'bug',
    status: 'review',
    assignee: 'Teammate C',
    dueDate: '',
    createdDate: '2026-10-03',
  },
  {
    id: 'task-004',
    title: 'Improve task descriptions',
    description:
      'Make it easier for teammates to understand what each task involves.',
    type: 'feature',
    status: 'todo',
    assignee: 'Teammate A',
    dueDate: '',
    createdDate: '2026-10-04',
  },
];

function loadTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return INITIAL_TASKS;
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return INITIAL_TASKS;
    }

    return parsed.map((task) => ({
      ...task,
      assignee: TEAM.includes(task.assignee)
        ? task.assignee
        : TEAM[0],
      type: TASK_TYPES[task.type] ? task.type : 'feature',
      status: STAGES.some((stage) => stage.id === task.status)
        ? task.status
        : 'todo',
      context:
        typeof task.context === 'string' ? task.context : '',
      contextTool: AI_TOOLS.includes(task.contextTool)
        ? task.contextTool
        : '',
      contextUpdatedAt: task.contextUpdatedAt || null,
    }));
  } catch {
    return INITIAL_TASKS;
  }
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function getAvatarStyle(name) {
  const index = TEAM.indexOf(name);
  const safeIndex = index >= 0 ? index : 0;

  return AVATAR_STYLES[safeIndex % AVATAR_STYLES.length];
}

function TaskAvatar({ name, size = 'normal' }) {
  const dimensions =
    size === 'large' ? 'h-11 w-11 text-sm' : 'h-9 w-9 text-xs';

  return (
    <span
      title={name}
      aria-label={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-white ${dimensions} ${getAvatarStyle(name)}`}
    >
      {getInitials(name)}
    </span>
  );
}

function TaskTypeBadge({ type }) {
  const style = TASK_TYPES[type] || TASK_TYPES.feature;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${style.badge}`}
    >
      <span aria-hidden="true">{style.icon}</span>
      {style.label}
    </span>
  );
}

// MILESTONE 8: Calculate deadline styling using the existing task data.
function getDueStyle(task, now = Date.now()) {
  if (task.status === 'done') {
    return {
      className: 'bg-slate-100 border-slate-200',
      label: 'Completed',
      labelClassName: 'bg-slate-200 text-slate-700',
    };
  }

  if (!task.dueDate) {
    return {
      className: 'bg-white border-slate-200',
      label: '',
      labelClassName: '',
    };
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(task.dueDate);

  if (!match) {
    return {
      className: 'bg-white border-slate-200',
      label: '',
      labelClassName: '',
    };
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const deadline = new Date(
    year,
    month - 1,
    day,
    23,
    59,
    59,
    999,
  );

  if (
    deadline.getFullYear() !== year ||
    deadline.getMonth() !== month - 1 ||
    deadline.getDate() !== day
  ) {
    return {
      className: 'bg-white border-slate-200',
      label: '',
      labelClassName: '',
    };
  }

  const hoursRemaining =
    (deadline.getTime() - now) / (1000 * 60 * 60);

  if (hoursRemaining < 0) {
    return {
      className: 'bg-red-50 border-red-300',
      label: 'Overdue',
      labelClassName: 'bg-red-100 text-red-800',
    };
  }

  if (hoursRemaining < 24) {
    return {
      className: 'bg-amber-50 border-amber-300',
      label: 'Due soon',
      labelClassName: 'bg-amber-100 text-amber-800',
    };
  }

  if (hoursRemaining <= 48) {
    return {
      className: 'bg-sky-50 border-sky-300',
      label: 'Due shortly',
      labelClassName: 'bg-sky-100 text-sky-800',
    };
  }

  return {
    className: 'bg-emerald-50 border-emerald-200',
    label: '',
    labelClassName: '',
  };
}

// MILESTONE 9: Format the context's last-updated time.
function getRelativeTime(timestamp, now = Date.now()) {
  if (!timestamp) {
    return '';
  }

  const updatedTime = new Date(timestamp).getTime();

  if (!Number.isFinite(updatedTime)) {
    return '';
  }

  const elapsedSeconds = Math.max(
    0,
    Math.floor((now - updatedTime) / 1000),
  );

  if (elapsedSeconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(elapsedSeconds / 60);

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  const years = Math.floor(days / 365);

  return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

// MILESTONE 10: Format task details and AI context as Markdown.
function formatTaskContext(task) {
  return [
    `# ${task.title?.trim() || 'Untitled task'}`,
    '',
    '## Description',
    task.description?.trim() || 'No description provided.',
    '',
    '## AI Task Context',
    task.context?.trim() || 'No additional context provided.',
  ].join('\n');
}

// MILESTONE 10: Copy the formatted task briefing to the clipboard.
async function copyTaskContext(task) {
  const markdown = formatTaskContext(task);

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(markdown);
      return true;
    }

    // Fallback for browsers without the Clipboard API.
    const textArea = document.createElement('textarea');
    textArea.value = markdown;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();

    const copied = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (!copied) {
      throw new Error('The browser could not copy the text.');
    }

    return true;
  } catch (error) {
    console.error('Unable to copy task context:', error);
    return false;
  }
}

function TaskModal({
  task,
  onSave,
  onClose,
  onDelete,
  onCopyContext,
  now,
}) {
  const isEditing = Boolean(task);

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(
    task?.description || '',
  );
  const [type, setType] = useState(task?.type || 'feature');
  const [status, setStatus] = useState(task?.status || 'todo');
  const [assignee, setAssignee] = useState(
    task?.assignee || TEAM[0],
  );
  const [dueDate, setDueDate] = useState(task?.dueDate || '');

  // MILESTONE 9: Existing tasks keep their saved context.
  // New tasks receive the starter template.
  const [context, setContext] = useState(
    task ? task.context || '' : CONTEXT_TEMPLATE,
  );
  const [contextTool, setContextTool] = useState(
    task?.contextTool || '',
  );
  const [contextUpdatedAt, setContextUpdatedAt] = useState(
    task?.contextUpdatedAt || null,
  );

  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    onSave({
      ...(task || {}),
      id: task?.id || `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      status,
      assignee,
      dueDate,
      context,
      contextTool,
      contextUpdatedAt,
      createdDate:
        task?.createdDate || new Date().toISOString().slice(0, 10),
    });
  }

  // MILESTONE 10: Copy the current form values, including unsaved edits.
  function handleCopyCurrentContext() {
    onCopyContext({
      ...(task || {}),
      title,
      description,
      context,
      contextTool,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="task-modal-title"
              className="text-xl font-bold text-slate-900"
            >
              {isEditing ? 'Edit task' : 'Create a task'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add the details your team needs to get the work done.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task form"
            className="rounded-lg px-3 py-1 text-2xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Task title *
            </label>
            <input
              id="task-title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError('');
              }}
              placeholder="What needs to be done?"
              maxLength={120}
              autoFocus
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add some context for your teammates..."
              rows={3}
              className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* MILESTONE 9: Task context and AI tool selection */}
          <section
            aria-labelledby="task-context-heading"
            className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4"
          >
            <div className="mb-3">
              <h3
                id="task-context-heading"
                className="font-bold text-slate-900"
              >
                AI task context
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Save the background and progress needed to continue
                working on this task with an AI coding tool.
              </p>
            </div>

            <div>
              <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="task-context"
                  className="text-sm font-semibold text-slate-700"
                >
                  Context (Markdown)
                </label>

                {contextUpdatedAt && (
                  <span
                    className="text-xs text-slate-500"
                    aria-live="polite"
                  >
                    Last updated{' '}
                    {getRelativeTime(contextUpdatedAt, now)}
                  </span>
                )}
              </div>

              <textarea
                id="task-context"
                value={context}
                onChange={(event) => {
                  setContext(event.target.value);
                  setContextUpdatedAt(new Date().toISOString());
                }}
                placeholder={CONTEXT_TEMPLATE}
                rows={8}
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Include relevant prompts, decisions, errors, constraints
                and what the next person or AI tool should do.
              </p>
            </div>

            <div className="mt-4">
              <label
                htmlFor="task-context-tool"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                AI tool (optional)
              </label>

              <select
                id="task-context-tool"
                value={contextTool}
                onChange={(event) => setContextTool(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select an AI tool...</option>
                {AI_TOOLS.map((tool) => (
                  <option key={tool} value={tool}>
                    {tool}
                  </option>
                ))}
              </select>
            </div>

            {/* MILESTONE 10: Copy Context inside the task modal */}
            <button
              type="button"
              onClick={handleCopyCurrentContext}
              className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Copy Context
            </button>
          </section>

          <div>
            <p className="mb-2 block text-sm font-semibold text-slate-700">
              Task type
            </p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(TASK_TYPES).map(([typeId, typeInfo]) => (
                <button
                  key={typeId}
                  type="button"
                  onClick={() => setType(typeId)}
                  aria-pressed={type === typeId}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    type === typeId
                      ? `${typeInfo.badge} border-current ring-2 ring-indigo-100`
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span aria-hidden="true">{typeInfo.icon}</span>{' '}
                  {typeInfo.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {STAGES.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="task-assignee"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Assigned to
              </label>
              <select
                id="task-assignee"
                value={assignee}
                onChange={(event) => setAssignee(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {TEAM.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="task-due-date"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              Due date
            </label>
            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                >
                  Delete task
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                {isEditing ? 'Save changes' : 'Create task'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-xl text-red-700">
          !
        </div>

        <h2
          id="delete-dialog-title"
          className="text-lg font-bold text-slate-900"
        >
          Delete this task?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This action cannot be undone. The task will be permanently removed
          from your board.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Delete task
          </button>
        </div>
      </section>
    </div>
  );
}

function TeamOverview({ tasks }) {
  return (
    <section
      aria-labelledby="team-overview-title"
      className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h2 id="team-overview-title" className="font-bold text-slate-900">
          Team overview
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          See who is responsible for the work currently in progress.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {TEAM.map((member) => {
          const activeCount = tasks.filter(
            (task) =>
              task.assignee === member && task.status !== 'done',
          ).length;

          return (
            <div
              key={member}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3"
            >
              <TaskAvatar name={member} size="large" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {member}
                </p>
                <p className="text-sm text-slate-500">
                  {activeCount} active{' '}
                  {activeCount === 1 ? 'task' : 'tasks'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// MILESTONE 12: Task cards can be dragged between Kanban columns.
function TaskCard({
  task,
  onOpen,
  onHandOff,
  onCopyContext,
  now,
  onDragStart,
  onDragEnd,
  isDragging,
}) {
  const typeStyle = TASK_TYPES[task.type] || TASK_TYPES.feature;
  const dueStyle = getDueStyle(task, now);

  return (
    <article
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', task.id);
        onDragStart(task.id);
      }}
      onDragEnd={onDragEnd}
      className={`rounded-xl border border-slate-200 border-l-4 ${typeStyle.card} ${dueStyle.className} p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
        isDragging
          ? 'scale-[0.98] opacity-40'
          : 'cursor-grab active:cursor-grabbing'
      }`}
    >
      <button
        type="button"
        onClick={() => onOpen(task)}
        className="block w-full rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        aria-label={`Edit task: ${task.title}`}
      >
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <TaskTypeBadge type={task.type} />
          <span className="text-xs text-slate-400">
            {task.id.replace('task-', '#')}
          </span>
        </div>

        <h3 className="break-words font-semibold text-slate-900">
          {task.title}
        </h3>

        {task.description && (
          <p className="mt-2 line-clamp-3 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
            {task.description}
          </p>
        )}
      </button>

      <div className="mt-4 border-t border-slate-200/70 pt-3">
        <div className="flex items-center gap-2">
          <TaskAvatar name={task.assignee} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {task.assignee}
            </p>
            <p className="text-xs text-slate-500">Task owner</p>
          </div>
        </div>

        {task.dueDate && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 ${
                task.status === 'done'
                  ? 'border-slate-300 bg-slate-100 text-slate-600'
                  : dueStyle.label === 'Overdue'
                    ? 'border-red-300 bg-red-100 text-red-900'
                    : dueStyle.label === 'Due soon'
                      ? 'border-amber-300 bg-amber-100 text-amber-900'
                      : dueStyle.label === 'Due shortly'
                        ? 'border-sky-300 bg-sky-100 text-sky-900'
                        : 'border-emerald-300 bg-emerald-100 text-emerald-900'
              }`}
            >
              <span aria-hidden="true" className="text-base">
                📅
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                  Due date
                </p>
                <p className="text-sm font-bold">
                  {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
                    'en-GB',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    },
                  )}
                </p>
              </div>
            </div>

            {dueStyle.label && (
              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${dueStyle.labelClassName}`}
              >
                {dueStyle.label}
              </span>
            )}
          </div>
        )}

        <div className="mt-3">
          <label
            htmlFor={`handoff-${task.id}`}
            className="mb-1.5 block text-xs font-semibold text-slate-600"
          >
            Hand off to…
          </label>
          <select
            id={`handoff-${task.id}`}
            value={task.assignee}
            onChange={(event) => onHandOff(task, event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            {TEAM.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => onOpen(task)}
          className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-white hover:text-indigo-700"
        >
          View or edit task
        </button>

        {/* MILESTONE 10: Copy Context button on every task card */}
        <button
          type="button"
          onClick={() => onCopyContext(task)}
          className="mt-2 w-full rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Copy Context
        </button>
      </div>
    </article>
  );
}

function HandoffToast({ message, onDismiss }) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-[70] flex w-[calc(100%-2.5rem)] max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-xl"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
        ✓
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-900">Task reassigned</p>
        <p className="mt-1 break-words text-sm text-slate-600">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="rounded-lg px-2 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        ×
      </button>
    </div>
  );
}

// MILESTONE 10: Separate feedback for clipboard actions.
function CopyToast({ message, onDismiss }) {
  if (!message) {
    return null;
  }

  const failed = message.startsWith('Copy failed');

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 left-5 z-[70] flex w-[calc(100%-2.5rem)] max-w-sm items-start gap-3 rounded-xl border p-4 shadow-xl ${
        failed
          ? 'border-red-200 bg-white'
          : 'border-indigo-200 bg-white'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold ${
          failed
            ? 'bg-red-100 text-red-700'
            : 'bg-indigo-100 text-indigo-700'
        }`}
      >
        {failed ? '!' : '✓'}
      </span>

      <p className="min-w-0 flex-1 break-words text-sm font-medium text-slate-800">
        {message}
      </p>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss copy notification"
        className="rounded-lg px-2 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        ×
      </button>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [handoffMessage, setHandoffMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  // MILESTONE 11: Load deliverable links from their own localStorage key.
  const [deliverables, setDeliverables] = useState(loadDeliverables);

  // MILESTONE 12: Track dragged cards and highlighted drop targets.
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  // MILESTONE 8: Update deadline colours and context timestamps automatically.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Unable to save tasks to local storage:', error);
    }
  }, [tasks]);

  // MILESTONE 11: Persist only deliverable URLs; do not touch saved tasks.
  useEffect(() => {
    try {
      window.localStorage.setItem(
        DELIVERABLES_STORAGE_KEY,
        JSON.stringify(deliverables),
      );
    } catch (error) {
      console.error(
        'Unable to save deliverable links to local storage:',
        error,
      );
    }
  }, [deliverables]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!handoffMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setHandoffMessage('');
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [handoffMessage]);

  // MILESTONE 10: Automatically dismiss clipboard feedback.
  useEffect(() => {
    if (!copyMessage) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyMessage('');
    }, 4000);

    return () => window.clearTimeout(timeoutId);
  }, [copyMessage]);

  // MILESTONE 11: Update one deliverable without changing other links.
  function updateDeliverable(deliverableId, url) {
    setDeliverables((currentDeliverables) => ({
      ...currentDeliverables,
      [deliverableId]: url,
    }));
  }

  function saveTask(taskToSave) {
    setTasks((currentTasks) => {
      const existing = currentTasks.some(
        (task) => task.id === taskToSave.id,
      );

      if (existing) {
        return currentTasks.map((task) =>
          task.id === taskToSave.id ? taskToSave : task,
        );
      }

      return [...currentTasks, taskToSave];
    });

    setSelectedTask(null);
    setIsCreating(false);
  }

  function deleteTask(taskId) {
    setSelectedTask(null);
    setIsCreating(false);
    setPendingDeleteId(taskId);
  }

  function confirmDelete() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== pendingDeleteId),
    );
    setPendingDeleteId(null);
  }

  function handOffTask(task, newAssignee) {
    if (task.assignee === newAssignee) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((currentTask) =>
        currentTask.id === task.id
          ? { ...currentTask, assignee: newAssignee }
          : currentTask,
      ),
    );

    setHandoffMessage(
      `"${task.title}" handed off to ${newAssignee}.`,
    );
  }

  // MILESTONE 12: Move a task between Kanban columns.
  function moveTaskToStage(taskId, newStatus) {
    if (!STAGES.some((stage) => stage.id === newStatus)) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus }
          : task,
      ),
    );

    setDraggedTaskId(null);
    setDragOverStage(null);
  }

  // MILESTONE 10: Copy the selected task's Markdown briefing.
  async function handleCopyContext(task) {
    const success = await copyTaskContext(task);

    setCopyMessage(
      success
        ? 'Context copied! Paste it into your AI coding tool.'
        : 'Copy failed. Check your browser clipboard permissions and try again.',
    );
  }

  const activeTasks = tasks.filter((task) => task.status !== 'done');

  // MILESTONE 12: Calculate completion directly from the saved task states.
  const completedTasks = tasks.filter(
    (task) => task.status === 'done',
  ).length;

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-sm">
              V
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Vibecoding Project Tracker
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Keep your team, tasks, and progress in sync.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedTask(null);
              setIsCreating(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              +
            </span>
            Add Task
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* MILESTONE 11: Deliverable links sit above the existing board. */}
        <DeliverablesBoard
          deliverables={deliverables}
          onUpdate={updateDeliverable}
        />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-slate-900">
              Project board
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {tasks.length} total {tasks.length === 1 ? 'task' : 'tasks'} ·{' '}
              {activeTasks.length} active
            </p>

            {/* MILESTONE 12: Live project completion indicator. */}
            <div className="mt-4 max-w-xl rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-slate-700">
                  Project completion
                </span>

                <span
                  className="font-bold text-indigo-700"
                  aria-live="polite"
                >
                  {completedTasks} of {tasks.length} completed (
                  {completionPercentage}%)
                </span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
                aria-label="Project completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={completionPercentage}
              >
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <TeamOverview tasks={tasks} />

        {/* MILESTONE 8: Deadline colour legend */}
        <div
          aria-label="Task deadline colour legend"
          className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600"
        >
          <span className="font-semibold text-slate-800">
            Deadline colours:
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-emerald-300 bg-emerald-50" />
            More than 48 hours
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-sky-300 bg-sky-50" />
            24–48 hours
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-amber-300 bg-amber-50" />
            Under 24 hours
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-red-300 bg-red-50" />
            Overdue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-slate-300 bg-slate-100" />
            Done / no due date
          </span>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
          {STAGES.map((stage) => {
            const stageTasks = tasks.filter(
              (task) => task.status === stage.id,
            );

            return (
              <section
                key={stage.id}
                aria-labelledby={`stage-${stage.id}`}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = 'move';

                  if (dragOverStage !== stage.id) {
                    setDragOverStage(stage.id);
                  }
                }}
                onDragLeave={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget)
                  ) {
                    setDragOverStage((current) =>
                      current === stage.id ? null : current,
                    );
                  }
                }}
                onDrop={(event) => {
                  event.preventDefault();

                  const taskId =
                    event.dataTransfer.getData('text/plain');

                  if (taskId) {
                    moveTaskToStage(taskId, stage.id);
                  } else {
                    setDragOverStage(null);
                  }
                }}
                className={`min-w-0 rounded-2xl border p-3 transition-colors duration-200 ${
                  dragOverStage === stage.id
                    ? 'border-indigo-400 bg-indigo-50 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-slate-100/70'
                }`}
              >
                <div className="mb-4 flex items-center justify-between px-1 pt-1">
                  <h2
                    id={`stage-${stage.id}`}
                    className="font-bold text-slate-800"
                  >
                    {stage.title}
                  </h2>
                  <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-slate-600 shadow-sm">
                    {stageTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      now={now}
                      onOpen={(selected) => {
                        setSelectedTask(selected);
                        setIsCreating(false);
                      }}
                      onHandOff={handOffTask}
                      onCopyContext={handleCopyContext}
                      onDragStart={setDraggedTaskId}
                      onDragEnd={() => {
                        setDraggedTaskId(null);
                        setDragOverStage(null);
                      }}
                      isDragging={draggedTaskId === task.id}
                    />
                  ))}

                  {stageTasks.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-300 px-3 py-8 text-center">
                      <p className="text-sm text-slate-400">
                        {draggedTaskId
                          ? 'Drop task here'
                          : 'No tasks here yet'}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedTask(null);
                    setIsCreating(true);
                  }}
                  className="mt-3 w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-indigo-700"
                >
                  + Add task
                </button>
              </section>
            );
          })}
        </div>
      </div>

      {(isCreating || selectedTask) && (
        <TaskModal
          key={selectedTask?.id || 'new-task'}
          task={selectedTask}
          now={now}
          onSave={saveTask}
          onClose={() => {
            setSelectedTask(null);
            setIsCreating(false);
          }}
          onDelete={deleteTask}
          onCopyContext={handleCopyContext}
        />
      )}

      {pendingDeleteId && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      <HandoffToast
        message={handoffMessage}
        onDismiss={() => setHandoffMessage('')}
      />

      {/* MILESTONE 10: Clipboard success/failure notification */}
      <CopyToast
        message={copyMessage}
        onDismiss={() => setCopyMessage('')}
      />
    </main>
  );
}
