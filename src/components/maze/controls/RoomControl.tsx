import { Center, NumberInput } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';

import { useStyles } from './common.styles';

export const RoomControl = (props: { getInputProps: GetInputProps<{ numRooms: number }> }) => {
  const { classes } = useStyles();
  return (
    <Center className={classes.control}>
      <NumberInput
        defaultValue={0}
        placeholder="Number of randomly generated rooms"
        label="# of Rooms"
        className={classes['num-picker']}
        min={0}
        max={3}
        {...props.getInputProps('numRooms')}
      />
    </Center>
  );
};
