import { Button, Container, createStyles, Group, Text, NumberInput, Popover } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { MazeProps } from './MazeContainer';

const useStyles = createStyles((theme) => ({
  'num-picker': {
    maxWidth: '80px',
  },
  description: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  error: {
    backgroundColor: theme.colors.red[0],
    borderColor: theme.colors.red[3],
  },
}));

const minSize = 3,
  maxSize = 89;

const validateSize = (size: number, axis: string) => {
  if (size < minSize) {
    return `${axis} must be higher than ${minSize}`;
  } else if (size > maxSize) {
    return `${axis} must be lower than ${maxSize}`;
  } else if (size % 2 === 0) {
    return `${axis} must be an odd number`;
  } else {
    return null;
  }
};

export const MazeControls = (props: {
  setMazeGenProps: React.Dispatch<React.SetStateAction<MazeProps>>;
}) => {
  const { classes } = useStyles();
  const mazeForm = useForm({
    initialValues: {
      height: 15,
      width: 15,
    },
    validate: {
      height: (value) => validateSize(value, 'Height'),
      width: (value) => validateSize(value, 'Width'),
    },
  });
  const [heightErrOpened, setHeightErrOpened] = useState(false);
  const [widthErrOpened, setWidthErrOpened] = useState(false);

  return (
    <Container>
      <form
        onSubmit={mazeForm.onSubmit(
          (values) => {
            props.setMazeGenProps({ ...values });
          },
          (validatorErrors) => {
            validatorErrors.height ? setHeightErrOpened(true) : setHeightErrOpened(false);
            validatorErrors.width ? setWidthErrOpened(true) : setWidthErrOpened(false);
          }
        )}
      >
        <Group position="center">
          <Popover
            opened={heightErrOpened}
            onChange={setHeightErrOpened}
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
                error={heightErrOpened}
                {...mazeForm.getInputProps('height', { withError: false })}
              />
            </Popover.Target>
            <Popover.Dropdown>{mazeForm.getInputProps('height').error}</Popover.Dropdown>
          </Popover>

          <Popover
            opened={widthErrOpened}
            onChange={setWidthErrOpened}
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
                error={widthErrOpened}
                {...mazeForm.getInputProps('width', { withError: false })}
              />
            </Popover.Target>
            <Popover.Dropdown>{mazeForm.getInputProps('width').error}</Popover.Dropdown>
          </Popover>
        </Group>
        <Text c="dimmed" fz="sm" className={classes.description}>
          Min: 3, Max: 89. Values must be odd
        </Text>
        <Button type="submit">Generate</Button>
      </form>
    </Container>
  );
};
