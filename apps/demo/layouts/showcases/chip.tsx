import { Chip } from '@bleach/ui/components/chip'
import { IconUser } from '@bleach/ui/components/icon'
import { ListItem } from '@bleach/ui/components/list-item'
import { Text } from '@bleach/ui/components/text'
import { Section, SubSection } from '../../components/section'

export const ChipShowcase = () => {
  return (
    <Section>
      <Text variant="h5">Chips</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Variants
        </Text>
        <ListItem style={{ flexWrap: 'wrap' }} disableMinHeight disablePadding>
          <Chip.Base>Filled</Chip.Base>
          <Chip.Base variant="outlined">Outlined</Chip.Base>
          <Chip.Base>
            <IconUser size={16} /> With Icon
          </Chip.Base>
          <Chip.Base variant="outlined">
            <IconUser size={16} /> With Icon
          </Chip.Base>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Sizes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Chip.Base variant="outlined" size="sm">
            Small
          </Chip.Base>
          <Chip.Base variant="outlined" size="md">
            Medium
          </Chip.Base>
          <Chip.Base variant="outlined" size="lg">
            Large
          </Chip.Base>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Shapes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Chip.Base variant="outlined">Default</Chip.Base>
          <Chip.Base variant="outlined" shape="rounded">
            Rounded
          </Chip.Base>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          States
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Chip variant="outlined" defaultChecked>
            Checked
          </Chip>
          <Chip defaultChecked>Checked</Chip>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Chip variant="outlined" disabled>
            Disabled
          </Chip>
        </ListItem>
      </SubSection>
    </Section>
  )
}
