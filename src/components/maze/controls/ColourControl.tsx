import { Group, ColorInput } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';

import { useStyles } from './common.styles';

export const ColourControl = (props: {
  getInputProps: GetInputProps<{ wallColour: string; floorColour: string }>;
}) => {
  const { classes } = useStyles();
  return (
    <Group position="center" className={classes.control}>
      <ColorInput
        label="Wall Colour"
        placeholder="#000"
        format="hex"
        {...props.getInputProps('wallColour')}
      />
      <ColorInput
        label="Floor Colour"
        placeholder="#FFF"
        format="hex"
        {...props.getInputProps('floorColour')}
      />
    </Group>
  );
};
