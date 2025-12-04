import { createTheme } from '../utilities'

export const DefaultDarkTheme = createTheme({
  mode: 'dark',
  palette: {
    primary: {
      light: '#7B97FF',
      main: '#5579FF',
      dark: '#0D42FF',
    },
    text: {
      primary: '#FFFFFF',
    },
    backgrounds: {
      default: '#0A0A0A',
      paper: '#1E1E1E',
    },
    action: 'rgba(150, 150, 150, 0.6)',
  },
})
