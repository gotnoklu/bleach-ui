import { ThemeProvider as NativeThemeProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { type LoadedFonts, ThemeProvider, useThemeMode } from 'bleach'
import { getNativeTheme } from '../../utilities'
import { Themes } from '../../theme'
import ScreenStack from './ScreenStack'

export default function MainLayout({ fonts }: { fonts?: LoadedFonts }) {
  const { mode } = useThemeMode()

  return (
    <ThemeProvider themes={Themes} fonts={fonts}>
      <NativeThemeProvider value={getNativeTheme(mode === 'dark' ? Themes.dark : Themes.light)}>
        <ScreenStack />
        <StatusBar style="auto" />
      </NativeThemeProvider>
    </ThemeProvider>
  )
}
