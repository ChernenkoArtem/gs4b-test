import type { Column, Task } from '../data/task.interface.ts';
import type { FilterState } from '../data/filters.ts';
import { simulateApiRequest } from '../utils/utils.ts';

export const filterColumns = (
  columns: Column[],
  filters: FilterState,
): Column[] => {
  const selectedStatuses = new Set(filters.status.map((s) => s.value));
  const selectedPriorities = new Set(filters.priority.map((p) => p.value));

  const currentSortOrder = filters.sortOrder[0].value as
    | 'asc'
    | 'desc'
    | undefined;

  return columns.map((column) => {
    const processedTasks = column.tasks.filter((task) => {
      if (selectedStatuses.size > 0 && !selectedStatuses.has(task.status)) {
        return false;
      }

      return !(
        selectedPriorities.size > 0 && !selectedPriorities.has(task.priority)
      );
    });

    if (currentSortOrder) {
      processedTasks.sort((a, b) => {
        const dateA = a.endDate ? new Date(a.endDate).getTime() : Infinity;
        const dateB = b.endDate ? new Date(b.endDate).getTime() : Infinity;

        return currentSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    return {
      ...column,
      tasks: processedTasks,
    };
  });
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
  return await simulateApiRequest(
    `http://localhost:3000/tasks/${taskId}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    },
    'Failed to update task with id',
    false,
  );
};

export const createTask = async (taskData: Task, columnId: string) => {
  return await simulateApiRequest(
    'http://localhost:3000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...taskData,
        id: crypto.randomUUID(),
        columnId,
      }),
    },
    'Failed to create task',
    false,
  );
};

export const addNewColumn = async (title: string) => {
  return await simulateApiRequest(
    'http://localhost:3000/columns',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        columnTitle: title,
      }),
    },
    'Failed to create column',
    false,
  );
};

export const deleteTask = async (taskId: string | number) => {
  return await simulateApiRequest(
    `http://localhost:3000/tasks/${taskId}`,
    {
      method: 'DELETE',
    },
    'Failed to delete task with id',
    false,
  );
};
