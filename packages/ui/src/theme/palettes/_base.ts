import type { Theme } from '../types'

const TextWeights: Theme['typography']['weights'] = {
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

export const _BaseTheme: Theme = {
  mode: 'light',
  palette: {
    primary: {
      light: '#378DFF',
      main: '#006FFF',
      dark: '#0057C8',
      foreground: '#FFFFFF',
    },
    secondary: {
      light: '#9C27B0',
      main: '#7B1FA2',
      dark: '#6A1B9A',
      foreground: '#FFFFFF',
    },
    info: {
      light: '#03A9F4',
      main: '#0288D1',
      dark: '#01579B',
      foreground: '#FFFFFF',
    },
    success: {
      light: '#4CAF50',
      main: '#388E3C',
      dark: '#1B5E20',
      foreground: '#FFFFFF',
    },
    warning: {
      light: '#ffb522ff',
      main: '#ffaa00ff',
      dark: '#d48d00ff',
      foreground: '#444444',
    },
    error: {
      light: '#ff6224ff',
      main: '#ff4800ff',
      dark: '#c43700ff',
      foreground: '#FFFFFF',
    },
    text: {
      primary: '#444444',
      secondary: '#777777',
    },
    background: '#FCFCFC',
    card: '#FFFFFF',
    notification: '#FFFFFF',
    avatar: 'rgba(75, 75, 75, 0.1)',
    icon: '#777777',
    disabled: 'rgba(123, 123, 123, 0.3)',
    border: 'rgba(123, 123, 123, 0.2)',
    progressTrack: 'rgba(123, 123, 123, 0.2)',
    inputFilled: 'rgba(123, 123, 123, 0.1)',
    checkboxFilled: 'rgba(123, 123, 123, 0.1)',
    switchTrackFilled: 'rgba(123, 123, 123, 0.2)',
    switchTrackOutlined: 'rgba(123, 123, 123, 0.3)',
    transparent: 'rgba(0, 0, 0, 0)',
  },
  typography: {
    weights: TextWeights,
    variants: {
      h1: {
        fontSize: 28,
        ...TextWeights.bold,
      },
      h2: {
        fontSize: 25,
        ...TextWeights.bold,
      },
      h3: {
        fontSize: 22,
        ...TextWeights.bold,
      },
      h4: {
        fontSize: 20,
        ...TextWeights.bold,
      },
      h5: {
        fontSize: 18,
        ...TextWeights.bold,
      },
      h6: {
        fontSize: 16,
        ...TextWeights.bold,
      },
      body1: {
        fontSize: 14,
        ...TextWeights.regular,
      },
      body2: {
        fontSize: 12,
        ...TextWeights.regular,
      },
      caption: {
        fontSize: 10.5,
        ...TextWeights.regular,
      },
    },
  },
  spacing(value: number) {
    return 8 * value
  },
  radius(value: number) {
    return 4 * value
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
