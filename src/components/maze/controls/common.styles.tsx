import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  control: {
    margin: theme.spacing.md,
  },
  'num-picker': {
    maxWidth: '70px',
  },
  'colour-picker': {
    maxWidth: '140px',
  },
  error: {
    backgroundColor: theme.colors.red[0],
    borderColor: theme.colors.red[3],
  },
}));
