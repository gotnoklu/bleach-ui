import { useTheme } from 'bleach'
import { Stack } from 'expo-router'

export default function ScreenStack() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Welcome',
          headerTitle: 'Welcome',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.types.medium as { fontFamily: string }),
          },
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
