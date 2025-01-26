import { useMemo } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
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
import type { Theme } from 'bleach/dist/theme/types'
import DateTimePickerShowcase from '@/components/showcase/datetime-picker'

const SHOWCASE_COMPONENTS = [
  ButtonShowcase,
  ChipShowcase,
  SliderShowcase,
  CheckboxShowcase,
  SwitchShowcase,
  TabsShowcase,
  AvatarShowcase,
  BadgeShowcase,
  DateTimePickerShowcase,
] as const

const ShowcaseSection = ({ Component }: { Component: React.ComponentType }) => (
  <>
    <Component />
    <Divider />
  </>
)

export default function HomeScreen() {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        scrollView: {
          flex: 1,
        },
        contentContainer: {
          paddingBottom: 40,
        },
      }),
    []
  )

  const backgroundViewStyle = useMemo(
    () => (theme: Theme) => ({
      paddingHorizontal: theme.spacing.create(2),
      paddingVertical: theme.spacing.create(4),
      gap: theme.spacing.create(5),
    }),
    []
  )

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <BackgroundView sx={backgroundViewStyle}>
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
