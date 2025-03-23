import { ScrollView } from 'react-native'
import BackgroundView from 'bleach/dist/components/BackgroundView'
import { PopupShowcase } from '@/components/showcase/popup'

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
        <PopupShowcase />
      </BackgroundView>
    </ScrollView>
  )
}
