import { AvatarShowcase } from '@/components/showcase/avatar'
import BackgroundView from '@bleach/ui/dist/components/BackgroundView'
import { ScrollView } from 'react-native'

export default function AvatarScreen() {
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
        <AvatarShowcase />
      </BackgroundView>
    </ScrollView>
  )
}
