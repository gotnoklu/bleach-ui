import { Checkbox } from '@bleach/ui/components/checkbox'
import { ListItem } from '@bleach/ui/components/list-item'
import { Text } from '@bleach/ui/components/text'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

export const CheckboxShowcase = () => {
  const [isChecked1, setIsChecked1] = useState(false)

  return (
    <Section>
      <Text variant="xl">Checkboxes</Text>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Checkbox variant="filled" />
          <Text>Filled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox variant="outlined" />
          <Text>Outlined</Text>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Sizes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked size="sm" />
          <Checkbox variant="filled" checked size="sm" />
          <Text>Small</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked size="md" />
          <Checkbox variant="filled" checked size="md" />
          <Text>Medium</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked size="lg" />
          <Checkbox variant="filled" checked size="lg" />
          <Text>Large</Text>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Shapes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Checkbox shape="rounded" checked />
          <Checkbox variant="filled" shape="rounded" checked />
          <Text>Rounded</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked />
          <Checkbox variant="filled" checked />
          <Text>Default</Text>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          States
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked={isChecked1} onChecked={setIsChecked1} />
          <Text>Controlled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox defaultChecked />
          <Text>Uncontrolled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox checked disabled />
          <Text style={{ flex: 1 }}>Disabled checked</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Checkbox disabled />
          <Text style={{ flex: 1 }}>Disabled unchecked</Text>
        </ListItem>
      </SubSection>
    </Section>
  )
}
