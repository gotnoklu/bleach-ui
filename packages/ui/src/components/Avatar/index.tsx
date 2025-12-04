import type { ReactNode } from 'react'
import { Image, type ImageProps, View, type ViewProps } from 'react-native'
import type { Palette, TextPaletteColors } from '../../theme/types'
import { getThemeProperty, selectStyles, styled } from '../../theme/utilities'
import Text, { type TextProps } from '../text'

export type AvatarVariant = 'circular' | 'rounded' | 'square'
export type AvatarSize = 'small' | 'medium' | 'large'

export interface AvatarProps extends ViewProps {
  variant?: AvatarVariant
  size?: AvatarSize
  src?: string
  alt?: string
  color?: keyof Palette | keyof TextPaletteColors | (string & {})
  backgroundColor?: keyof Palette | (string & {})
  children?: ReactNode
  slotProps?: {
    container?: ViewProps
    image?: Omit<ImageProps, 'source'>
    text?: TextProps
  }
}

const StyledAvatar = styled(View)<
  Omit<AvatarProps, 'sx' | 'backgroundColor'> & {
    $backgroundColor?: AvatarProps['backgroundColor']
  }
>((theme, { variant = 'circular', size = 'medium', $backgroundColor = 'action' }) => {
  const avatarSizes = { small: 32, medium: 40, large: 48 }
  const bgColor = getThemeProperty({
    object: theme.palette,
    key: $backgroundColor,
    fallback: $backgroundColor,
  })

  return selectStyles(
    {
      when: variant === 'circular',
      styles: { borderRadius: avatarSizes[size] / 2 },
    },
    {
      when: variant === 'rounded',
      styles: { borderRadius: theme.radius(1) },
    },
    {
      when: variant === 'square',
      styles: { borderRadius: 0 },
    },
    {
      styles: {
        backgroundColor: bgColor,
        width: avatarSizes[size],
        height: avatarSizes[size],
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
    }
  )
})

const AvatarImage = ({ source, ...props }: ImageProps) => (
  <Image source={source} style={{ width: '100%', height: '100%' }} {...props} />
)

export function Avatar({
  src,
  alt,
  color = 'text.primary',
  backgroundColor,
  children,
  slotProps,
  ...props
}: AvatarProps) {
  const renderContent = () => {
    if (src) {
      return <AvatarImage source={{ uri: src }} resizeMode="cover" {...slotProps?.image} />
    }

    if (typeof children === 'string') {
      return (
        <Text variant="body2" color={color} {...slotProps?.text}>
          {children.includes(' ')
            ? children.split(' ')[0][0] + children.split(' ')[1][0]
            : children.charAt(0).toUpperCase()}
        </Text>
      )
    }

    return children
  }

  return (
    <StyledAvatar $backgroundColor={backgroundColor} {...slotProps?.container} {...props}>
      {renderContent()}
    </StyledAvatar>
  )
}
