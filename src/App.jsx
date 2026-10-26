
import { useState, useEffect } from 'react';

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {'feature'|'bug'} type
 * @property {'todo'|'in-progress'|'review'|'done'} status
 * @property {string} assignee
 * @property {string|null} dueDate
 * @property {string} createdDate
 */

export const STAGES = [
  { id: 'todo', label: 'To Do' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Done' },
];

// Replace these names with the names in PRD §8 when available.
export const TEAM = ['Teammate A', 'Teammate B', 'Teammate C'];

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage errors for now.
    }
  }, [key, value]);

  return [value, setValue];
}

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
    dueDate: null,
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
    dueDate: null,
    createdDate: '2026-10-26',
  },
];

export default function App() {
  const [tasks] = useLocalStorage('vibetracker.tasks', INITIAL_TASKS);

  return (
    <div className="min-h-screen bg-surface-page p-6 text-text-primary">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-primary">
          Team workspace
        </p>
        <h1 className="text-2xl font-bold">
          Vibecoding Project Tracker
        </h1>
        <p className="mt-2 text-sm text-text-muted">
          Keep your tasks, deadlines and coding context organised.
        </p>
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
                  <article
                    key={task.id}
                    className="rounded-lg border border-slate-200 bg-surface-card p-4 shadow-sm"
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
                  </article>
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
    </div>
  );
}
