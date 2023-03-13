import { getAPI } from '../utils/api';
import { useEffect, useState } from 'react';
import { Loader, Flex, Image, createStyles } from '@mantine/core';

import { drawMaze } from '../utils/drawMaze';

const useStyles = createStyles(() => ({
  'maze-container': {
    height: '100%',
    width: '100%',
    minHeight: '400px',
    minWidth: '400px',
  },
  'maze-image': {
    maxHeight: '400px',
    maxWidth: '400px',
    margin: '16px',
  },
}));

export const MazeDisplay = () => {
  const { classes } = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mazeSize, setMazeSize] = useState({ x: 15, y: 15 });
  const [mazeImgUrl, setMazeImgUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const getMaze = () =>
    getAPI(`get-maze?height=${mazeSize.x}&width=${mazeSize.y}`).then((res) => {
      if (res.status === 200) {
        setMazeImgUrl(drawMaze(res.data));
        setIsLoaded(true);
      } else {
        console.log(res.status);
        console.log(res.response);
      }
    });

  useEffect(() => {
    getMaze();
    //eslint-disable-next-line
  }, []);

  return (
    <Flex justify="center" align="center" className={classes['maze-container']}>
      {isLoaded ? (
        <Image src={mazeImgUrl} className={classes['maze-image']} />
      ) : (
        <Loader color="pink" />
      )}
    </Flex>
  );
};
