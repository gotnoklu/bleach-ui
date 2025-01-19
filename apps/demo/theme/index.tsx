import { createTheme, type Theme, type ThemeMode } from 'bleach'

const LightTheme = createTheme({
  typography: {
    types: {
      bold: { fontFamily: 'PlusJakartaSans-Bold' },
      regular: { fontFamily: 'PlusJakartaSans' },
    },
    variants: {
      h1: {
        fontSize: 28,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      h2: {
        fontSize: 25,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      h3: {
        fontSize: 22,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      h4: {
        fontSize: 20,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      h5: {
        fontSize: 18,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      h6: {
        fontSize: 16,
        fontFamily: 'PlusJakartaSans-Bold',
      },
      body1: {
        fontSize: 14,
        fontFamily: 'PlusJakartaSans',
      },
      body2: {
        fontSize: 12,
        fontFamily: 'PlusJakartaSans',
      },
      caption: {
        fontSize: 10.5,
        fontFamily: 'PlusJakartaSans',
      },
    },
  },
})

const DarkTheme = createTheme({ mode: 'dark' })

export const Themes: { [_ in ThemeMode]: Theme } = { light: LightTheme, dark: DarkTheme }
