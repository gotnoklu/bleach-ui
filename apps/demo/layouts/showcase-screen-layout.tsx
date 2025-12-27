import { BackgroundView } from '@bleeech/ui/components/background-view'
import { createStylesheet } from '@bleeech/ui/theme/styles'
import type { ReactNode } from 'react'
import { ScrollView } from 'react-native'

const useStyles = createStylesheet(({ spacing }) => ({
  background: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(4),
    gap: spacing(5),
  },
}))

export function ShowcaseScreenLayout({ children }: { children: ReactNode }) {
  const styles = useStyles()

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
      <BackgroundView style={styles.background}>{children}</BackgroundView>
    </ScrollView>
  )
}
