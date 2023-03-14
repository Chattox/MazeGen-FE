import { Button, Container, createStyles, Group, Text, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MazeProps } from './MazeContainer';

const useStyles = createStyles((theme) => ({
  'num-picker': {
    maxWidth: '80px',
  },
  description: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
}));

export const MazeControls = (props: {
  setMazeGenProps: React.Dispatch<React.SetStateAction<MazeProps>>;
}) => {
  const { classes } = useStyles();
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
        <Group position="center">
          <NumberInput
            defaultValue={15}
            placeholder="Height"
            label="Height"
            min={3}
            max={89}
            step={2}
            className={classes['num-picker']}
            {...mazeForm.getInputProps('height')}
          />

          <NumberInput
            defaultValue={15}
            placeholder="Width"
            label="Width"
            min={3}
            max={89}
            step={2}
            className={classes['num-picker']}
            {...mazeForm.getInputProps('width')}
          />
        </Group>
        <Text c="dimmed" fz="sm" className={classes.description}>
          Min: 3, Max: 89. Values must be odd
        </Text>
        <Button type="submit">Generate</Button>
      </form>
    </Container>
  );
};
