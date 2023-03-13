import { getAPI } from '../../utils/api';
import { useEffect, useState } from 'react';
import { Loader, Flex, Image, createStyles, Container, Center } from '@mantine/core';

import { drawMaze } from '../../utils/drawMaze';

const useStyles = createStyles((theme) => ({
  'maze-container': {
    minHeight: '400px',
    minWidth: '400px',
    margin: theme.spacing.md,
  },
  'image-container': {
    backgroundColor: theme.colors.gray[3],
    borderRadius: theme.radius.md,
    height: '400px',
    width: '400px',
    padding: theme.spacing.md,
  },
  'maze-image': {
    height: '100%',
    width: '100%',
  },
}));

export const MazeGenerator = () => {
  const { classes } = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mazeSize, setMazeSize] = useState({ x: 51, y: 51 });
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
        <Container className={classes['image-container']}>
          <Center>
            <Image src={mazeImgUrl} className={classes['maze-image']} />
          </Center>
        </Container>
      ) : (
        <Loader color="pink" />
      )}
    </Flex>
  );
};
