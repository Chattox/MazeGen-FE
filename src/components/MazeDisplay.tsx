import { getAPI } from '../utils/api';
import { useEffect, useState } from 'react';

export const MazeDisplay = () => {
  const [maze, setMaze] = useState([]);

  const getMaze = () =>
    getAPI('get-maze?height=15&width=15').then((res) => {
      if (res.status === 200) {
        setMaze(res.data);
      } else {
        console.log(res);
      }
    });

  useEffect(() => {
    getMaze();
    //eslint-disable-next-line
  }, []);

  return (
    <p>
      {maze.map((row: Array<number>) => (
        <p>{row}</p>
      ))}
    </p>
  );
};
