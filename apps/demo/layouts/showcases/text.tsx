import { Box, type BoxProps } from '@bleach/ui/components/box'
import { Text } from '@bleach/ui/components/text'
import { styled } from '@bleach/ui/theme/styles'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))

export const TextShowcase = () => {
  return (
    <Section>
      <Text variant="h5">Text</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Variants
        </Text>
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="h3">Heading 3</Text>
        <Text variant="h4">Heading 4</Text>
        <Text variant="h5">Heading 5</Text>
        <Text variant="h6">Heading 6</Text>
        <Text variant="body1">Body 1</Text>
        <Text variant="body2">Body 2</Text>
        <Text variant="caption">Caption</Text>
      </SubSection>
    </Section>
  )
}
