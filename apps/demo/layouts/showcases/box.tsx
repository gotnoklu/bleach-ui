import { Box } from '@bleach/ui/components/box'
import { Text } from '@bleach/ui/components/text'
import { Section, SubSection } from '../../components/section'

export const BoxShowcase = () => {
  return (
    <Section>
      <Text variant="h5">Boxes</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Row
        </Text>
        <Box direction="row" gap={2}>
          <Box backgroundColor="primary" width={50} height={50} />
          <Box backgroundColor="primary" width={50} height={50} />
          <Box backgroundColor="primary" width={50} height={50} />
        </Box>
      </SubSection>
    </Section>
  )
}
