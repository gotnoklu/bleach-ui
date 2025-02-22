import { ScrollView } from 'react-native'
import Typography from 'bleach/dist/components/Typography'
import Box from 'bleach/dist/components/Box'
import BackgroundView from 'bleach/dist/components/BackgroundView'
import Divider from 'bleach/dist/components/Divider'
import { BadgeShowcase } from '@/components/showcase/badge'
import { ChipShowcase } from '@/components/showcase/chip'
import { SliderShowcase } from '@/components/showcase/slider'
import { CheckboxShowcase } from '@/components/showcase/checkbox'
import { SwitchShowcase } from '@/components/showcase/switch'
import { TabsShowcase } from '@/components/showcase/tabs'
import { AvatarShowcase } from '@/components/showcase/avatar'
import { Fragment } from 'react'
import { IconButtonShowcase } from '../components/showcase/icon-button'
import ListItemButton from 'bleach/dist/components/ListItemButton'
import { Link } from 'expo-router'
import Icon from 'bleach/dist/components/Icon'
import Button from 'bleach/dist/components/Button'

const SHOWCASE_COMPONENTS = [
  IconButtonShowcase,
  ChipShowcase,
  SliderShowcase,
  CheckboxShowcase,
  SwitchShowcase,
  TabsShowcase,
  AvatarShowcase,
  BadgeShowcase,
] as const

const ShowcaseSection = ({ Component }: { Component: React.ComponentType }) => (
  <Fragment>
    <Component />
    <Divider />
  </Fragment>
)

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
        <Box gap={2}>
          <Typography variant="h6">Components</Typography>
          <Button>Bleh</Button>
          <Link href="/showcases/button" asChild>
            <ListItemButton style={{ backgroundColor: 'red' }}>
              <Typography color="primary" style={{ flex: 1 }}>
                Buttons
              </Typography>
              <Icon name="chevron-right" color="primary" />
            </ListItemButton>
          </Link>
          <Link href="/showcases/popup" asChild>
            <ListItemButton>
              <Typography color="primary" style={{ flex: 1 }}>
                Popups
              </Typography>
              <Icon name="chevron-right" color="primary" />
            </ListItemButton>
          </Link>
          <Link href="/showcases/date-time-picker" asChild>
            <ListItemButton>
              <Typography color="primary" style={{ flex: 1 }}>
                Date & Time Pickers
              </Typography>
              <Icon name="chevron-right" color="primary" />
            </ListItemButton>
          </Link>
        </Box>
        {SHOWCASE_COMPONENTS.map((Component) => (
          <ShowcaseSection key={Component.name} Component={Component} />
        ))}
      </BackgroundView>
    </ScrollView>
  )
}
