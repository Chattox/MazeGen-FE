import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  'num-picker': {
    maxWidth: '80px',
  },
  error: {
    backgroundColor: theme.colors.red[0],
    borderColor: theme.colors.red[3],
  },
}));
