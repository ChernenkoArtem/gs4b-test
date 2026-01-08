import { Button, Stack, TextField } from '@mui/material';
import { addNewColumn } from '../../../services/board.service.ts';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function AddNewColumn({ getList }: { getList: () => void }) {
  const [isCreateMode, setCreateMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      z.object({ columnTitle: z.string().min(1, 'Title is required') }),
    ),
    defaultValues: {
      columnTitle: '',
    },
  });

  const onSubmit = async (data: { columnTitle: string }) => {
    await addNewColumn(data.columnTitle);
    getList();
    setCreateMode(false);
  };

  const onCancel = () => {
    setCreateMode(false);
  };

  return isCreateMode ? (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={3}
      sx={{ p: 2 }}
    >
      <TextField
        {...register('columnTitle')}
        label="Column Name"
        error={!!errors.columnTitle}
        helperText={errors.columnTitle?.message}
        fullWidth
      />
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel} color="inherit">
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Create
        </Button>
      </Stack>
    </Stack>
  ) : (
    <Button variant="text" onClick={() => setCreateMode(true)}>
      + Add new column
    </Button>
  );
}
