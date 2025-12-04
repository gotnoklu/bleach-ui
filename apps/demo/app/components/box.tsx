import BackgroundView from '@bleach/ui/dist/components/BackgroundView'
import { ScrollView } from 'react-native'
import { BoxShowcase } from '@/components/showcase/box'

export default function BoxScreen() {
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
        <BoxShowcase />
      </BackgroundView>
    </ScrollView>
  )
}
