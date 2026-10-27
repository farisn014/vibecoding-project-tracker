
import { TEAM, TASK_TYPES } from '../data/projectData';
import { getDueStyle } from '../utils/taskUtils';
import { TaskAvatar, TaskTypeBadge } from './TaskBadges';

export default function TaskCard({
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

  const dueDateBoxStyle =
    task.status === 'done'
      ? 'border-emerald-300 bg-emerald-100 text-emerald-900'
      : dueStyle.label === 'Overdue'
        ? 'border-red-300 bg-red-100 text-red-900'
        : dueStyle.label === 'Due soon'
          ? 'border-orange-300 bg-orange-100 text-orange-900'
          : dueStyle.label === 'Due shortly'
            ? 'border-yellow-300 bg-yellow-100 text-yellow-900'
            : 'border-blue-300 bg-blue-100 text-blue-900';

  return (
    <article
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', task.id);
        onDragStart(task.id);
      }}
      onDragEnd={onDragEnd}
      className={`rounded-xl border border-l-4 ${typeStyle.card} ${dueStyle.className} p-4 shadow-sm transition-all duration-200 hover:shadow-md ${
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
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 ${dueDateBoxStyle}`}
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
