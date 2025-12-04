import { useTheme } from '@bleach/ui'
import { Stack } from 'expo-router'

export default function ScreenStack() {
  const theme = useTheme()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Home',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.types.medium as { fontFamily: string }),
          },
        }}
      />
      <Stack.Screen
        name="showcases/button"
        options={{
          title: 'Buttons',
          headerTitle: 'Buttons',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.types.medium as { fontFamily: string }),
          },
        }}
      />
      <Stack.Screen
        name="showcases/date-time-picker"
        options={{
          title: 'Date & Time Pickers',
          headerTitle: 'Date & Time Pickers',
          headerTitleStyle: {
            color: theme.palette.text.primary,
            ...(theme.typography.types.medium as { fontFamily: string }),
          },
        }}
      />
      <Stack.Screen
        name="showcases/popup"
        options={{
          title: 'Popups',
          headerTitle: 'Popups',
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
