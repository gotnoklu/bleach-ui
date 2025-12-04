import { useContext, useRef } from 'react'
import { Appearance, useColorScheme } from 'react-native'
import { ThemeContext } from './context'

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
