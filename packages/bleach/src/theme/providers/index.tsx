import type { ReactNode } from 'react'
import { BaseThemeContext } from '../context'
import type { Theme, ThemeMode } from '../types'
import { useThemeMode } from '../hooks'
import { DefaultThemes } from '../themes'

export type BaseThemeProviderProps = {
  theme: Theme
  children: ReactNode
}

export function BaseThemeProvider({ theme, children }: BaseThemeProviderProps) {
  return <BaseThemeContext.Provider value={theme}>{children}</BaseThemeContext.Provider>
}

export type ThemeProviderProps = {
  themes: { [_ in ThemeMode]: Theme }
  children: ReactNode
}

export function ThemeProvider({ themes = DefaultThemes, children }: ThemeProviderProps) {
  const { mode } = useThemeMode()
  const theme = themes[mode]
  return <BaseThemeProvider theme={theme}>{children}</BaseThemeProvider>
}
