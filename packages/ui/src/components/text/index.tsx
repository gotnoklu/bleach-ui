import type { TextProps as ReactNativeTextProps, TextStyle } from 'react-native'
import { Text as ReactNativeText } from 'react-native'
import { styled } from '../../theme/styles'
import type { PaletteColorToken, Typography } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'
import { merge } from '../../utilities'

export interface TextProps extends ReactNativeTextProps {
  variant?: keyof Typography['variants']
  color?: PaletteColorToken | (string & {})
  fontWeight?: keyof Typography['weights']
  textAlign?: TextStyle['textAlign']
  gutterBottom?: boolean
}

const TextBottomGutters: { [_ in keyof Typography['variants']]: number } = {
  '5xl': 1,
  '4xl': 1,
  '3xl': 1,
  '2xl': 1,
  xl: 1,
  lg: 1,
  md: 0.5,
  sm: 0.5,
  xs: 0.2,
}

const StyledText = styled(ReactNativeText)<TextProps>(
  (theme, { variant = 'md', color = 'text.primary', fontWeight, textAlign, gutterBottom }) => {
    return merge(theme.typography.variants[variant], fontWeight ? theme.typography.weights[fontWeight] : {}, {
      color: getThemeProperty({ object: theme.palette, key: color, fallback: color }),
      marginBottom: gutterBottom ? theme.spacing(TextBottomGutters[variant]) : 0,
      textAlign,
    })
  }
)

export function Text({ children, ...props }: TextProps) {
  return <StyledText {...props}>{children}</StyledText>
}
