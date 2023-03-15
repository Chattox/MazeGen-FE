import { Container, MantineProvider, Title } from '@mantine/core';
import './App.css';
import { MazeContainer } from './components/maze/MazeContainer';

function App() {
  return (
    <div className="App">
      <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
        <Container fluid>
          <Title order={1}>Maze Generator</Title>
          <MazeContainer />
        </Container>
      </MantineProvider>
    </div>
  );
}

export default App;
