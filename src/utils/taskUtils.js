
import {
  AI_TOOLS,
  AVATAR_STYLES,
  INITIAL_TASKS,
  STAGES,
  TASK_TYPES,
  TEAM,
} from '../data/projectData';

const STORAGE_KEY = 'vibetracker.tasks';

export function loadTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return INITIAL_TASKS.map((task) => ({
        ...task,
        context: task.context ?? '',
        contextTool: task.contextTool ?? '',
        contextUpdatedAt: task.contextUpdatedAt ?? null,
      }));
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return INITIAL_TASKS.map((task) => ({
        ...task,
        context: task.context ?? '',
        contextTool: task.contextTool ?? '',
        contextUpdatedAt: task.contextUpdatedAt ?? null,
      }));
    }

    return parsed.map((task) => ({
      ...task,
      assignee: TEAM.includes(task.assignee) ? task.assignee : TEAM[0],
      type: TASK_TYPES[task.type] ? task.type : 'feature',
      status: STAGES.some((stage) => stage.id === task.status)
        ? task.status
        : 'todo',
      context: typeof task.context === 'string' ? task.context : '',
      contextTool: AI_TOOLS.includes(task.contextTool)
        ? task.contextTool
        : '',
      contextUpdatedAt: task.contextUpdatedAt || null,
    }));
  } catch (error) {
    console.error('Unable to load saved tasks:', error);

    return INITIAL_TASKS.map((task) => ({
      ...task,
      context: task.context ?? '',
      contextTool: task.contextTool ?? '',
      contextUpdatedAt: task.contextUpdatedAt ?? null,
    }));
  }
}

export function getInitials(name) {
  if (!name) return '?';

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getAvatarStyle(name) {
  const index = TEAM.indexOf(name);
  const safeIndex = index >= 0 ? index : 0;

  return AVATAR_STYLES[safeIndex % AVATAR_STYLES.length];
}

export function getDueStyle(task, now = Date.now()) {
  if (task.status === 'done') {
    return {
      className: 'bg-emerald-50 border-emerald-300',
      label: 'Completed',
      labelClassName: 'bg-emerald-100 text-emerald-800',
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

  const deadline = new Date(year, month - 1, day, 23, 59, 59, 999);

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

  const hoursRemaining = (deadline.getTime() - now) / (1000 * 60 * 60);

  if (hoursRemaining < 0) {
    return {
      className: 'bg-red-50 border-red-300',
      label: 'Overdue',
      labelClassName: 'bg-red-100 text-red-800',
    };
  }

  if (hoursRemaining < 24) {
    return {
      className: 'bg-orange-50 border-orange-300',
      label: 'Due soon',
      labelClassName: 'bg-orange-100 text-orange-800',
    };
  }

  if (hoursRemaining <= 48) {
    return {
      className: 'bg-yellow-50 border-yellow-300',
      label: 'Due shortly',
      labelClassName: 'bg-yellow-100 text-yellow-800',
    };
  }

  return {
    className: 'bg-blue-50 border-blue-300',
    label: '',
    labelClassName: '',
  };
}

export function getRelativeTime(timestamp, now = Date.now()) {
  if (!timestamp) return '';

  const updatedTime = new Date(timestamp).getTime();

  if (!Number.isFinite(updatedTime)) return '';

  const elapsedSeconds = Math.max(
    0,
    Math.floor((now - updatedTime) / 1000),
  );

  if (elapsedSeconds < 60) return 'just now';

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

export function formatTaskContext(task) {
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

export async function copyTaskContext(task) {
  const markdown = formatTaskContext(task);

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(markdown);
      return true;
    }

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
