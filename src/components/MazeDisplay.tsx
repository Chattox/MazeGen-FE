import { getAPI } from '../utils/api';
import { useEffect, useState } from 'react';
import { Loader, Container, Image } from '@mantine/core';

import { drawMaze } from '../utils/drawMaze';

export const MazeDisplay = () => {
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

  return <Container>{isLoaded ? <Image src={mazeImgUrl} /> : <Loader color="pink" />}</Container>;
};
