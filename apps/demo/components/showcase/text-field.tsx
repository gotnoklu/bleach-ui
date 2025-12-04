import { styled } from '@bleach/ui/dist/theme/utilities'
import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import ListItem from '@bleach/ui/dist/components/ListItem'
import TextField from '@bleach/ui/dist/components/TextField'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const TextFieldShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">TextFieldes</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <TextField label="Base" variant="base" />
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <TextField label="Outlined" variant="outlined" />
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <TextField label="Filled" variant="filled" />
        </ListItem>
      </SubSection>
    </Section>
  )
}
