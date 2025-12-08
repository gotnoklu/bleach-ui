import type { ReactNode } from 'react'
import { Image, type ImageProps, View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/styles'
import type { PaletteColorToken } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'
import type { TextProps } from '../text'

type AvatarVariant = 'default' | 'circular'
type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps extends ViewProps {
  variant?: AvatarVariant
  size?: AvatarSize
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

const StyledAvatar = styled(View)<AvatarProps>((theme, { variant = 'default', size = 'md', color }) => {
  return selectStyles(
    {
      when: variant === 'default',
      styles: { borderRadius: theme.radius(2) },
    },
    {
      when: variant === 'circular',
      styles: { borderRadius: AvatarSizes[size] / 2 },
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
})

export function Avatar({ color, source, alt, children, viewProps, ...props }: AvatarProps) {
  return (
    <StyledAvatar color={color} {...props}>
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
