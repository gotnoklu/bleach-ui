import { Box } from '@bleach/ui/components/box'
import { ListItem } from '@bleach/ui/components/list-item'
import { Progress } from '@bleach/ui/components/progress'
import { Text } from '@bleach/ui/components/text'
import { Section, SubSection } from '../../components/section'

export const ProgressShowcase = () => {
  return (
    <Section>
      <Text variant="xl">Progress</Text>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Box flex={1} gap={1}>
            <Text color="text.secondary">Rounded</Text>
            <Progress progress={20} shape="rounded" />
          </Box>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Box flex={1} gap={1}>
            <Text color="text.secondary">Default</Text>
            <Progress progress={20} />
          </Box>
        </ListItem>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Colors
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Box flex={1} gap={1}>
            <Text color="text.secondary">Warning</Text>
            <Progress progress={20} colors={{ incomplete: 'warning.main' }} shape="rounded" />
          </Box>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Box flex={1} gap={1}>
            <Text color="text.secondary">Error</Text>
            <Progress progress={40} colors={{ incomplete: 'error.main' }} shape="rounded" />
          </Box>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Box flex={1} gap={1}>
            <Text color="text.secondary">Success</Text>
            <Progress progress={60} colors={{ incomplete: 'success.main' }} shape="rounded" />
          </Box>
        </ListItem>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Sizes
        </Text>
        <ListItem disableMinHeight disablePadding>
          <Progress progress={50} size="sm" shape="rounded" />
          <Text>Uncontrolled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Progress progress={50} size="md" shape="rounded" />
          <Text>Controlled</Text>
        </ListItem>
        <ListItem disableMinHeight disablePadding>
          <Progress progress={50} size="lg" shape="rounded" />
          <Text>Disabled Checked</Text>
        </ListItem>
      </SubSection>
    </Section>
  )
}
