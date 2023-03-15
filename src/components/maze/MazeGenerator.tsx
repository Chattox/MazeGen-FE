import { getAPI } from '../../utils/api';
import { useEffect } from 'react';
import { Loader, Flex, Image, createStyles, Container, Center, Tooltip } from '@mantine/core';

import { drawMaze } from '../../utils/drawMaze';
import { MazeProps } from './MazeContainer';

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

export const MazeGenerator = (props: {
  mazeProps: MazeProps;
  mazeImgUrl: string;
  setMazeImgUrl: React.Dispatch<string>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<boolean>;
}) => {
  const { classes } = useStyles();
  const { height, width } = props.mazeProps;
  const { mazeImgUrl, setMazeImgUrl, isLoaded, setIsLoaded } = props;

  const getMaze = () =>
    getAPI(`get-maze?height=${height}&width=${width}`).then((res) => {
      if (res.status === 200) {
        setMazeImgUrl(drawMaze(res.data, props.mazeProps));
        setIsLoaded(true);
      } else {
        console.log(res.status);
        console.log(res.response);
      }
    });

  const viewImage = () => {
    const newTab = window.open();
    newTab?.document.write(`<image src="${mazeImgUrl}" />`);
  };

  useEffect(() => {
    getMaze();
    //eslint-disable-next-line
  }, [props.mazeProps]);

  return (
    <Flex justify="center" align="center" className={classes['maze-container']}>
      {isLoaded ? (
        <Container className={classes['image-container']}>
          <Center>
            <Tooltip
              label="Click for full-size image"
              withArrow
              arrowSize={10}
              openDelay={300}
              transitionProps={{ transition: 'pop' }}
            >
              <Image src={mazeImgUrl} className={classes['maze-image']} onClick={viewImage} />
            </Tooltip>
          </Center>
        </Container>
      ) : (
        <Loader color="pink" />
      )}
    </Flex>
  );
};
