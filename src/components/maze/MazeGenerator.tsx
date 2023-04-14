import { getAPI } from '../../utils/api';
import { useEffect, useState } from 'react';
import { Loader, Flex, Image, createStyles, Container, Center, Tooltip } from '@mantine/core';

import { drawMaze } from '../../utils/drawMaze';
import { MazeProps } from './MazeContainer';
import { Error } from './Error';

const useStyles = createStyles((theme) => ({
  'maze-container': {
    minHeight: '400px',
    minWidth: '400px',
    margin: theme.spacing.md,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      minHeight: '250px',
      minWidth: '250px',
    },
    [`@media (max-width: ${theme.breakpoints.xs})`]: {
      minHeight: '175px',
      minWidth: '175px',
    },
  },
  'image-container': {
    backgroundColor: theme.colors.gray[3],
    borderRadius: theme.radius.md,
    height: '400px',
    width: '400px',
    padding: theme.spacing.md,
    [`@media (max-width: ${theme.breakpoints.md})`]: {
      height: '250px',
      width: '250px',
    },
    [`@media (max-width: ${theme.breakpoints.xs})`]: {
      height: '175px',
      width: '175px',
    },
  },
  'maze-image': {
    height: '100%',
    width: '100%',
  },
}));

export const MazeGenerator = (props: {
  mazeProps: MazeProps;
  mazeImgUrl: string;
  setMazeImgUrl: React.Dispatch<string>;
  gridImgUrl: string;
  setGridImgUrl: React.Dispatch<string>;
  hasGrid: boolean;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<boolean>;
}) => {
  const { classes } = useStyles();
  const { height, width, numRooms } = props.mazeProps;
  const { mazeImgUrl, setMazeImgUrl, gridImgUrl, setGridImgUrl, hasGrid, isLoaded, setIsLoaded } =
    props;
  const [error, setError] = useState(false);

  const getMaze = () =>
    getAPI(`get-maze?height=${height}&width=${width}&numRooms=${numRooms}`).then((res) => {
      if (res.status === 200) {
        const dataURLs = drawMaze(res.data, props.mazeProps);
        setMazeImgUrl(dataURLs.maze);
        setGridImgUrl(dataURLs.combined);
        setError(false);
        setIsLoaded(true);
      } else {
        setError(true);
        setIsLoaded(true);
        console.log(res.status);
        console.log(res.data);
      }
    });

  const viewImage = (imgUrl: string) => {
    const newTab = window.open();
    newTab?.document.write(`<image src="${imgUrl}" />`);
  };

  useEffect(() => {
    getMaze();
  }, [props.mazeProps]);

  return (
    <Flex justify="center" align="center" className={classes['maze-container']}>
      {isLoaded ? (
        error ? (
          <Error />
        ) : (
          <Container className={classes['image-container']}>
            <Center>
              <Tooltip
                label="Click for full-size image"
                withArrow
                arrowSize={10}
                openDelay={300}
                transitionProps={{ transition: 'pop' }}
              >
                <Image
                  src={hasGrid ? gridImgUrl : mazeImgUrl}
                  className={classes['maze-image']}
                  onClick={() => viewImage(hasGrid ? gridImgUrl : mazeImgUrl)}
                />
              </Tooltip>
            </Center>
          </Container>
        )
      ) : (
        <Loader color="pink" />
      )}
    </Flex>
  );
};
