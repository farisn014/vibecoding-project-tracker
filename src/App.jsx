
import { useState, useEffect } from 'react';

export const STAGES = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

export const TEAM = [
  'Teammate A',
  'Teammate B',
  'Teammate C',
];

const INITIAL_TASKS = [
  {
    id: 'task-001',
    title: 'Create Kanban board',
    description: 'Build the four-column task board.',
    type: 'feature',
    status: 'in-progress',
    assignee: TEAM[0],
    dueDate: '2026-11-02',
    createdDate: '2026-10-26',
  },
  {
    id: 'task-002',
    title: 'Fix task deletion',
    description: 'Make sure tasks can be removed safely.',
    type: 'bug',
    status: 'todo',
    assignee: TEAM[1],
    dueDate: '',
    createdDate: '2026-10-26',
  },
  {
    id: 'task-003',
    title: 'Design task modal',
    description: 'Plan the form for creating and editing tasks.',
    type: 'feature',
    status: 'review',
    assignee: TEAM[2],
    dueDate: '2026-11-05',
    createdDate: '2026-10-26',
  },
  {
    id: 'task-004',
    title: 'Test local storage',
    description: 'Check that task data survives a page refresh.',
    type: 'feature',
    status: 'done',
    assignee: TEAM[0],
    dueDate: '',
    createdDate: '2026-10-26',
  },
];

function loadTasks() {
  try {
    const saved = window.localStorage.getItem('vibetracker.tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

function TaskModal({ task, onSave, onDelete, onClose }) {
  const [form, setForm] = useState(() => ({
    title: task?.title ?? '',
    description: task?.description ?? '',
    type: task?.type ?? 'feature',
    status: task?.status ?? 'todo',
    assignee: task?.assignee ?? TEAM[0],
    dueDate: task?.dueDate ?? '',
  }));

  const [error, setError] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function submitForm(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    onSave({
      ...task,
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate || null,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 id="task-modal-title" className="text-xl font-bold">
            {task ? 'Edit task' : 'Create task'}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg px-3 py-1 text-xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <form onSubmit={submitForm} className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium">
              Title *
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={updateField}
              required
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-teal-700"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={updateField}
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-teal-700"
              placeholder="Describe the task"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="type" className="mb-1 block text-sm font-medium">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={updateField}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="feature">Feature</option>
                <option value="bug">Bug</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-1 block text-sm font-medium"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={updateField}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                {STAGES.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="assignee"
              className="mb-1 block text-sm font-medium"
            >
              Assignee
            </label>
            <select
              id="assignee"
              name="assignee"
              value={form.assignee}
              onChange={updateField}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
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
              htmlFor="dueDate"
              className="mb-1 block text-sm font-medium"
            >
              Due date
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={form.dueDate ?? ''}
              onChange={updateField}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-4">
            <div>
              {task && (
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="rounded-lg px-4 py-2 font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-300 px-4 py-2 font-medium hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg bg-brand-primary px-4 py-2 font-semibold text-white hover:bg-teal-800"
              >
                Save task
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'vibetracker.tasks',
        JSON.stringify(tasks)
      );
    } catch {
      // Storage may be unavailable in some browser environments.
    }
  }, [tasks]);

  function saveTask(formData) {
    if (selectedTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === selectedTask.id
            ? { ...task, ...formData }
            : task
        )
      );
    } else {
      const newTask = {
        ...formData,
        id: `task-${Date.now()}`,
        createdDate: new Date().toISOString().slice(0, 10),
      };

      setTasks((previous) => [...previous, newTask]);
    }

    setSelectedTask(null);
    setIsCreating(false);
  }

  function deleteTask(taskId) {
    setPendingDeleteId(taskId);
  }

  function confirmDelete() {
    if (!pendingDeleteId) return;

    setTasks((previous) =>
      previous.filter((task) => task.id !== pendingDeleteId)
    );

    setSelectedTask(null);
    setIsCreating(false);
    setPendingDeleteId(null);
  }

  return (
    <div className="min-h-screen bg-surface-page p-6 text-text-primary">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-primary">
            Team workspace
          </p>

          <h1 className="text-2xl font-bold">
            Vibecoding Project Tracker
          </h1>

          <p className="mt-2 text-sm text-text-muted">
            Keep your tasks, deadlines and coding context organised.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSelectedTask(null);
            setIsCreating(true);
          }}
          className="rounded-lg bg-brand-primary px-4 py-2.5 font-semibold text-white shadow-sm hover:bg-teal-800"
        >
          + Add Task
        </button>
      </header>

      <main className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((stage) => {
          const stageTasks = tasks.filter(
            (task) => task.status === stage.id
          );

          return (
            <section
              key={stage.id}
              className="min-w-0 rounded-xl border border-slate-200 bg-slate-100/70 p-3"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">{stage.label}</h2>

                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-text-muted">
                  {stageTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {stageTasks.map((task) => (
                  <button
                    type="button"
                    key={task.id}
                    onClick={() => {
                      setSelectedTask(task);
                      setIsCreating(false);
                    }}
                    className="block w-full rounded-lg border border-slate-200 bg-surface-card p-4 text-left shadow-sm transition hover:border-teal-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${
                          task.type === 'bug'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {task.type === 'bug' ? 'Bug' : 'Feature'}
                      </span>

                      <span className="text-xs text-text-muted">
                        {task.id}
                      </span>
                    </div>

                    <h3 className="font-semibold">{task.title}</h3>

                    <p className="mt-2 text-sm leading-5 text-text-muted">
                      {task.description}
                    </p>

                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <p className="text-xs text-text-muted">
                        Assigned to
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {task.assignee}
                      </p>

                      {task.dueDate && (
                        <p className="mt-2 text-xs text-text-muted">
                          Due: {task.dueDate}
                        </p>
                      )}
                    </div>

                    <p className="mt-3 text-xs text-brand-primary">
                      Click to view or edit
                    </p>
                  </button>
                ))}

                {stageTasks.length === 0 && (
                  <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-text-muted">
                    Nothing here yet — add a task to get started.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </main>

      {(isCreating || selectedTask) && (
        <TaskModal
          key={selectedTask?.id ?? 'new-task'}
          task={selectedTask}
          onSave={saveTask}
          onDelete={deleteTask}
          onClose={() => {
            setSelectedTask(null);
            setIsCreating(false);
          }}
        />
      )}

      {pendingDeleteId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                <span className="text-xl text-red-600">!</span>
              </div>

              <div>
                <h2
                  id="delete-dialog-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Delete task?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Are you sure you want to delete this task? This action
                  cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingDeleteId(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
              >
                Delete task
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
