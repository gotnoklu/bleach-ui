import type { Theme, ThemeMode } from '../types'
import { DarkTheme } from './dark'
import { LightTheme } from './light'

export const Themes: { [_ in ThemeMode]: Theme } = {
  light: LightTheme,
  dark: DarkTheme,
}

export { LightTheme, DarkTheme }
