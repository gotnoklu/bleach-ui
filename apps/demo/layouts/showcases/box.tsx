import { Box } from '@bleach/ui/components/box'
import { Text } from '@bleach/ui/components/text'
import { Section, SubSection } from '../../components/section'

export const BoxShowcase = () => {
  return (
    <Section>
      <Text variant="h5">Boxes</Text>
      <Box direction="row">
        <SubSection style={{ flex: 1 }}>
          <Text variant="h6" color="text.secondary">
            Row
          </Text>
          <Box direction="row" gap={2}>
            <Box backgroundColor="primary" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="error" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="success" width={32} height={32} borderRadius={4} />
          </Box>
        </SubSection>
        <SubSection style={{ flex: 1 }}>
          <Text variant="h6" color="text.secondary" textAlign="right">
            Row Reverse
          </Text>
          <Box direction="row-reverse" gap={2}>
            <Box backgroundColor="primary" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="error" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="success" width={32} height={32} borderRadius={4} />
          </Box>
        </SubSection>
      </Box>
      <Box direction="row">
        <SubSection style={{ flex: 1 }}>
          <Text variant="h6" color="text.secondary">
            Column
          </Text>
          <Box direction="column" gap={2}>
            <Box backgroundColor="primary" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="error" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="success" width={32} height={32} borderRadius={4} />
          </Box>
        </SubSection>
        <SubSection style={{ flex: 1 }}>
          <Text variant="h6" color="text.secondary">
            Column Reverse
          </Text>
          <Box direction="column-reverse" gap={2}>
            <Box backgroundColor="primary" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="error" width={32} height={32} borderRadius={4} />
            <Box backgroundColor="success" width={32} height={32} borderRadius={4} />
          </Box>
        </SubSection>
      </Box>
    </Section>
  )
}
