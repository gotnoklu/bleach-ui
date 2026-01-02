import type { ReactNode } from 'react'
import { Image, type ImageProps, View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/styles'
import type { PaletteColorToken } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'
import type { TextProps } from '../text'

export interface AvatarProps extends ViewProps {
  variant?: 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'default' | 'rounded' | 'circular'
  color?: PaletteColorToken | (string & {})
  source?: ImageProps['source']
  alt?: string
  children?: ReactNode
  viewProps?: {
    image?: Omit<ImageProps, 'source'>
    text?: TextProps
  }
}

const AvatarSizes = { sm: 32, md: 40, lg: 48 }

const StyledAvatar = styled(View)<AvatarProps>(
  (theme, { variant = 'filled', shape = 'default', size = 'md', color, source }) => {
    return selectStyles(
      {
        when: shape === 'default' || shape === 'rounded',
        styles: { borderRadius: theme.radius(2) },
      },
      {
        when: shape === 'circular',
        styles: { borderRadius: AvatarSizes[size] / 2 },
      },
      {
        when: variant === 'filled',
        styles: {
          backgroundColor: getThemeProperty({ object: theme.palette, key: color ?? 'avatar', fallback: color }),
        },
      },
      {
        when: variant === 'outlined',
        styles: {
          borderColor: getThemeProperty({ object: theme.palette, key: color ?? 'avatar', fallback: color }),
          borderWidth: 1,
          padding: source ? theme.spacing(1) : 0,
        },
      },
      {
        styles: {
          width: AvatarSizes[size],
          height: AvatarSizes[size],
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: getThemeProperty({ object: theme.palette, key: color ?? 'avatar', fallback: color }),
        },
      }
    )
  }
)

export function Avatar({ color, source, alt, children, viewProps, ...props }: AvatarProps) {
  return (
    <StyledAvatar color={color} source={source} {...props}>
      {source ? (
        <Image
          source={source}
          resizeMode="cover"
          {...viewProps?.image}
          style={selectStyles({ styles: { width: '100%', height: '100%' } }, { styles: viewProps?.image?.style })}
        />
      ) : (
        children
      )}
    </StyledAvatar>
  )
}
