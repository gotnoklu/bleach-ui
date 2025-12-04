import { ThemeProvider as NativeThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider, useThemeMode } from '@bleach/ui'
import { getNativeTheme } from '../../utilities'
import { Themes } from '../../theme'
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
