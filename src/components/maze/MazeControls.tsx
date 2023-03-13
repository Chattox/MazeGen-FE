import { Button, Container, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export const MazeControls = () => {
  const mazeForm = useForm({
    initialValues: {
      mazeHeight: 15,
      mazeWidth: 15,
    },
  });
  return (
    <Container>
      <form onSubmit={mazeForm.onSubmit((values) => console.log(values))}>
        <NumberInput
          defaultValue={15}
          placeholder="Height"
          label="Height"
          {...mazeForm.getInputProps('mazeHeight')}
        />
        <NumberInput
          defaultValue={15}
          placeholder="Width"
          label="Width"
          {...mazeForm.getInputProps('mazeWidth')}
        />
        <Button type="submit">Generate</Button>
      </form>
    </Container>
  );
};
