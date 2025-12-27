import type { Theme as ReactNavigationTheme } from '@react-navigation/native'
import { merge } from '../utilities'
import { _BaseTheme } from './palettes/_base'
import type { BaseTheme, Palette, PaletteColors, TextPaletteColors, Theme } from './types'

export function createTheme(theme: BaseTheme | ((base: BaseTheme) => BaseTheme)): Theme {
  return merge(_BaseTheme, typeof theme === 'function' ? theme(_BaseTheme) : theme) as Theme
}

export function getNativeTheme(theme: Theme): ReactNavigationTheme {
  return {
    dark: theme.mode === 'dark',
    colors: {
      primary: theme.palette.primary.main,
      background: theme.palette.background,
      card: theme.palette.card,
      text: theme.palette.primary.foreground,
      notification: theme.palette.notification,
      border: theme.palette.border,
    },
    fonts: {
      bold: {
        fontFamily: theme.typography.weights.bold.fontFamily,
        fontWeight: 'bold',
      },
      regular: {
        fontFamily: theme.typography.weights.regular.fontFamily,
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: theme.typography.weights.medium.fontFamily,
        fontWeight: 'normal',
      },
      heavy: {
        fontFamily: theme.typography.weights.bold.fontFamily,
        fontWeight: 'normal',
      },
    },
  }
}

export function getThemeProperty(config: {
  object: Theme | Palette | TextPaletteColors
  key: keyof Palette | keyof TextPaletteColors | (string & {})
  fallback?: string
}): string | undefined {
  const { object, key, fallback } = config
  if (key in object) {
    const color = object[key as keyof typeof object]
    if (typeof color === 'string') return color
    if ('main' in color) return (color as Exclude<PaletteColors, string>).main
    if ('primary' in color) return (color as Exclude<TextPaletteColors, string>).primary
    return fallback
  }

  let result = object
  const splitPaths = key.split('.')
  for (const path of splitPaths) {
    if (typeof result === 'object') {
      result = result[path as keyof typeof object] as any
    } else {
      break
    }
  }

  if (typeof result === 'object' && 'main' in result) {
    return result.main as string
  }

  return (result as unknown as string | undefined) ?? fallback
}

export function alpha(color: string, opacity: number): string {
  if (color.startsWith('rgba')) {
    return color.replace(/[\d.]+\)$/g, `${opacity})`)
  }
  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`)
  }
  if (color.startsWith('#')) {
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
  return color
}
