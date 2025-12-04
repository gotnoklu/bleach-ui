import { styled } from '@bleach/ui/dist/theme/utilities'
import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import ListItem from '@bleach/ui/dist/components/ListItem'
import Dropdown from '@bleach/ui/dist/components/Dropdown'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const DropdownShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">Dropdowns</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Dropdown variant="outlined" label="Outlined" options={[]} />
          <Dropdown variant="base" label="Base" options={[]} />
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} />
          <Typography>Uncontrolled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} />
          <Typography>Controlled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} disabled />
          <Typography>Disabled Checked</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} disabled />
          <Typography>Disabled Unchecked</Typography>
        </ListItem>
      </SubSection>
    </Section>
  )
}
