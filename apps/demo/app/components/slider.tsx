import BackgroundView from '@bleach/ui/dist/components/BackgroundView'
import { ScrollView } from 'react-native'
import { SliderShowcase } from '@/components/showcase/slider'

export default function SliderScreen() {
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
        <SliderShowcase />
      </BackgroundView>
    </ScrollView>
  )
}
