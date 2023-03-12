import { getAPI } from '../utils/api';
import { useEffect, useState } from 'react';
import { SimpleGrid } from '@mantine/core';

export const MazeDisplay = () => {
  const [maze, setMaze] = useState([[]]);
  const [mazeHeight, setMazeHeight] = useState(0);
  const [mazeWidth, setMazeWidth] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const getMaze = () =>
    getAPI('get-maze?height=15&width=15').then((res) => {
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
    <div>
      {isLoaded ? (
        <SimpleGrid cols={mazeWidth}>
          {maze.map((row) =>
            row.map((tile, i) => {
              console.log(mazeWidth);
              return <div key={i}>{tile}</div>;
            })
          )}
        </SimpleGrid>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};
