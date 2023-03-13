import { useState } from 'react';
import { Container } from '@mantine/core';

import { MazeControls } from './MazeControls';
import { MazeGenerator } from './MazeGenerator';

export interface MazeProps {
  height: number;
  width: number;
}

export const MazeContainer = () => {
  const [mazeGenProps, setMazeGenProps] = useState<MazeProps>({ height: 15, width: 15 });

  return (
    <Container>
      <MazeGenerator mazeSize={mazeGenProps} />
      <MazeControls setMazeGenProps={setMazeGenProps} />
    </Container>
  );
};
