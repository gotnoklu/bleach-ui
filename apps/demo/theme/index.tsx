import { createTheme, type Theme, type ThemeMode } from 'bleach'

const LightTheme = createTheme({})

const DarkTheme = createTheme({ mode: 'dark' })

export const Themes: { [_ in ThemeMode]: Theme } = { light: LightTheme, dark: DarkTheme }
