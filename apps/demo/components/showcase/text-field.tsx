import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import ListItem from '@bleach/ui/dist/components/ListItem'
import TextField from '@bleach/ui/dist/components/TextField'
import Typography from '@bleach/ui/dist/components/Typography'
import { styled } from '@bleach/ui/dist/theme/utilities'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))

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
