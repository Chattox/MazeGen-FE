import { useState } from 'react';
import { Container } from '@mantine/core';

import { MazeControls } from './MazeControls';
import { MazeGenerator } from './MazeGenerator';

export interface MazeProps {
  height: number;
  width: number;
  wallColour: string;
  floorColour: string;
}

export const defaultMazeProps: MazeProps = {
  height: 15,
  width: 15,
  wallColour: '#000',
  floorColour: '#FFF',
};

export const MazeContainer = () => {
  const [mazeGenProps, setMazeGenProps] = useState<MazeProps>(defaultMazeProps);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Container>
      <MazeGenerator mazeProps={mazeGenProps} isLoaded={isLoaded} setIsLoaded={setIsLoaded} />
      <MazeControls setMazeGenProps={setMazeGenProps} setIsLoaded={setIsLoaded} />
    </Container>
  );
};
