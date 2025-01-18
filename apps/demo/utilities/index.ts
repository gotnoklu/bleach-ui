
import type { Theme as ReactNavigationTheme } from '@react-navigation/native'

export function getNativeTheme(theme: Theme): ReactNavigationTheme {
  return {
    dark: theme.palette.mode === 'dark',
    colors: {
      primary: theme.palette.primary.main,
      background: theme.palette.backgrounds.default,
      card: theme.palette.backgrounds.paper,
      text: theme.palette.primary.text,
      notification: theme.palette.backgrounds.notification,
      border: theme.palette.divider,
    },
    fonts: {
      bold: {
        fontFamily: theme.typography.weights.bold.fontFamily,
        fontWeight: theme.typography.weights.bold.fontWeight,
      },
      regular: {
        fontFamily: theme.typography.weights.regular.fontFamily,
        fontWeight: theme.typography.weights.regular.fontWeight,
      },
      medium: {
        fontFamily: theme.typography.weights.medium.fontFamily,
        fontWeight: theme.typography.weights.medium.fontWeight,
      },
      heavy: {
        fontFamily: theme.typography.weights.bold.fontFamily,
        fontWeight: theme.typography.weights.bold.fontWeight,
      },
    },
  }
}