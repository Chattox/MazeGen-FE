import { useState } from 'react';
import { Container } from '@mantine/core';

import { MazeControls } from './MazeControls';
import { MazeGenerator } from './MazeGenerator';

export interface MazeProps {
  height: number;
  width: number;
  wallColour: string;
  floorColour: string;
  hasGrid: boolean;
}

export const defaultMazeProps: MazeProps = {
  height: 15,
  width: 15,
  wallColour: '#000',
  floorColour: '#FFF',
  hasGrid: false,
};

export const MazeContainer = () => {
  const [mazeGenProps, setMazeGenProps] = useState<MazeProps>(defaultMazeProps);
  const [mazeImgUrl, setMazeImgUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Container>
      <MazeGenerator
        mazeProps={mazeGenProps}
        mazeImgUrl={mazeImgUrl}
        setMazeImgUrl={setMazeImgUrl}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />
      <MazeControls
        mazeImgUrl={mazeImgUrl}
        setMazeGenProps={setMazeGenProps}
        setIsLoaded={setIsLoaded}
      />
    </Container>
  );
};
