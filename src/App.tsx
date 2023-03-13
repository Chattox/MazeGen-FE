import { Container, MantineProvider, Title } from '@mantine/core';
import './App.css';
import { MazeDisplay } from './components/MazeDisplay';

function App() {
  return (
    <div className="App">
      <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
        <Container fluid>
          <Title order={1}>Maze Generator</Title>
          <MazeDisplay />
        </Container>
      </MantineProvider>
    </div>
  );
}

export default App;
