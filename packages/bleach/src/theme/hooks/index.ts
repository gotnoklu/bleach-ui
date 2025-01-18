import { useContext, useRef } from 'react'
import { BaseThemeContext } from '../context'
import { Appearance, useColorScheme } from 'react-native'

export function useTheme() {
  return useContext(BaseThemeContext)
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
