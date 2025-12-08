import { createContext, type ReactNode, useContext, useRef } from 'react'
import { Appearance, useColorScheme } from 'react-native'
import { Themes } from './palettes'
import type { Theme, ThemeMode } from './types'

export type ThemeProviderProps = {
  themes?: { [_ in ThemeMode]: Theme }
  children: ReactNode
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function useThemeMode() {
  const schemeRef = useRef('system')
  const scheme = useColorScheme()
  const mode = scheme ?? 'light'

  function setThemeMode(mode: 'system' | 'light' | 'dark') {
    schemeRef.current = mode
    Appearance.setColorScheme(mode === 'system' ? null : mode)
  }

  return { scheme: scheme ?? 'system', mode, setThemeMode }
}

export const ThemeContext = createContext<Theme>({} as Theme)

export function ThemeProvider({ themes = Themes, children }: ThemeProviderProps) {
  const { mode } = useThemeMode()
  const theme = themes[mode]
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}
