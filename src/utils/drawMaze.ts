import { createCanvas } from 'canvas';
import { MazeProps } from '../components/maze/MazeContainer';

export const drawMaze = (maze: Array<Array<string>>, props: MazeProps) => {
  const tileWidth = 16;
  const tileHeight = 16;
  const { wallColour, floorColour } = props;
  const mazeImgWidth = maze[0].length * tileWidth;
  const mazeImgHeight = maze.length * tileHeight;
  const mazeCanvas = createCanvas(mazeImgWidth, mazeImgHeight);
  const mazeCtx = mazeCanvas.getContext('2d');
  const gridCanvas = createCanvas(mazeImgWidth, mazeImgHeight);
  const gridCtx = gridCanvas.getContext('2d');

  gridCtx.strokeStyle = '#888';
  gridCtx.lineWidth = 1;
  maze.forEach((row, i) => {
    row.forEach((tile, j) => {
      const posX = j * tileWidth;
      const posY = i * tileHeight;
      if (tile === '#') {
        mazeCtx.fillStyle = wallColour;
        mazeCtx.fillRect(posX, posY, tileWidth, tileHeight);
      } else {
        mazeCtx.fillStyle = floorColour;
        mazeCtx.fillRect(posX, posY, tileWidth, tileHeight);
      }
      gridCtx.strokeRect(posX, posY, tileWidth, tileHeight);
    });
  });

  return {
    maze: mazeCanvas.toDataURL(),
    grid: gridCanvas.toDataURL(),
  };
};
