import { Dropdown } from '@bleach/ui/components/dropdown'
import { ListItem } from '@bleach/ui/components/list-item'
import { Text } from '@bleach/ui/components/text'
import { Section, SubSection } from '../../components/section'

export const DropdownShowcase = () => {
  return (
    <Section>
      <Text variant="h5">Dropdowns</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Variants
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Dropdown variant="outlined" label="Outlined" options={[]} />
          <Dropdown variant="base" label="Base" options={[]} />
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
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
