import {
  Box,
  CardContent,
  Chip,
  Stack,
  Typography,
  Card as MuiCard,
  type CardProps,
  Tooltip,
  IconButton,
} from '@mui/material';
import type { Task } from '../../../data/task.interface.ts';
import React, { type HTMLProps } from 'react';
import { deleteTask } from '../../../services/board.service.ts';

export default function Card({
  task,
  getList,
  ...commonProps
}: {
  task: Task;
  getList: (controller: AbortController) => void;
  commonProps: HTMLProps<CardProps>;
}) {
  const priorityColors: Record<string, { bg: string; text: string }> = {
    low: { bg: '#E2E8F0', text: '#475569' },
    medium: { bg: '#FEF3C7', text: '#D97706' },
    high: { bg: '#FEE2E2', text: '#DC2626' },
  };

  const deleteTaskHandler = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    await deleteTask(task.id);
    getList(new AbortController());
  };

  return (
    <MuiCard
      {...commonProps}
      sx={{
        maxWidth: 280,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        cursor: 'grab',
        '&:hover': { backgroundColor: '#f9fafb' },
        transition: 'background-color 0.2s ease',
        mb: 2,
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Stack spacing={1}>
          <Box
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Chip
              label={task.priority.toUpperCase()}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: priorityColors[task.priority].bg,
                color: priorityColors[task.priority].text,
                borderRadius: '4px',
              }}
            />

            <Tooltip title="Delete">
              <IconButton
                onClick={deleteTaskHandler}
                size="small"
                sx={{
                  color: '#d32f2f',
                  padding: '4px',
                  borderRadius: '4px',

                  '&:hover': {
                    backgroundColor: '#fee2e2',
                    color: '#b71c1c',
                  },
                  '& span': {
                    fontSize: '1.2rem',
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                }}
              >
                <span>&#128465;</span>
              </IconButton>
            </Tooltip>
          </Box>

          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, lineHeight: 1.2, color: '#172B4D' }}
          >
            {task.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: '#5E6C84', fontSize: '0.85rem' }}
          >
            {task.description}
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={1}
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <span>🕒</span>
              <Typography variant="caption" sx={{ color: '#5E6C84' }}>
                {task.status}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </MuiCard>
  );
}
