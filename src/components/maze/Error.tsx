import { Alert, Text } from '@mantine/core';

export const Error = () => {
  return (
    <Alert title="Whoops!" color="red">
      <Text ta="left">An error has occurred :(</Text>
      <Text ta="left">
        This is usually due to the free backend hosting I use having the CPU of a Lidl middle aisle
        toaster. Try again with a smaller maze.
      </Text>
    </Alert>
  );
};
