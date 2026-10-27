
import { useState } from 'react';

import {
  AI_TOOLS,
  CONTEXT_TEMPLATE,
  STAGES,
  TASK_TYPES,
  TEAM,
} from '../data/projectData';

import { getRelativeTime } from '../utils/taskUtils';

export default function TaskModal({
  task,
  onSave,
  onClose,
  onDelete,
  onCopyContext,
  now,
}) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(
    task?.description ?? '',
  );
  const [type, setType] = useState(task?.type ?? 'feature');
  const [status, setStatus] = useState(task?.status ?? 'todo');
  const [assignee, setAssignee] = useState(
    task?.assignee ?? TEAM[0],
  );
  const [dueDate, setDueDate] = useState(task?.dueDate ?? '');
  const [context, setContext] = useState(
    task?.context || (task ? '' : CONTEXT_TEMPLATE),
  );
  const [contextTool, setContextTool] = useState(
    task?.contextTool ?? '',
  );
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Please enter a task title.');
      return;
    }

    onSave({
      ...task,
      id: task?.id ?? `task-${Date.now()}`,
      title: trimmedTitle,
      description: description.trim(),
      type,
      status,
      assignee,
      dueDate,
      context,
      contextTool,
      contextUpdatedAt: task?.contextUpdatedAt ?? null,
      createdDate:
        task?.createdDate ?? new Date().toISOString().slice(0, 10),
    });
  }

  function handleContextChange(value) {
    setContext(value);
    setContextUpdatedAt(Date.now());
  }

  const [contextUpdatedAt, setContextUpdatedAt] = useState(
    task?.contextUpdatedAt ?? null,
  );

  function handleCopyCurrentContext() {
    onCopyContext({
      ...task,
      title: title.trim() || 'Untitled task',
      description,
      context,
      contextTool,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
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
        className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
            <div>
              <h2
                id="task-modal-title"
                className="text-xl font-bold text-slate-900"
              >
                {task ? 'Edit task' : 'Create task'}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage the task details and AI hand-off context.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close task form"
              className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              ×
            </button>
          </div>

          <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
            <div>
              <label
                htmlFor="task-title"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Task title <span className="text-red-600">*</span>
              </label>

              <input
                id="task-title"
                autoFocus
                required
                maxLength={120}
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (error) setError('');
                }}
                placeholder="What needs to be done?"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {error && (
                <p className="mt-1.5 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}
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
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the task and what needs to be achieved..."
                className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="task-type"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Task type
                </label>

                <select
                  id="task-type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {Object.entries(TASK_TYPES).map(([value, item]) => (
                    <option key={value} value={value}>
                      {item.icon} {item.label}
                    </option>
                  ))}
                </select>
              </div>

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
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                  Assignee
                </label>

                <select
                  id="task-assignee"
                  value={assignee}
                  onChange={(event) => setAssignee(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {TEAM.map((member) => (
                    <option key={member} value={member}>
                      {member}
                    </option>
                  ))}
                </select>
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
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <section className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    AI task context
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    Save what the AI needs to know so your team can
                    pick up where the work left off.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCurrentContext}
                  className="shrink-0 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                >
                  Copy context
                </button>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="task-ai-tool"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  AI tool
                </label>

                <select
                  id="task-ai-tool"
                  value={contextTool}
                  onChange={(event) =>
                    setContextTool(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Select an AI tool (optional)</option>

                  {AI_TOOLS.map((tool) => (
                    <option key={tool} value={tool}>
                      {tool}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="task-context"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Saved context and next steps
                </label>

                <textarea
                  id="task-context"
                  rows={7}
                  value={context}
                  onChange={(event) =>
                    handleContextChange(event.target.value)
                  }
                  placeholder={CONTEXT_TEMPLATE}
                  className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-mono text-sm leading-6 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />

                {contextUpdatedAt && (
                  <p className="mt-2 text-xs text-slate-500">
                    Context updated{' '}
                    {getRelativeTime(contextUpdatedAt, now)}
                  </p>
                )}
              </div>
            </section>

            {task && (
              <div className="border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Delete task
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              {task ? 'Save changes' : 'Create task'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
