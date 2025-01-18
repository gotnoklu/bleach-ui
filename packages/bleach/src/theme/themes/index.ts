import type { ThemeMode, Theme } from '../types'
import { DefaultDarkTheme } from './dark'
import { DefaultLightTheme } from './light'

export const DefaultThemes: { [_ in ThemeMode]: Theme } = {
  light: DefaultLightTheme,
  dark: DefaultDarkTheme,
}
