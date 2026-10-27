
import TaskCard from './TaskCard';

export default function TaskColumn({
  stage,
  tasks,
  dragOverStage,
  draggedTaskId,
  onDragOverStage,
  onDragLeaveStage,
  onDropTask,
  onOpenTask,
  onHandOff,
  onCopyContext,
  now,
  onDragStart,
  onDragEnd,
  onAddTask,
}) {
  const isDragOver = dragOverStage === stage.id;

  return (
    <section
      className={`flex min-h-64 min-w-0 flex-col rounded-xl border p-3 transition-colors ${
        isDragOver
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-slate-200 bg-slate-50'
      }`}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        onDragOverStage(stage.id);
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onDragLeaveStage(stage.id);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();

        const taskId = event.dataTransfer.getData('text/plain');

        if (taskId) {
          onDropTask(taskId, stage.id);
        } else {
          onDropTask(null, stage.id);
        }
      }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-semibold text-slate-800">
          {stage.title}
        </h3>

        <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            now={now}
            onOpen={onOpenTask}
            onHandOff={onHandOff}
            onCopyContext={onCopyContext}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggedTaskId === task.id}
          />
        ))}

        {tasks.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-300 px-3 py-6 text-center text-sm text-slate-400">
            {draggedTaskId ? 'Drop tasks here' : 'No tasks here yet'}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onAddTask(stage.id)}
        className="mt-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-500 transition hover:bg-white hover:text-indigo-700"
      >
        + Add task
      </button>
    </section>
  );
}
