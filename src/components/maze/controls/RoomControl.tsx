import { Center, NumberInput, Popover } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';

import { useStyles } from './common.styles';

export const RoomControl = (props: {
  roomErrOpened: boolean;
  setRoomErrOpened: React.Dispatch<boolean>;
  getInputProps: GetInputProps<{ numRooms: number }>;
}) => {
  const { classes } = useStyles();
  return (
    <Center className={classes.control}>
      <Popover
        opened={props.roomErrOpened}
        onChange={props.setRoomErrOpened}
        withArrow
        arrowSize={10}
        arrowPosition="center"
        shadow="xs"
        classNames={{ dropdown: classes.error, arrow: classes.error }}
      >
        <Popover.Target>
          <NumberInput
            defaultValue={0}
            label="# of Rooms"
            className={classes['num-picker']}
            min={0}
            max={3}
            {...props.getInputProps('numRooms', { withError: false })}
          />
        </Popover.Target>
        <Popover.Dropdown>{props.getInputProps('numRooms').error}</Popover.Dropdown>
      </Popover>
    </Center>
  );
};
