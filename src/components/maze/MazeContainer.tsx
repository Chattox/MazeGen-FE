import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';

import { MazeControls } from './MazeControls';
import { MazeGenerator } from './MazeGenerator';

export interface MazeProps {
  height: number;
  width: number;
  wallColour: string;
  floorColour: string;
  numRooms: number;
}

export const defaultMazeProps: MazeProps = {
  height: 15,
  width: 15,
  wallColour: '#000',
  floorColour: '#FFF',
  numRooms: 0,
};

export const MazeContainer = () => {
  const [mazeGenProps, setMazeGenProps] = useState<MazeProps>(defaultMazeProps);
  const [mazeImgUrl, setMazeImgUrl] = useState('');
  const [gridImgUrl, setGridImgUrl] = useState('');
  const [hasGrid, setHasGrid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('derp');
  }, [mazeGenProps]);

  return (
    <Container>
      <MazeGenerator
        mazeProps={mazeGenProps}
        mazeImgUrl={mazeImgUrl}
        setMazeImgUrl={setMazeImgUrl}
        gridImgUrl={gridImgUrl}
        setGridImgUrl={setGridImgUrl}
        hasGrid={hasGrid}
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
      />
      <MazeControls
        mazeImgUrl={mazeImgUrl}
        setMazeGenProps={setMazeGenProps}
        hasGrid={hasGrid}
        setHasGrid={setHasGrid}
        setIsLoaded={setIsLoaded}
      />
    </Container>
  );
};
