import { Container, Title } from '@mantine/core';
import './App.css';
import { MazeDisplay } from './components/MazeDisplay';

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Title order={1}>Maze Generator</Title>
        <MazeDisplay />
      </Container>
    </div>
  );
}

export default App;
