import type { Theme } from '@bleach/ui'
import type { Theme as ReactNavigationTheme } from '@react-navigation/native'

export function getNativeTheme(theme: Theme): ReactNavigationTheme {
  return {
    dark: theme.mode === 'dark',
    colors: {
      primary: theme.palette.primary.main,
      background: theme.palette.background,
      card: theme.palette.card,
      text: theme.palette.primary.foreground,
      notification: theme.palette.notification,
      border: theme.palette.border,
    },
    fonts: {
      bold: {
        fontFamily: theme.typography.weights.bold.fontFamily,
        fontWeight: 'bold',
      },
      regular: {
        fontFamily: theme.typography.weights.regular.fontFamily,
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: theme.typography.weights.medium.fontFamily,
        fontWeight: 'normal',
      },
      heavy: {
        fontFamily: theme.typography.weights.bold.fontFamily,
        fontWeight: 'normal',
      },
    },
  }
}
