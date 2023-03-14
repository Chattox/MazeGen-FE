import { Button, Container, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { HeightControl } from './controls/HeightControl';
import { WidthControl } from './controls/WidthControl';
import { defaultMazeProps, MazeProps } from './MazeContainer';

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
  const mazeForm = useForm({
    initialValues: defaultMazeProps,
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
        <Text c="dimmed" fz="sm">
          Min: 3, Max: 89. Values must be odd
        </Text>
        <Button type="submit">Generate</Button>
      </form>
    </Container>
  );
};
