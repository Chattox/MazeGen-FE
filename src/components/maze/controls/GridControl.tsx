import { Center, Checkbox } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';

import { useStyles } from './common.styles';

export const GridControl = (props: { getInputProps: GetInputProps<{ hasGrid: boolean }> }) => {
  const { classes } = useStyles();
  return (
    <Center className={classes.control}>
      <Checkbox label="Grid" {...props.getInputProps('hasGrid', { type: 'checkbox' })} />
    </Center>
  );
};
