import { styled } from '@bleach/ui/dist/theme/utilities'
import Box, { type BoxProps } from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import ListItem from '@bleach/ui/dist/components/ListItem'
import Checkbox from '@bleach/ui/dist/components/Checkbox'
import { useState } from 'react'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const CheckboxShowcase = () => {
  const [isChecked1, setIsChecked1] = useState(false)

  return (
    <Section>
      <Typography variant="h5">Checkboxes</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Sizes
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked size="small" />
          <Typography>Small</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked />
          <Typography>Medium</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked size="large" />
          <Typography>Large</Typography>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Variants
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked rounded />
          <Typography>Rounded</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked />
          <Typography>Default</Typography>
        </ListItem>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked={isChecked1} onChange={setIsChecked1} />
          <Typography>Controlled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox defaultChecked />
          <Typography>Uncontrolled</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked disabled />
          <Typography fullFlex>Disabled checked</Typography>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox disabled />
          <Typography fullFlex>Disabled unchecked</Typography>
        </ListItem>
      </SubSection>
    </Section>
  )
}
