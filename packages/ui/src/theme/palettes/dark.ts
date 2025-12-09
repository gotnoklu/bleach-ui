import { createTheme } from '../utilities'

export const DarkTheme = createTheme({
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
    icon: '#AAAAAA',
    card: '#1E1E1E',
    background: '#0A0A0A',
    switchTrackFilled: 'rgba(123, 123, 123, 0.5)',
    switchTrackOutlined: 'rgba(123, 123, 123, 0.5)',
  },
})
