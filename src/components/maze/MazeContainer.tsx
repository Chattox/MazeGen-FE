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
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Container>
      <MazeGenerator mazeSize={mazeGenProps} isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      <MazeControls setMazeGenProps={setMazeGenProps} setIsLoaded={setIsLoaded} />
    </Container>
  );
};
