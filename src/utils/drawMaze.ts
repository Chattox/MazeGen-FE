import { createCanvas } from 'canvas';
import { MazeProps } from '../components/maze/MazeContainer';

export const drawMaze = (maze: Array<Array<string>>, props: MazeProps) => {
  const tileWidth = 16;
  const tileHeight = 16;
  const { wallColour, floorColour, hasGrid } = props;
  const mazeImgWidth = maze[0].length * tileWidth;
  const mazeImgHeight = maze.length * tileHeight;
  const canvas = createCanvas(mazeImgWidth, mazeImgHeight);
  const ctx = canvas.getContext('2d');

  maze.forEach((row, i) => {
    row.forEach((tile, j) => {
      const posX = j * tileWidth;
      const posY = i * tileHeight;
      if (tile === '#') {
        ctx.fillStyle = wallColour;
        ctx.fillRect(posX, posY, tileWidth, tileHeight);
      } else {
        ctx.fillStyle = floorColour;
        ctx.fillRect(posX, posY, tileWidth, tileHeight);
      }
    });
  });

  if (hasGrid) {
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    maze.forEach((row, i) => {
      row.forEach((tile, j) => {
        const posX = j * tileWidth;
        const posY = i * tileHeight;
        ctx.strokeRect(posX, posY, tileWidth, tileHeight);
      });
    });
  }

  return canvas.toDataURL();
};
