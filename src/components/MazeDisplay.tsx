import { getAPI } from '../utils/api';
import { useEffect, useState } from 'react';
import { Loader, Flex, Container, Image, createStyles, Center } from '@mantine/core';

import { drawMaze } from '../utils/drawMaze';

const useStyles = createStyles(() => ({
  'maze-container': {
    height: '100%',
    width: '100%',
  },
  'maze-image': {
    maxHeight: '400px',
    maxWidth: '400px',
    margin: '16px',
  },
}));

export const MazeDisplay = () => {
  const { classes } = useStyles();
  const [mazeImgUrl, setMazeImgUrl] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const getMaze = () =>
    getAPI('get-maze?height=35&width=35').then((res) => {
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
