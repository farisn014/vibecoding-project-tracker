
import { useEffect, useState } from 'react';

import { STAGES } from './data/projectData';
import { copyTaskContext, loadTasks } from './utils/taskUtils';

import DeliverablesBoard, {
  loadDeliverables,
} from './components/DeliverablesBoard';
import TaskModal from './components/TaskModal';
import DeleteConfirmation from './components/DeleteConfirmation';
import TeamOverview from './components/TeamOverview';
import TaskColumn from './components/TaskColumn';
import { HandoffToast, CopyToast } from './components/Toast';

const STORAGE_KEY = 'vibetracker.tasks';
const DELIVERABLES_STORAGE_KEY = 'vibetracker.deliverables';

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [deliverables, setDeliverables] = useState(loadDeliverables);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const [handoffMessage, setHandoffMessage] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);

  const [now, setNow] = useState(() => Date.now());

  // Save tasks independently from deliverables.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Unable to save tasks:', error);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(
        DELIVERABLES_STORAGE_KEY,
        JSON.stringify(deliverables),
      );
    } catch (error) {
      console.error('Unable to save deliverables:', error);
    }
  }, [deliverables]);

  // Refresh deadline colours and labels every minute.
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Automatically dismiss notifications.
  useEffect(() => {
    if (!handoffMessage) return undefined;

    const timeout = setTimeout(() => setHandoffMessage(''), 4000);
    return () => clearTimeout(timeout);
  }, [handoffMessage]);

  useEffect(() => {
    if (!copyMessage) return undefined;

    const timeout = setTimeout(() => setCopyMessage(''), 4000);
    return () => clearTimeout(timeout);
  }, [copyMessage]);

  function updateDeliverable(id, value) {
    setDeliverables((current) => ({
      ...current,
      [id]: value,
    }));
  }

  function openNewTask(stageId = 'todo') {
    setSelectedTask(null);
    setIsCreating(true);
    setNewTaskStatus(stageId);
  }

  // Keep the requested starting column for newly created tasks.
  const [newTaskStatus, setNewTaskStatus] = useState('todo');

  function closeTaskModal() {
    setSelectedTask(null);
    setIsCreating(false);
    setNewTaskStatus('todo');
  }

  function openTask(task) {
    setSelectedTask(task);
    setIsCreating(false);
  }

  function saveTask(taskToSave) {
    const taskWithStatus =
      !selectedTask && isCreating
        ? { ...taskToSave, status: taskToSave.status || newTaskStatus }
        : taskToSave;

    setTasks((currentTasks) => {
      const existing = currentTasks.some(
        (task) => task.id === taskWithStatus.id,
      );

      if (existing) {
        return currentTasks.map((task) =>
          task.id === taskWithStatus.id ? taskWithStatus : task,
        );
      }

      return [...currentTasks, taskWithStatus];
    });

    closeTaskModal();
  }

  function deleteTask(taskId) {
    setPendingDeleteId(taskId);
  }

  function confirmDelete() {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== pendingDeleteId),
    );

    setPendingDeleteId(null);
    closeTaskModal();
  }

  function handOffTask(task, newAssignee) {
    if (task.assignee === newAssignee) return;

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === task.id
          ? { ...item, assignee: newAssignee }
          : item,
      ),
    );

    setHandoffMessage(
      `"${task.title}" handed off to ${newAssignee}.`,
    );
  }

  function moveTaskToStage(taskId, stageId) {
    if (!taskId || !STAGES.some((stage) => stage.id === stageId)) {
      setDraggedTaskId(null);
      setDragOverStage(null);
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, status: stageId }
          : task,
      ),
    );

    setDraggedTaskId(null);
    setDragOverStage(null);
  }

  async function handleCopyContext(task) {
    const copied = await copyTaskContext(task);

    setCopyMessage(
      copied
        ? 'Context copied! Paste it into your AI coding tool.'
        : 'Copy failed. Check your browser clipboard permissions and try again.',
    );
  }

  const activeTasks = tasks.filter(
    (task) => task.status !== 'done',
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'done',
  ).length;

  const completionPercentage = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Vibecoding Project Tracker
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Keep your tasks, team progress and AI context together.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openNewTask('todo')}
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            + Add task
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-screen-2xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <DeliverablesBoard
          deliverables={deliverables}
          onUpdate={updateDeliverable}
        />

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-900">
                Project progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>

            <span className="text-lg font-bold text-indigo-700">
              {completionPercentage}%
            </span>
          </div>

          <div
            className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="Project completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completionPercentage}
          >
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {activeTasks} active {activeTasks === 1 ? 'task' : 'tasks'}
          </p>
        </section>

        <TeamOverview tasks={tasks} />

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">Task board</h2>

              <p className="mt-1 text-sm text-slate-500">
                Drag tasks between columns to update their status.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                More than 2 days out
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                Due in 24–48 hours
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                Less than 24 hours
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                Past due
              </span>

              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Done
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
            {STAGES.map((stage) => {
              const stageTasks = tasks.filter(
                (task) => task.status === stage.id,
              );

              return (
                <TaskColumn
                  key={stage.id}
                  stage={stage}
                  tasks={stageTasks}
                  dragOverStage={dragOverStage}
                  draggedTaskId={draggedTaskId}
                  onDragOverStage={setDragOverStage}
                  onDragLeaveStage={(stageId) => {
                    setDragOverStage((current) =>
                      current === stageId ? null : current,
                    );
                  }}
                  onDropTask={moveTaskToStage}
                  onOpenTask={openTask}
                  onHandOff={handOffTask}
                  onCopyContext={handleCopyContext}
                  now={now}
                  onDragStart={setDraggedTaskId}
                  onDragEnd={() => {
                    setDraggedTaskId(null);
                    setDragOverStage(null);
                  }}
                  onAddTask={openNewTask}
                />
              );
            })}
          </div>
        </section>
      </main>

      {(isCreating || selectedTask) && (
        <TaskModal
          key={selectedTask?.id || 'new-task'}
          task={
            selectedTask ||
            {
              status: newTaskStatus,
            }
          }
          onSave={saveTask}
          onClose={closeTaskModal}
          onDelete={deleteTask}
          onCopyContext={handleCopyContext}
          now={now}
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

      <CopyToast
        message={copyMessage}
        onDismiss={() => setCopyMessage('')}
      />
    </div>
  );
}
