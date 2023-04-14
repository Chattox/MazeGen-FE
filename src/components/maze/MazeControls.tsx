import { Button, Container, Group, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

import { defaultMazeProps, MazeProps } from './MazeContainer';
import { SizeControl } from './controls/SizeControl';
import { ColourControl } from './controls/ColourControl';
import { GridControl } from './controls/GridControl';
import { RoomControl } from './controls/RoomControl';

export interface sizeLimits {
  minMazeSize: number;
  maxMazeSize: number;
  minRoomNumber: number;
  maxRoomNumber: number;
}

const sizeLimits: sizeLimits = {
  minMazeSize: 3,
  maxMazeSize: 401,
  minRoomNumber: 0,
  maxRoomNumber: 3,
};

const validateSize = (size: number, min: number, max: number, field: string) => {
  if (size < min) {
    return `${field} must be higher than ${min}`;
  } else if (size > max) {
    return `${field} must be lower than ${max}`;
  } else if (['Height', 'Width'].includes(field) && size % 2 === 0) {
    return `${field} must be an odd number`;
  } else {
    return null;
  }
};

export const MazeControls = (props: {
  mazeImgUrl: string;
  gridImgUrl: string;
  setMazeGenProps: React.Dispatch<MazeProps>;
  hasGrid: boolean;
  setHasGrid: React.Dispatch<boolean>;
  setIsLoaded: React.Dispatch<boolean>;
}) => {
  const mazeForm = useForm({
    initialValues: defaultMazeProps,
    validate: {
      height: (value) =>
        validateSize(value, sizeLimits.minMazeSize, sizeLimits.maxMazeSize, 'Height'),
      width: (value) =>
        validateSize(value, sizeLimits.minMazeSize, sizeLimits.maxMazeSize, 'Width'),
      numRooms: (value) =>
        validateSize(value, sizeLimits.minRoomNumber, sizeLimits.maxRoomNumber, 'Room number'),
    },
  });
  const [heightErrOpened, setHeightErrOpened] = useState(false);
  const [widthErrOpened, setWidthErrOpened] = useState(false);
  const [roomErrOpened, setRoomErrOpened] = useState(false);
  const { mazeImgUrl, gridImgUrl, hasGrid, setHasGrid } = props;

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
            validatorErrors.numRooms ? setRoomErrOpened(true) : setRoomErrOpened(false);
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
        <RoomControl
          roomErrOpened={roomErrOpened}
          setRoomErrOpened={setRoomErrOpened}
          getInputProps={mazeForm.getInputProps}
        />
        <GridControl hasGrid={hasGrid} setHasGrid={setHasGrid} />
        <Group position="center">
          <Button type="submit">Generate</Button>
          <Button component="a" download href={hasGrid ? gridImgUrl : mazeImgUrl}>
            Download
          </Button>
        </Group>
        <Text c="dimmed" fz="sm" sx={{ marginTop: '16px' }}>
          Note: Bigger mazes can take a while to generate. If it breaks it will let you know, so if
          it's still loading, give it a little more time
        </Text>
      </form>
    </Container>
  );
};
