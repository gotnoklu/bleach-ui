import { ThemeProvider, useThemeMode } from '@bleeech/ui/theme/context'
import { ThemeProvider as NativeThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { AppThemes, NativeThemes } from '../../theme'
import ScreenStack from './ScreenStack'

export default function MainLayout() {
  const { mode } = useThemeMode()

  return (
    <ThemeProvider themes={AppThemes}>
      <NativeThemeProvider value={NativeThemes[mode]}>
        <ScreenStack />
        <StatusBar style="auto" />
      </NativeThemeProvider>
    </ThemeProvider>
  )
}
