import { createContext, type ReactNode } from 'react'
import { useThemeMode } from './hooks'
import { DefaultThemes } from './palettes'
import type { Theme, ThemeMode } from './types'

export type ThemeProviderProps = {
  themes?: { [_ in ThemeMode]: Theme }
  children: ReactNode
}

export const ThemeContext = createContext<Theme>({} as Theme)

export function ThemeProvider({ themes = DefaultThemes, children }: ThemeProviderProps) {
  const { mode } = useThemeMode()
  const theme = themes[mode]
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
