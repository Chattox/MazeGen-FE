import { Button, Container, createStyles, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { HeightControl } from './controls/HeightControl';
import { WidthControl } from './controls/WidthControl';
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
  maxSize = 81;

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
  setMazeGenProps: React.Dispatch<MazeProps>;
  setIsLoaded: React.Dispatch<boolean>;
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
            props.setIsLoaded(false);
          },
          (validatorErrors) => {
            validatorErrors.height ? setHeightErrOpened(true) : setHeightErrOpened(false);
            validatorErrors.width ? setWidthErrOpened(true) : setWidthErrOpened(false);
          }
        )}
      >
        <Group position="center">
          <HeightControl
            heightErrOpened={heightErrOpened}
            setHeightErrOpened={setHeightErrOpened}
            getInputProps={mazeForm.getInputProps}
          />

          <WidthControl
            widthErrOpened={widthErrOpened}
            setWidthErrOpened={setWidthErrOpened}
            getInputProps={mazeForm.getInputProps}
          />
        </Group>
        <Text c="dimmed" fz="sm" className={classes.description}>
          Min: 3, Max: 89. Values must be odd
        </Text>
        <Button type="submit">Generate</Button>
      </form>
    </Container>
  );
};
