import type { TextProps } from 'react-native'
import { Text } from 'react-native'
import { getThemeProperty, merge, styled } from '../../theme/utilities'
import type { SxProps, TextColor, TypographyVariants, TypographyTypes } from '../../theme/types'

export interface TypographyProps extends TextProps, SxProps<TextProps> {
  variant?: keyof TypographyVariants
  color?: keyof TextColor | (string & {})
  fontWeight?: keyof TypographyTypes
  gutterBottom?: boolean
  fullFlex?: boolean
}

const BOTTOM_GUTTERS: { [_ in keyof TypographyVariants]: number } = {
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

const StyledTypography = styled(Text)<TypographyProps>(
  (theme, { variant = 'body1', color = 'text.primary', fontWeight, gutterBottom, fullFlex }) => {
    return merge(
      theme.typography.variants[variant],
      fontWeight ? theme.typography.types[fontWeight] : {},
      {
        color: getThemeProperty({ object: theme.palette, key: color, fallback: color }),
        marginBottom: gutterBottom ? theme.spacing.create(BOTTOM_GUTTERS[variant]) : 0,
        flex: fullFlex ? 1 : undefined,
      }
    )
  }
)

export default function Typography({ children, ...props }: TypographyProps) {
  return <StyledTypography {...props}>{children}</StyledTypography>
}
