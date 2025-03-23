import { ProgressBarShowcase } from '@/components/showcase/progress-bar'
import BackgroundView from 'bleach/dist/components/BackgroundView'
import { ScrollView } from 'react-native'

export default function ProgressBarScreen() {
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
        <ProgressBarShowcase />
      </BackgroundView>
    </ScrollView>
  )
}
