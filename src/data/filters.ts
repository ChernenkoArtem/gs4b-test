import type { SelectItem } from '../components/select/Select.tsx';

export const STATUS = {
  READY: { value: 'ready', label: 'Ready' },
  PENDING: { value: 'pending', label: 'Pending' },
  COMPLETED: { value: 'completed', label: 'Completed' },
} as const;

export const statusOptions = Object.values({ ...STATUS });

export const PRIORITY = {
  LOW: {
    value: 'low',
    label: 'Low',
  },
  MEDIUM: {
    value: 'medium',
    label: 'Medium',
  },
  HIGH: {
    value: 'high',
    label: 'High',
  },
} as const;

export const priorityOptions = Object.values({ ...PRIORITY });

export interface FilterState {
  status: SelectItem[];
  priority: SelectItem[];
  sortOrder: SelectItem[];
}
