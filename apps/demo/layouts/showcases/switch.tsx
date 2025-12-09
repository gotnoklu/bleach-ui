import { ListItem } from '@bleach/ui/components/list-item'
import { Switch } from '@bleach/ui/components/switch'
import { Text } from '@bleach/ui/components/text'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

export const SwitchShowcase = () => {
  const [checked, setChecked] = useState(false)

  return (
    <Section>
      <Text variant="h5">Switches</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Variants
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Switch variant="filled" />
          <Text>Filled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch variant="outlined" />
          <Text>Outlined</Text>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Shapes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Switch shape="rounded" />
          <Text>Rounded</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch />
          <Text>Default</Text>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          States
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Switch defaultChecked />
          <Text>Uncontrolled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch checked={checked} onChecked={setChecked} />
          <Text>Controlled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch checked disabled />
          <Text>Disabled Checked</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Switch disabled />
          <Text>Disabled Unchecked</Text>
        </ListItem>
      </SubSection>
    </Section>
  )
}
