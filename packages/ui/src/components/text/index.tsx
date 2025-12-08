import type { TextProps as ReactNativeTextProps } from 'react-native'
import { Text as ReactNativeText } from 'react-native'
import { styled } from '../../theme/styles'
import type { PaletteColorToken, Typography } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'
import { merge } from '../../utilities'

export interface TextProps extends ReactNativeTextProps {
  variant?: keyof Typography['variants']
  color?: PaletteColorToken | (string & {})
  fontWeight?: keyof Typography['weights']
  gutterBottom?: boolean
}

const TextBottomGutters: { [_ in keyof Typography['variants']]: number } = {
  body1: 0.5,
  body2: 0.5,
  caption: 0.2,
  h1: 1,
  h2: 1,
  h3: 1,
  h4: 1,
  h5: 1,
  h6: 1,
}

const StyledText = styled(ReactNativeText)<TextProps>(
  (theme, { variant = 'body1', color = 'text.primary', fontWeight, gutterBottom }) => {
    return merge(theme.typography.variants[variant], fontWeight ? theme.typography.weights[fontWeight] : {}, {
      color: getThemeProperty({ object: theme.palette, key: color, fallback: color }),
      marginBottom: gutterBottom ? theme.spacing(TextBottomGutters[variant]) : 0,
    })
  }
)

export function Text({ children, ...props }: TextProps) {
  return <StyledText {...props}>{children}</StyledText>
}
