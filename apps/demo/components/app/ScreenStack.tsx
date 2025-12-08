import { useTheme } from '@bleach/ui'
import { Stack } from 'expo-router'

export default function ScreenStack() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="screens/button"
        options={{
          title: 'Buttons',
          headerTitle: 'Buttons',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.weights.medium as { fontFamily: string }),
          },
        }}
      />
      <Stack.Screen
        name="screens/date-time-picker"
        options={{
          title: 'Date & Time Pickers',
          headerTitle: 'Date & Time Pickers',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.weights.medium as { fontFamily: string }),
          },
        }}
      />
      <Stack.Screen
        name="screens/popup"
        options={{
          title: 'Popups',
          headerTitle: 'Popups',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.weights.medium as { fontFamily: string }),
          },
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
