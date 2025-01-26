import { ScrollView } from 'react-native'
import Typography from 'bleach/dist/components/Typography'
import Box from 'bleach/dist/components/Box'
import BackgroundView from 'bleach/dist/components/BackgroundView'
import Divider from 'bleach/dist/components/Divider'
import { BadgeShowcase } from '@/components/showcase/badge'
import { ButtonShowcase } from '@/components/showcase/button'
import { ChipShowcase } from '@/components/showcase/chip'
import { SliderShowcase } from '@/components/showcase/slider'
import { CheckboxShowcase } from '@/components/showcase/checkbox'
import { SwitchShowcase } from '@/components/showcase/switch'
import { TabsShowcase } from '@/components/showcase/tabs'
import { AvatarShowcase } from '@/components/showcase/avatar'
import DateTimePickerShowcase from '@/components/showcase/datetime-picker'
import { Fragment } from 'react'
import { PopupShowcase } from '../components/showcase/popup'
import { IconButtonShowcase } from '../components/showcase/icon-button'

const SHOWCASE_COMPONENTS = [
  ButtonShowcase,
  IconButtonShowcase,
  ChipShowcase,
  SliderShowcase,
  CheckboxShowcase,
  SwitchShowcase,
  TabsShowcase,
  AvatarShowcase,
  PopupShowcase,
  BadgeShowcase,
  DateTimePickerShowcase,
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

        {SHOWCASE_COMPONENTS.map((Component) => (
          <ShowcaseSection key={Component.name} Component={Component} />
        ))}
      </BackgroundView>
    </ScrollView>
  )
}
