
export const STAGES = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

export const TEAM = [
  'Teammate A',
  'Teammate B',
  'Teammate C',
];

export const AVATAR_STYLES = [
  'bg-teal-700 text-white',
  'bg-violet-700 text-white',
  'bg-amber-400 text-slate-950',
];

export const TASK_TYPES = {
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

export const AI_TOOLS = [
  'Claude',
  'ChatGPT',
  'Cursor',
  'Lovable',
  'Replit',
  'Other',
];

export const CONTEXT_TEMPLATE = `Background:
What are you trying to build or fix?

Constraints:
What requirements or limitations matter?

Tried so far:
What have you already attempted? What happened?

Pick up:
What should you ask the AI tool to do next?`;

export const INITIAL_TASKS = [
  {
    id: 'task-001',
    title: 'Set up project repository',
    description: 'Create the repository and establish the initial project structure.',
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
    description: 'Make sure a task retains its selected status when edited.',
    type: 'bug',
    status: 'review',
    assignee: 'Teammate C',
    dueDate: '',
    createdDate: '2026-10-03',
  },
  {
    id: 'task-004',
    title: 'Improve task descriptions',
    description: 'Make it easier for teammates to understand what each task involves.',
    type: 'feature',
    status: 'todo',
    assignee: 'Teammate A',
    dueDate: '',
    createdDate: '2026-10-04',
  },
];
