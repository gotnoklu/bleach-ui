import type { Theme } from '../types'

const ThemeTypographyTypes: Theme['typography']['types'] = {
  black: {
    fontFamily: '',
    fontWeight: 'black',
    fontStyle: 'normal',
  },
  heavy: {
    fontFamily: '',
    fontWeight: 'heavy',
    fontStyle: 'normal',
  },
  bold: {
    fontFamily: '',
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  semibold: {
    fontFamily: '',
    fontWeight: 'semibold',
    fontStyle: 'normal',
  },
  condensedBold: {
    fontFamily: '',
    fontWeight: 'condensedBold',
    fontStyle: 'normal',
  },
  condensed: {
    fontFamily: '',
    fontWeight: 'condensed',
    fontStyle: 'normal',
  },
  normal: {
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  regular: {
    fontFamily: '',
    fontWeight: 'regular',
    fontStyle: 'normal',
  },
  medium: {
    fontFamily: '',
    fontWeight: 'medium',
    fontStyle: 'normal',
  },
  italic: {
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  light: {
    fontFamily: '',
    fontWeight: 'light',
    fontStyle: 'normal',
  },
  ultralight: {
    fontFamily: '',
    fontWeight: 'ultralight',
    fontStyle: 'normal',
  },
  thin: {
    fontFamily: '',
    fontWeight: 'thin',
    fontStyle: 'normal',
  },
  100: {
    fontFamily: '',
    fontWeight: '100',
    fontStyle: 'normal',
  },
  200: {
    fontFamily: '',
    fontWeight: '200',
    fontStyle: 'normal',
  },
  300: {
    fontFamily: '',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  400: {
    fontFamily: '',
    fontWeight: '400',
    fontStyle: 'normal',
  },
  500: {
    fontFamily: '',
    fontWeight: '500',
    fontStyle: 'normal',
  },
  600: {
    fontFamily: '',
    fontWeight: '600',
    fontStyle: 'normal',
  },
  700: {
    fontFamily: '',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  800: {
    fontFamily: '',
    fontWeight: '800',
    fontStyle: 'normal',
  },
  900: {
    fontFamily: '',
    fontWeight: '900',
    fontStyle: 'normal',
  },
}

export const _DEFAULT_BASE_THEME: Theme = {
  mode: 'light',
  palette: {
    primary: {
      light: '#378DFF',
      main: '#006FFF',
      dark: '#0057C8',
      text: '#FFFFFF',
    },
    secondary: {
      light: '#9C27B0',
      main: '#7B1FA2',
      dark: '#6A1B9A',
      text: '#FFFFFF',
    },
    info: {
      light: '#03A9F4',
      main: '#0288D1',
      dark: '#01579B',
      text: '#FFFFFF',
    },
    success: {
      light: '#4CAF50',
      main: '#388E3C',
      dark: '#1B5E20',
      text: '#FFFFFF',
    },
    error: {
      light: '#FF8A37',
      main: '#FF6A00',
      dark: '#C85300',
      text: '#444444',
    },
    text: {
      primary: '#444444',
      secondary: '#777777',
    },
    backgrounds: {
      default: '#FCFCFC',
      paper: '#FFFFFF',
      notification: '#FFFFFF',
    },
    divider: 'rgba(100, 100, 100, 0.2)',
    action: 'rgba(75, 75, 75, 0.4)',
    disabled: 'rgba(123, 123, 123, 0.3)',
  },
  typography: {
    types: ThemeTypographyTypes,
    variants: {
      h1: {
        fontSize: 28,
        ...ThemeTypographyTypes.bold,
      },
      h2: {
        fontSize: 25,
        ...ThemeTypographyTypes.bold,
      },
      h3: {
        fontSize: 22,
        ...ThemeTypographyTypes.bold,
      },
      h4: {
        fontSize: 20,
        ...ThemeTypographyTypes.bold,
      },
      h5: {
        fontSize: 18,
        ...ThemeTypographyTypes.bold,
      },
      h6: {
        fontSize: 16,
        ...ThemeTypographyTypes.bold,
      },
      body1: {
        fontSize: 14,
        ...ThemeTypographyTypes.regular,
      },
      body2: {
        fontSize: 12,
        ...ThemeTypographyTypes.regular,
      },
      caption: {
        fontSize: 10.5,
        ...ThemeTypographyTypes.regular,
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
