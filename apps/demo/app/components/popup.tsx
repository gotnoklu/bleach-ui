import BackgroundView from '@bleach/ui/dist/components/BackgroundView'
import { ScrollView } from 'react-native'
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
          paddingHorizontal: theme.spacing(2),
          paddingVertical: theme.spacing(4),
          gap: theme.spacing(5),
        })}
      >
        <PopupShowcase />
      </BackgroundView>
    </ScrollView>
  )
}
