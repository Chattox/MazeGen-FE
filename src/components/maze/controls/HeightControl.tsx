import { Popover, NumberInput } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';

import { useStyles } from './common.styles';

export const HeightControl = (props: {
  heightErrOpened: boolean;
  setHeightErrOpened: React.Dispatch<React.SetStateAction<boolean>>;
  getInputProps: GetInputProps<{ height: number; width: number }>;
}) => {
  const { classes } = useStyles();
  return (
    <Popover
      opened={props.heightErrOpened}
      onChange={props.setHeightErrOpened}
      position="top-end"
      withArrow
      arrowSize={10}
      arrowPosition="center"
      shadow="xs"
      classNames={{ dropdown: classes.error, arrow: classes.error }}
    >
      <Popover.Target>
        <NumberInput
          defaultValue={15}
          placeholder="Height"
          label="Height"
          min={3}
          max={89}
          step={2}
          className={classes['num-picker']}
          error={props.heightErrOpened}
          {...props.getInputProps('height', { withError: false })}
        />
      </Popover.Target>
      <Popover.Dropdown>{props.getInputProps('height').error}</Popover.Dropdown>
    </Popover>
  );
};
