import { Container } from '@mantine/core';
import { MazeControls } from './MazeControls';
import { MazeGenerator } from './MazeGenerator';

export const MazeContainer = () => {
  return (
    <Container>
      <MazeGenerator />
      <MazeControls />
    </Container>
  );
};
