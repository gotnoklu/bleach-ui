import type { Theme, ThemeMode } from '@bleeech/ui/theme/types'
import { createTheme, getNativeTheme } from '@bleeech/ui/theme/utilities'
import type { Theme as ReactNavigationTheme } from '@react-navigation/native'

const LightTheme = createTheme({
  palette: {
    secondary: {
      main: '#00D0FF',
      foreground: '#000000',
    },
  },
  typography: {
    weights: {
      bold: { fontFamily: 'PlusJakartaSans-Bold' },
      medium: { fontFamily: 'PlusJakartaSans-Medium' },
      regular: { fontFamily: 'PlusJakartaSans' },
    },
    variants: {
      '5xl': {
        fontSize: 28,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      '4xl': {
        fontSize: 25,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      '3xl': {
        fontSize: 22,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      '2xl': {
        fontSize: 20,
        fontFamily: 'PlusJakartaSans-Medium',
      },
      xl: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans-Medium',
      },
      lg: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans-Medium',
      },
      md: {
        fontSize: 14,
        fontFamily: 'PlusJakartaSans',
      },
      sm: {
        fontSize: 12,
        fontFamily: 'PlusJakartaSans',
      },
      xs: {
        fontSize: 10.5,
        fontFamily: 'PlusJakartaSans',
      },
    },
  },
})

const DarkTheme = createTheme({ mode: 'dark' })

export const AppThemes: { [_ in ThemeMode]: Theme } = {
  light: LightTheme,
  dark: DarkTheme,
}

export const NativeThemes: { [_ in ThemeMode]: ReactNavigationTheme } = {
  light: getNativeTheme(LightTheme),
  dark: getNativeTheme(DarkTheme),
}
