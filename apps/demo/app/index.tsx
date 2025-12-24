import { useTheme } from '@bleach/ui'
import { BackgroundView } from '@bleach/ui/components/background-view'
import { Box } from '@bleach/ui/components/box'
import {
  IconCalendar,
  IconChevronRight,
  IconColumns,
  IconDeviceMobile,
  IconInputCheck,
  IconNumber,
} from '@bleach/ui/components/icons'
import { ListItemButton } from '@bleach/ui/components/list-item-button'
import { Text } from '@bleach/ui/components/text'
import { type Href, Link } from 'expo-router'
import type { ReactElement } from 'react'
import { ScrollView } from 'react-native'

const COMPONENTS: Array<{
  icon: ReactElement
  title: string
  description: string
  items: Array<{ label: string; link: Href }>
}> = [
  {
    icon: <IconColumns />,
    title: 'Layout',
    description: 'Used for screen layouts',
    items: [{ label: 'Box', link: '/screens/box' }],
  },
  {
    icon: <IconDeviceMobile />,
    title: 'Display',
    description: 'Used for displaying data',
    items: [
      { label: 'Avatar', link: '/screens/avatar' },
      { label: 'Badge', link: '/screens/badge' },
      { label: 'Chips', link: '/screens/chip' },
      { label: 'Popups', link: '/screens/popup' },
      { label: 'Progress Bars', link: '/screens/progress' },
      { label: 'Text', link: '/screens/text' },
    ],
  },
  {
    icon: <IconInputCheck />,
    title: 'Inputs',
    description: 'Used for getting user input',
    items: [
      { label: 'Buttons', link: '/screens/button' },
      { label: 'Tabs', link: '/screens/tab' },
      { label: 'Inputs', link: '/screens/input' },
      { label: 'Sliders', link: '/screens/slider' },
      { label: 'Dropdowns', link: '/screens/dropdown' },
      { label: 'Checkboxes', link: '/screens/checkbox' },
      { label: 'Switch', link: '/screens/switch' },
    ],
  },
  {
    icon: <IconCalendar />,
    description: 'Used for getting complex user input',
    title: 'Pickers',
    items: [{ label: 'Date & Time Pickers', link: '/screens/date-time-picker' }],
  },
]

const EXAMPLES: Array<{
  icon: ReactElement
  label: string
  description: string
  link: Href
}> = [
  {
    icon: <IconNumber />,
    label: 'Forms',
    description: 'See a variety of form examples',
    link: '/examples/forms',
  },
]

export default function HomeScreen() {
  const theme = useTheme()

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <BackgroundView
        style={{
          paddingHorizontal: theme.spacing(2),
          paddingVertical: theme.spacing(4),
          gap: theme.spacing(5),
        }}
      >
        <Box>
          <Text variant="5xl" fontWeight="medium" gutterBottom>
            Welcome 👋
          </Text>
          <Text variant="md" color="text.secondary">
            Bleach UI is the stylish React Native UI library
          </Text>
        </Box>
        <Box gap={3}>
          <Text variant="lg" style={{ marginBottom: theme.spacing(2) }}>
            Need some examples?
          </Text>
          <Box gap={1}>
            {EXAMPLES.map(({ icon, description, label, link }) => (
              <Link key={label} href={link} asChild>
                <ListItemButton style={{ borderWidth: 1, borderColor: theme.palette.border }}>
                  {icon}
                  <Box flex={1}>
                    <Text color="text.secondary" fontWeight="medium">
                      {label}
                    </Text>
                    <Text color="text.secondary" variant="sm">
                      {description}
                    </Text>
                  </Box>
                  <IconChevronRight />
                </ListItemButton>
              </Link>
            ))}
          </Box>
        </Box>
        <Box gap={3}>
          <Text variant="lg" style={{ marginBottom: theme.spacing(2) }}>
            How about some screens?
          </Text>
          <Box gap={5}>
            {COMPONENTS.map(({ icon, title, description, items }) => (
              <Box key={title} gap={1}>
                <Box direction="row" alignItems="center" marginBottom={2} gap={2}>
                  {icon}
                  <Box>
                    <Text color="text.secondary" fontWeight="medium" gutterBottom>
                      {title}
                    </Text>
                    <Text color="text.secondary" variant="sm">
                      {description}
                    </Text>
                  </Box>
                </Box>
                {items.map(({ label, link }) => (
                  <Link key={label} href={link} asChild>
                    <ListItemButton style={{ borderWidth: 1, borderColor: theme.palette.border }}>
                      <Text style={{ flex: 1 }}>{label}</Text>
                      <IconChevronRight />
                    </ListItemButton>
                  </Link>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </BackgroundView>
    </ScrollView>
  )
}
