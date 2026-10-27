
import { TEAM } from '../data/projectData';
import { TaskAvatar } from './TaskBadges';

export default function TeamOverview({ tasks }) {
  return (
    <section
      aria-labelledby="team-overview-title"
      className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="mb-4">
        <h2
          id="team-overview-title"
          className="font-bold text-slate-900"
        >
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
