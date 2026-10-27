
import { getAvatarStyle, getInitials } from '../utils/taskUtils';
import { TASK_TYPES } from '../data/projectData';

export function TaskAvatar({ name, size = 'normal' }) {
  const isLarge = size === 'large';

  return (
    <div
      title={name || 'Unassigned'}
      className={`flex shrink-0 items-center justify-center rounded-full font-semibold ${
        isLarge
          ? 'h-10 w-10 text-sm'
          : 'h-8 w-8 text-xs'
      } ${getAvatarStyle(name)}`}
    >
      {getInitials(name)}
    </div>
  );
}

export function TaskTypeBadge({ type }) {
  const taskType = TASK_TYPES[type] ?? TASK_TYPES.feature;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${taskType.badge}`}
    >
      <span aria-hidden="true">{taskType.icon}</span>
      {taskType.label}
    </span>
  );
}
