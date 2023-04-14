import { Center, Checkbox } from '@mantine/core';

import { useStyles } from './common.styles';

export const GridControl = (props: { hasGrid: boolean; setHasGrid: React.Dispatch<boolean> }) => {
  const { classes } = useStyles();
  const { hasGrid, setHasGrid } = props;
  return (
    <Center className={classes.control}>
      <Checkbox
        label="Grid"
        checked={hasGrid}
        onChange={(e) => setHasGrid(e.currentTarget.checked)}
      />
    </Center>
  );
};
