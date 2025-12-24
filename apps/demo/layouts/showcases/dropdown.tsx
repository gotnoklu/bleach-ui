import { Dropdown } from '@bleeech/ui/components/dropdown'
import { ListItem } from '@bleeech/ui/components/list-item'
import { Text } from '@bleeech/ui/components/text'
import { Section, SubSection } from '../../components/section'

export const DropdownShowcase = () => {
  return (
    <Section>
      <Text variant="xl">Dropdowns</Text>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Dropdown variant="outlined" label="Outlined" options={[{ label: '1', value: 1 }]} />
          <Dropdown variant="base" label="Base" options={[]} />
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          States
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} />
          <Text>Uncontrolled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} />
          <Text>Controlled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} disabled />
          <Text>Disabled Checked</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Dropdown options={[]} disabled />
          <Text>Disabled Unchecked</Text>
        </ListItem>
      </SubSection>
    </Section>
  )
}
