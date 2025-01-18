import type { Theme } from '../types'

export const _DEFAULT_BASE_THEME: Theme = {
  mode: 'light',
  palette: {
    primary: {
      light: '#5B49FF',
      main: '#1900FF',
      dark: '#1400C8',
      text: '#FFFFFF',
    },
    secondary: {
      light: '',
      main: '',
      dark: '',
      text: '',
    },
    info: {
      light: '',
      main: '',
      dark: '',
      text: '',
    },
    success: {
      light: '',
      main: '',
      dark: '',
      text: '',
    },
    error: {
      light: '#FF8A37',
      main: '#FF6A00',
      dark: '#C85300',
      text: '#444444',
    },
    text: {
      primary: '#444444',
      secondary: '#999999',
    },
    backgrounds: {
      default: '#FCFCFC',
      paper: '#FFFFFF',
      notification: '#FFFFFF',
    },
    divider: 'rgba(100, 100, 100, 0.2)',
    action: 'rgba(75, 75, 75, 0.4)',
    disabled: 'rgba(123, 123, 123, 0.4)',
  },
  typography: {
    weights: {
      bold: {
        fontFamily: 'KumbhSans Bold',
        fontWeight: 'bold',
      },
      regular: {
        fontFamily: 'KumbhSans',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'KumbhSans Medium',
        fontWeight: 'normal',
      },
    },
    variants: {
      h1: {
        fontFamily: 'KumbhSans Bold',
        fontWeight: 'bold',
        fontSize: 28,
      },
      h2: {
        fontFamily: 'KumbhSans Bold',
        fontWeight: 'bold',
        fontSize: 25,
      },
      h3: {
        fontFamily: 'KumbhSans Bold',
        fontWeight: 'bold',
        fontSize: 22,
      },
      h4: {
        fontFamily: 'KumbhSans Bold',
        fontWeight: 'bold',
        fontSize: 20,
      },
      h5: {
        fontFamily: 'KumbhSans Bold',
        fontWeight: 'bold',
        fontSize: 18,
      },
      h6: {
        fontFamily: 'KumbhSans Bold',
        fontWeight: 'bold',
        fontSize: 16,
      },
      body1: {
        fontFamily: 'KumbhSans',
        fontWeight: 'normal',
        fontSize: 14,
      },
      body2: {
        fontFamily: 'KumbhSans',
        fontWeight: 'normal',
        fontSize: 12,
      },
      caption: {
        fontFamily: 'KumbhSans',
        fontWeight: 'normal',
        fontSize: 10.5,
      },
    },
  },
  spacing: {
    default: 8,
    create(value) {
      return this.default * value
    },
  },
  radius: {
    default: 4,
    create(value) {
      return this.default * value
    },
  },
  shadows: {
    1: {
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    2: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    3: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    4: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,
      elevation: 10,
    },
    5: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,
      elevation: 14,
    },
  },
}
