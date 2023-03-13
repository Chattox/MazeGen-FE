import { Button, Container, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MazeProps } from './MazeContainer';

export const MazeControls = (props: {
  setMazeGenProps: React.Dispatch<React.SetStateAction<MazeProps>>;
}) => {
  const mazeForm = useForm({
    initialValues: {
      height: 15,
      width: 15,
    },
  });
  return (
    <Container>
      <form
        onSubmit={mazeForm.onSubmit((values) => {
          console.log(values);
          props.setMazeGenProps({ ...values });
        })}
      >
        <NumberInput
          defaultValue={15}
          placeholder="Height"
          label="Height"
          {...mazeForm.getInputProps('height')}
        />
        <NumberInput
          defaultValue={15}
          placeholder="Width"
          label="Width"
          {...mazeForm.getInputProps('width')}
        />
        <Button type="submit">Generate</Button>
      </form>
    </Container>
  );
};
