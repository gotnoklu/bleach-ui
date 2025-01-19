import type { TextProps } from 'react-native'
import { Text } from 'react-native'
import { getThemeProperty, merge, styled } from '../../theme/utilities'
import type { SxProps, TextColor, TypographyVariants, TypographyTypes } from '../../theme/types'

export interface TypographyProps extends TextProps, SxProps<TextProps> {
  variant?: keyof TypographyVariants
  color?: keyof TextColor | (string & {})
  fontWeight?: keyof TypographyTypes
  gutterBottom?: boolean
}

const StyledTypography = styled(Text)<TypographyProps>(
  (theme, { variant = 'body1', color = 'text.primary', fontWeight = 'regular', gutterBottom }) => {
    return merge(theme.typography.types[fontWeight], theme.typography.variants[variant], {
      color: getThemeProperty({ object: theme.palette, key: color, fallback: color }),
      marginBottom: gutterBottom ? theme.spacing.create(1) : 0,
    })
  }
)

export default function Typography({ children, ...props }: TypographyProps) {
  return <StyledTypography {...props}>{children}</StyledTypography>
}
