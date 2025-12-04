import type { ReactNode } from 'react'
import { useState } from 'react'
import type { LayoutChangeEvent, ViewProps } from 'react-native'
import { View } from 'react-native'
import type { Palette, TextPaletteColors } from '../../theme/types'
import { getThemeProperty, selectStyles, styled } from '../../theme/utilities'
import type { TextProps } from '../text'
import { Text } from '../text'

export type BadgeVariant = 'contained' | 'outlined'
export type BadgeAnchorOrigin = {
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'right'
}

export interface BadgeProps extends Omit<ViewProps, 'style'> {
  variant?: BadgeVariant
  color?: keyof Palette | keyof TextPaletteColors | (string & {})
  size?: 'small' | 'medium' | 'large'
  slotProps?: {
    label?: TextProps
  }
  style?: ViewProps['style']
  children: ReactNode
  rounded?: boolean
  content?: ReactNode
  invisible?: boolean
  showZero?: boolean
  max?: number
  anchorOrigin?: BadgeAnchorOrigin
}

const BadgeContainer = styled(View)(() => ({
  position: 'relative',
  display: 'inline-flex',
}))

const StyledBadge = styled(View)<BadgeProps>(
  (theme, { variant = 'contained', color = 'primary', size = 'small', rounded, content }) => {
    const badgeSizes = { small: 16, medium: 20, large: 24 }
    const badgeSize = badgeSizes[size]
    const badgeColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })
    const isTextContent = typeof content === 'string' || typeof content === 'number'
    const horizontalPadding = isTextContent ? theme.spacing(1) : 0
    const verticalPadding = isTextContent ? theme.spacing(0.5) : 0
    const height = badgeSize + verticalPadding * 2

    return selectStyles(
      {
        when: variant === 'contained',
        styles: { backgroundColor: badgeColor },
      },
      {
        when: variant === 'outlined',
        styles: {
          borderColor: badgeColor,
          borderWidth: 1,
          backgroundColor: 'transparent',
        },
      },
      {
        styles: {
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: isTextContent ? badgeSize * 1.5 : badgeSize,
          height,
          borderRadius: rounded ? height / 2 : theme.radius(2),
          paddingHorizontal: horizontalPadding,
          paddingVertical: verticalPadding,
          zIndex: 1,
        },
      }
    )
  }
)

export function Badge({
  children,
  content,
  variant = 'contained',
  invisible,
  showZero = false,
  max,
  slotProps,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  ...props
}: BadgeProps) {
  const [badgeLayout, setBadgeLayout] = useState({ width: 0, height: 0 })
  const badgeContent = typeof content === 'number' && max !== undefined && content > max ? `${max}+` : content

  const shouldShow = !invisible && (showZero || badgeContent !== 0)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setBadgeLayout({ width, height })
  }

  const getBadgeStyle = () => {
    const style: any = {}

    if (anchorOrigin.vertical === 'top') {
      style.top = 0
    } else {
      style.bottom = 0
    }

    if (anchorOrigin.horizontal === 'right') {
      style.right = 0
    } else {
      style.left = 0
    }

    style.transform = [
      {
        translateX: anchorOrigin.horizontal === 'right' ? badgeLayout.width / 2 : -badgeLayout.width / 2,
      },
      {
        translateY: anchorOrigin.vertical === 'top' ? -badgeLayout.height / 2 : badgeLayout.height / 2,
      },
    ]

    return style
  }

  return (
    <BadgeContainer>
      {children}
      {shouldShow && (
        <StyledBadge variant={variant} {...props} content={content} onLayout={handleLayout} style={getBadgeStyle()}>
          {typeof badgeContent === 'string' || typeof badgeContent === 'number' ? (
            <Text
              variant="caption"
              color={variant === 'contained' ? `${props.color || 'primary'}.text` : props.color || 'primary'}
              {...slotProps?.label}
            >
              {badgeContent}
            </Text>
          ) : (
            badgeContent
          )}
        </StyledBadge>
      )}
    </BadgeContainer>
  )
}
