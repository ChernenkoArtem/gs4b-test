import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField,
  Button,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
} from '@mui/material';
import Select from '../../select/Select.tsx';
import { priorityOptions, statusOptions } from '../../../data/filters.ts';
import type { Task } from '../../../data/task.interface.ts';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const taskSchema = z.object({
  name: z.string().min(3, 'Min 3 characters').max(50, 'Too long'),
  description: z.string().min(1, 'Description is required'),
  status: z.string().min(1, 'Status is required'),
  priority: z.string().min(1, 'Priority is required'),
  endDate: z.any().refine((date) => {
    return dayjs(date).isAfter(dayjs().subtract(1, 'minute'));
  }, 'Date must be in the future'),
});

type TaskFormData = z.infer<typeof taskSchema>;

export const TaskForm = ({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: Task;
  onSubmit: (data: Partial<Task>) => Promise<void>;
  onCancel: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      status: initialData?.status || 'pending',
      priority: initialData?.priority || 'low',
      endDate: initialData?.endDate || new Date(),
    },
  });

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{ p: 2 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {initialData ? 'Edit Task' : 'Create New Task'}
      </Typography>

      <TextField
        {...register('name')}
        label="Task Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
      />

      <TextField
        {...register('description')}
        label="Description"
        multiline
        rows={3}
        error={!!errors.description}
        helperText={errors.description?.message}
        fullWidth
      />

      <Stack direction="row" spacing={2}>
        <FormControl fullWidth error={!!errors.priority}>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                name="Priority"
                label="Priority"
                multiple={false}
                options={priorityOptions}
                selected={[...priorityOptions].filter(
                  (opt) => opt.value === field.value,
                )}
                onSelect={(items) => field.onChange(items[0]?.value)}
              />
            )}
          />
          <FormHelperText>{errors.priority?.message}</FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.status}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                name="Status"
                label="Status"
                multiple={false}
                options={statusOptions}
                selected={statusOptions.filter(
                  (opt) => opt.value === field.value,
                )}
                onSelect={(items) => field.onChange(items[0]?.value)}
              />
            )}
          />
          <FormHelperText>{errors.status?.message}</FormHelperText>
        </FormControl>
        <Controller
          name="endDate"
          control={control}
          render={({ field, fieldState }) => (
            <DateTimePicker
              label="End Date"
              value={field.value ? dayjs(field.value) : null}
              onChange={(newValue) => {
                field.onChange(newValue ? newValue.toISOString() : null);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {initialData ? 'Save' : 'Create'}
        </Button>
      </Stack>
    </Stack>
  );
};
