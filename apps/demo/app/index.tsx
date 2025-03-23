import BackgroundView from 'bleach/dist/components/BackgroundView'
import Box from 'bleach/dist/components/Box'
import Icon from 'bleach/dist/components/Icon'
import ListItemButton from 'bleach/dist/components/ListItemButton'
import Typography from 'bleach/dist/components/Typography'
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
    icon: <Icon name="columns" />,
    title: 'Layout',
    description: 'Used for screen layouts',
    items: [{ label: 'Box', link: '/components/box' }],
  },
  {
    icon: <Icon name="device-mobile" />,
    title: 'Display',
    description: 'Used for displaying data',
    items: [
      { label: 'Avatar', link: '/components/avatar' },
      { label: 'Badge', link: '/components/badge' },
      { label: 'Chips', link: '/components/chip' },
      { label: 'Popups', link: '/components/popup' },
      { label: 'Progress Bars', link: '/components/progress-bar' },
      { label: 'Typography', link: '/components/typography' },
    ],
  },
  {
    icon: <Icon name="number" />,
    title: 'Inputs',
    description: 'Used for getting user input',
    items: [
      { label: 'Buttons', link: '/components/button' },
      { label: 'Icon Buttons', link: '/components/icon-button' },
      { label: 'Tabs', link: '/components/tab' },
      { label: 'TextFields', link: '/components/text-field' },
      { label: 'Sliders', link: '/components/slider' },
      { label: 'Dropdowns', link: '/components/dropdown' },
      { label: 'Checkboxes', link: '/components/checkbox' },
      { label: 'Switch', link: '/components/switch' },
    ],
  },
  {
    icon: <Icon name="calendar" />,
    description: 'Used for getting complex user input',
    title: 'Pickers',
    items: [{ label: 'Date & Time Pickers', link: '/components/date-time-picker' }],
  },
]

const EXAMPLES: Array<{
  icon: ReactElement
  label: string
  description: string
  link: Href
}> = [
  {
    icon: <Icon name="number" />,
    label: 'Forms',
    description: 'See a variety of form examples',
    link: '/examples/forms',
  },
]

export default function HomeScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <BackgroundView
        sx={(theme) => ({
          paddingHorizontal: theme.spacing.create(2),
          paddingVertical: theme.spacing.create(4),
          gap: theme.spacing.create(5),
        })}
      >
        <Box>
          <Typography variant="h1" fontWeight="medium" gutterBottom>
            Bleach UI
          </Typography>
          <Typography variant="h6" color="text.secondary">
            The stylish React Native UI library
          </Typography>
        </Box>
        <Box gap={3}>
          <Typography variant="h6" sx={({ spacing }) => ({ marginBottom: spacing.create(2) })}>
            Need some examples?
          </Typography>
          <Box gap={1}>
            {EXAMPLES.map(({ icon, description, label, link }) => (
              <Link key={label} href={link} asChild>
                <ListItemButton
                  sx={({ palette }) => ({ borderWidth: 1, borderColor: palette.divider })}
                >
                  {icon}
                  <Box flex={1}>
                    <Typography color="text.secondary" fontWeight="medium">
                      {label}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {description}
                    </Typography>
                  </Box>
                  <Icon name="chevron-right" color="primary" />
                </ListItemButton>
              </Link>
            ))}
          </Box>
        </Box>
        <Box gap={3}>
          <Typography variant="h6" sx={({ spacing }) => ({ marginBottom: spacing.create(2) })}>
            How about some components?
          </Typography>
          <Box gap={5}>
            {COMPONENTS.map(({ icon, title, description, items }) => (
              <Box key={title} gap={1}>
                <Box direction="row" alignItems="center" marginBottom={2} gap={2}>
                  {icon}
                  <Box>
                    <Typography color="text.secondary" fontWeight="medium" gutterBottom>
                      {title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {description}
                    </Typography>
                  </Box>
                </Box>
                {items.map(({ label, link }) => (
                  <Link key={label} href={link} asChild>
                    <ListItemButton
                      sx={({ palette }) => ({ borderWidth: 1, borderColor: palette.divider })}
                    >
                      <Typography fullFlex>{label}</Typography>
                      <Icon name="chevron-right" color="primary" />
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
