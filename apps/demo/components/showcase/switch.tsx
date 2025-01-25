import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import ListItem from 'bleach/dist/components/ListItem'
import Switch from 'bleach/dist/components/Switch'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const SwitchShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">Switches</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Switch rounded />
          <Typography>Rounded</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch />
          <Typography>Default</Typography>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Switch defaultChecked />
          <Typography>Uncontrolled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch />
          <Typography>Controlled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch checked disabled />
          <Typography>Disabled Checked</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch disabled />
          <Typography>Disabled Unchecked</Typography>
        </ListItem>
      </SubSection>
    </Section>
  )
}
