import { getAPI } from '../utils/api';
import { useEffect, useState } from 'react';
import { Loader, Grid, Container } from '@mantine/core';

export const MazeDisplay = () => {
  const [maze, setMaze] = useState([[]]);
  const [mazeHeight, setMazeHeight] = useState(0);
  const [mazeWidth, setMazeWidth] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const getMaze = () =>
    getAPI('get-maze?height=35&width=35').then((res) => {
      if (res.status === 200) {
        setMaze(res.data);
        setMazeHeight(res.data.length);
        setMazeWidth(res.data[0].length);
        setIsLoaded(true);
      } else {
        console.log('Status not 200');
      }
    });

  useEffect(() => {
    getMaze();
    //eslint-disable-next-line
  }, []);

  return (
    <Container maw={`${mazeWidth}rem`} mah={`${mazeHeight}rem`}>
      {isLoaded ? (
        <Grid columns={mazeWidth} gutter={1} maw={`${mazeWidth}rem`} mah={`${mazeHeight}rem`}>
          {maze.map((row) =>
            row.map((tile) => (
              <Grid.Col span={1} h="16px" w="16px">
                {tile}
              </Grid.Col>
            ))
          )}
        </Grid>
      ) : (
        <Loader color="pink" />
      )}
    </Container>
  );
};
