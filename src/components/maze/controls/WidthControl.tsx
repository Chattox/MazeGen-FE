import { Popover, NumberInput } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';

import { useStyles } from './common.styles';

export const WidthControl = (props: {
  widthErrOpened: boolean;
  setWidthErrOpened: React.Dispatch<React.SetStateAction<boolean>>;
  getInputProps: GetInputProps<{ height: number; width: number }>;
}) => {
  const { classes } = useStyles();
  return (
    <Popover
      opened={props.widthErrOpened}
      onChange={props.setWidthErrOpened}
      position="top-start"
      withArrow
      arrowSize={10}
      arrowPosition="center"
      shadow="xs"
      classNames={{ dropdown: classes.error, arrow: classes.error }}
    >
      <Popover.Target>
        <NumberInput
          defaultValue={15}
          placeholder="Width"
          label="Width"
          min={3}
          max={89}
          step={2}
          className={classes['num-picker']}
          error={props.widthErrOpened}
          {...props.getInputProps('width', { withError: false })}
        />
      </Popover.Target>
      <Popover.Dropdown>{props.getInputProps('width').error}</Popover.Dropdown>
    </Popover>
  );
};
