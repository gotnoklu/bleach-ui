import { ThemeProvider, useThemeMode } from '@bleeech/ui'
import { ThemeProvider as NativeThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Themes } from '../../theme'
import { getNativeTheme } from '../../utilities'
import ScreenStack from './ScreenStack'

export default function MainLayout() {
  const { mode } = useThemeMode()

  return (
    <ThemeProvider themes={Themes}>
      <NativeThemeProvider value={getNativeTheme(mode === 'dark' ? Themes.dark : Themes.light)}>
        <ScreenStack />
        <StatusBar style="auto" />
      </NativeThemeProvider>
    </ThemeProvider>
  )
}
