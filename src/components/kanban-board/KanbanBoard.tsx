import { useFilters } from '../../context/FiltersContext.tsx';
import Card from './card/Card.tsx';
import { Button, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { simulateApiRequest } from '../../utils/utils.ts';
import {
  createTask,
  filterColumns,
  updateTask,
} from '../../services/board.service.ts';
import type { Column, Task } from '../../data/task.interface.ts';
import type { FilterState } from '../../data/filters.ts';
import { TaskForm } from './task-form/TaskForm.tsx';
import { useModal } from '../../context/ModalContext.tsx';
import AddNewColumn from './addNewColumn/AddNewColumn.tsx';

export default function KanbanBoard() {
  const { filters } = useFilters() || {};
  const [tasks, setTasks] = useState<Column[]>([]);
  const [isPending, startTransition] = useTransition();
  const { openModal, closeModal } = useModal();

  const getTasksList = useCallback(
    (controller: AbortController) => {
      startTransition(async () => {
        try {
          const result = await simulateApiRequest<Column[]>(
            'http://localhost:3000/columns?_embed=tasks',
            {
              method: 'GET',
              signal: controller.signal,
            },
          );
          startTransition(() => {
            setTasks(filterColumns(result, filters as FilterState));
          });
        } catch (e) {
          console.error(e);
        }
      });
    },
    [filters, startTransition],
  );

  const handleEditTask = (task: Task) => {
    openModal(TaskForm, {
      initialData: task,
      onSubmit: async (data) => {
        try {
          await updateTask(+task.id, data);
          const controller = new AbortController();
          getTasksList(controller);
          closeModal();
        } catch (e) {
          console.error(e);
        }
      },
      onCancel: closeModal,
    });
  };

  const handleAddTask = (columnId: string) => {
    openModal(TaskForm, {
      onSubmit: async (data) => {
        await createTask(data, columnId);
        const controller = new AbortController();
        getTasksList(controller);
        closeModal();
      },
      onCancel: closeModal,
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    getTasksList(controller);

    return () => controller.abort();
  }, [filters]);

  if (!tasks.length && !isPending) {
    return <div>No tasks found</div>;
  }

  return (
    <div css={{ display: 'flex', height: '100%' }}>
      {isPending ? (
        <div
          css={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress enableTrackSlot size="3rem" />
        </div>
      ) : (
        <ol css={{ display: 'flex', height: '100%', gap: '1rem' }}>
          {tasks.map((column) => (
            <li key={column.id || column.columnTitle}>
              <h2>{column.columnTitle}</h2>
              <div>
                {!!column.tasks.length &&
                  column.tasks.map((task) => (
                    <Card
                      task={task}
                      key={task.id}
                      onClick={() => handleEditTask(task)}
                      getList={getTasksList}
                    />
                  ))}
              </div>
              <div key="new-task">
                <Button variant="text" onClick={() => handleAddTask(column.id)}>
                  + Add Task
                </Button>
              </div>
            </li>
          ))}
          <li>
            <AddNewColumn />
          </li>
        </ol>
      )}
    </div>
  );
}
