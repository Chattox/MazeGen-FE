import { Button, Container, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import { defaultMazeProps, MazeProps } from './MazeContainer';
import { SizeControl } from './controls/SizeControl';
import { ColourControl } from './controls/ColourControl';
import { GridControl } from './controls/GridControl';

export interface sizeLimits {
  minSize: number;
  maxSize: number;
}

const sizeLimits: sizeLimits = {
  minSize: 3,
  maxSize: 81,
};

const validateSize = (size: number, axis: string) => {
  if (size < sizeLimits.minSize) {
    return `${axis} must be higher than ${sizeLimits.minSize}`;
  } else if (size > sizeLimits.maxSize) {
    return `${axis} must be lower than ${sizeLimits.maxSize}`;
  } else if (size % 2 === 0) {
    return `${axis} must be an odd number`;
  } else {
    return null;
  }
};

export const MazeControls = (props: {
  mazeImgUrl: string;
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
        <SizeControl
          heightErrOpened={heightErrOpened}
          setHeightErrOpened={setHeightErrOpened}
          widthErrOpened={widthErrOpened}
          setWidthErrOpened={setWidthErrOpened}
          getInputProps={mazeForm.getInputProps}
          sizeLimits={sizeLimits}
        />
        <ColourControl getInputProps={mazeForm.getInputProps} />
        <GridControl getInputProps={mazeForm.getInputProps} />
        <Group position="center">
          <Button type="submit">Generate</Button>
          <Button component="a" download href={props.mazeImgUrl}>
            Download
          </Button>
        </Group>
      </form>
    </Container>
  );
};
