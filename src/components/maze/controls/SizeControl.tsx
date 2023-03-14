import { Group, Popover, NumberInput, Text, Container } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';
import { sizeLimits } from '../MazeControls';

import { useStyles } from './common.styles';

export const SizeControl = (props: {
  heightErrOpened: boolean;
  setHeightErrOpened: React.Dispatch<boolean>;
  widthErrOpened: boolean;
  setWidthErrOpened: React.Dispatch<boolean>;
  getInputProps: GetInputProps<{ height: number; width: number }>;
  sizeLimits: sizeLimits;
}) => {
  const { classes } = useStyles();
  const { minSize, maxSize } = props.sizeLimits;

  return (
    <Container>
      <Group position="center" className={classes.control}>
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
              min={minSize}
              max={maxSize}
              step={2}
              className={classes['num-picker']}
              error={props.heightErrOpened}
              {...props.getInputProps('height', { withError: false })}
            />
          </Popover.Target>
          <Popover.Dropdown>{props.getInputProps('height').error}</Popover.Dropdown>
        </Popover>

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
              min={minSize}
              max={maxSize}
              step={2}
              className={classes['num-picker']}
              error={props.widthErrOpened}
              {...props.getInputProps('width', { withError: false })}
            />
          </Popover.Target>
          <Popover.Dropdown>{props.getInputProps('width').error}</Popover.Dropdown>
        </Popover>
      </Group>
      <Text c="dimmed" fz="sm">
        {`Min: ${minSize}, Max: ${maxSize}. Values must be odd`}
      </Text>
    </Container>
  );
};
