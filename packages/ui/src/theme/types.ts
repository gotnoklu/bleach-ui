import type { TextStyle } from 'react-native'
import type { DeepPartial } from '../types/global'

export type PaletteColors = { main: string; light: string; dark: string; foreground: string }

export type TextPaletteColors = {
  primary: string
  secondary: string
}

export type ThemeMode = 'light' | 'dark'

export type Palette = {
  primary: PaletteColors
  secondary: PaletteColors
  text: TextPaletteColors
  success: PaletteColors
  error: PaletteColors
  info: PaletteColors
  warning: PaletteColors
  disabled: string
  icon: string
  border: string
  avatar: string
  card: string
  background: string
  notification: string
  inputFilled: string
  checkboxFilled: string
  progressTrack: string
  switchTrackFilled: string
  switchTrackOutlined: string
  sliderTrackFilled: string
  sliderThumbFilled: string
  transparent: string
}

export type Typography = {
  weights: {
    [_ in Exclude<TextStyle['fontWeight'], undefined> | 'italic']: Omit<TextStyle, 'fontWeight' | 'fontFamily'> & {
      fontFamily: string
      fontWeight: Exclude<TextStyle['fontWeight'], undefined>
    }
  }
  variants: {
    '5xl': TextStyle
    '4xl': TextStyle
    '3xl': TextStyle
    '2xl': TextStyle
    xl: TextStyle
    lg: TextStyle
    md: TextStyle
    sm: TextStyle
    xs: TextStyle
  }
}

export type LocaleDirection = 'ltr' | 'rtl'

export type LoadedFonts = { [_ in keyof Typography['weights']]?: string }

export interface Theme {
  mode: ThemeMode
  palette: Palette
  typography: Typography
  spacing(value: number): number
  radius(value: number): number
  shadows: {
    [_ in 1 | 2 | 3 | 4 | 5]: {
      shadowColor: string
      shadowOffset: {
        width: number
        height: number
      }
      shadowOpacity: number
      shadowRadius: number
      elevation: number
    }
  }
}

export type BaseTheme = DeepPartial<Theme>

type PaletteColorTokenMap = {
  [Key in keyof Palette]: Palette[Key] extends Record<string, string>
    ? `${Key}.${Extract<keyof Palette[Key], string>}`
    : Key
}

export type PaletteColorToken = PaletteColorTokenMap[keyof PaletteColorTokenMap]
export type PaletteBaseColorToken = keyof Palette
