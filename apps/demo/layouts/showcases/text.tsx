import { Box, type BoxProps } from '@bleeech/ui/components/box'
import { Text } from '@bleeech/ui/components/text'
import { styled } from '@bleeech/ui/theme/styles'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))

export const TextShowcase = () => {
  return (
    <Section>
      <Text variant="xl">Text</Text>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <Text variant="5xl">Heading 1</Text>
        <Text variant="4xl">Heading 2</Text>
        <Text variant="3xl">Heading 3</Text>
        <Text variant="2xl">Heading 4</Text>
        <Text variant="xl">Heading 5</Text>
        <Text variant="lg">Heading 6</Text>
        <Text variant="md">Body 1</Text>
        <Text variant="sm">Body 2</Text>
        <Text variant="xs">Caption</Text>
      </SubSection>
    </Section>
  )
}
