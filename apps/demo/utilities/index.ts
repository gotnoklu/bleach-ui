import type { Theme } from '@bleach/ui'
import type { Theme as ReactNavigationTheme } from '@react-navigation/native'

export function getNativeTheme(theme: Theme): ReactNavigationTheme {
  return {
    dark: theme.mode === 'dark',
    colors: {
      primary: theme.palette.primary.main,
      background: theme.palette.backgrounds.default,
      card: theme.palette.backgrounds.paper,
      text: theme.palette.primary.text,
      notification: theme.palette.backgrounds.notification,
      border: theme.palette.border,
    },
    fonts: {
      bold: {
        fontFamily: theme.typography.types.bold.fontFamily,
        fontWeight: 'bold',
      },
      regular: {
        fontFamily: theme.typography.types.regular.fontFamily,
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: theme.typography.types.medium.fontFamily,
        fontWeight: 'normal',
      },
      heavy: {
        fontFamily: theme.typography.types.bold.fontFamily,
        fontWeight: 'normal',
      },
    },
  }
}
