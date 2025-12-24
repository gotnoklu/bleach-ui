import { BaseChip, Chip } from '@bleach/ui/components/chip'
import { IconUser } from '@bleach/ui/components/icons'
import { ListItem } from '@bleach/ui/components/list-item'
import { Text } from '@bleach/ui/components/text'
import { Section, SubSection } from '../../components/section'

export const ChipShowcase = () => {
  return (
    <Section>
      <Text variant="xl">Chips</Text>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <ListItem style={{ flexWrap: 'wrap' }} disableMinHeight disablePadding>
          <BaseChip>Filled</BaseChip>
          <BaseChip variant="outlined">Outlined</BaseChip>
          <BaseChip>
            <IconUser size={16} /> With Icon
          </BaseChip>
          <BaseChip variant="outlined">
            <IconUser size={16} /> With Icon
          </BaseChip>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Sizes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BaseChip variant="outlined" size="sm">
            Small
          </BaseChip>
          <BaseChip variant="outlined" size="md">
            Medium
          </BaseChip>
          <BaseChip variant="outlined" size="lg">
            Large
          </BaseChip>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Shapes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <BaseChip variant="outlined">Default</BaseChip>
          <BaseChip variant="outlined" shape="rounded">
            Rounded
          </BaseChip>
        </ListItem>
      </SubSection>
      <SubSection>
        <Text variant="lg" color="text.secondary">
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
