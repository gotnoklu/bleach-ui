import type { ReactNode } from 'react'
import { BaseThemeContext } from '../context'
import type { LoadedFonts, Theme, ThemeMode } from '../types'
import { useThemeMode } from '../hooks'
import { DefaultThemes } from '../themes'
import { applyLoadedFonts } from '../utilities'

export type BaseThemeProviderProps = {
  theme: Theme
  fonts?: LoadedFonts
  children: ReactNode
}

export function BaseThemeProvider({ theme, fonts, children }: BaseThemeProviderProps) {
  return (
    <BaseThemeContext.Provider value={fonts ? applyLoadedFonts(theme, fonts) : theme}>
      {children}
    </BaseThemeContext.Provider>
  )
}

export type ThemeProviderProps = {
  themes?: { [_ in ThemeMode]: Theme }
  fonts?: LoadedFonts
  children: ReactNode
}

export function ThemeProvider({ themes = DefaultThemes, fonts, children }: ThemeProviderProps) {
  const { mode } = useThemeMode()
  const theme = themes[mode]
  return (
    <BaseThemeProvider theme={theme} fonts={fonts}>
      {children}
    </BaseThemeProvider>
  )
}
