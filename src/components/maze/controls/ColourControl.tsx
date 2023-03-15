import { Group, ColorInput, useMantineTheme } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';

import { useStyles } from './common.styles';

export const ColourControl = (props: {
  getInputProps: GetInputProps<{ wallColour: string; floorColour: string }>;
}) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const swatches = Object.values(theme.colors).map((colour) => colour[7]);

  return (
    <Group position="center" className={classes.control}>
      <ColorInput
        label="Wall Colour"
        placeholder="#000"
        swatches={swatches}
        swatchesPerRow={7}
        format="hex"
        className={classes['colour-picker']}
        {...props.getInputProps('wallColour')}
      />
      <ColorInput
        label="Floor Colour"
        placeholder="#FFF"
        swatches={swatches}
        swatchesPerRow={7}
        format="hex"
        className={classes['colour-picker']}
        {...props.getInputProps('floorColour')}
      />
    </Group>
  );
};
