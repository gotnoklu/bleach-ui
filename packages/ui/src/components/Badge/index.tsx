import type { ReactNode } from 'react'
import { isValidElement, useState } from 'react'
import type { LayoutChangeEvent, ViewProps } from 'react-native'
import { View } from 'react-native'
import { selectStyles, styled } from '../../theme/styles'
import type { PaletteBaseColorToken } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'
import type { TextProps } from '../text'
import { Text } from '../text'

export type BadgeAnchorOrigin = { y: 'top' | 'bottom'; x: 'left' | 'right' }

export interface BadgeProps extends ViewProps {
  color?: PaletteBaseColorToken
  size?: 'sm' | 'md' | 'lg'
  viewProps?: {
    label?: TextProps
  }
  children: ReactNode
  indicator?: ReactNode
  cutout?: boolean
  hidden?: boolean
  showZero?: boolean
  maxValue?: number
  position?: BadgeAnchorOrigin
}

const BadgeRoot = styled(View)(() => ({
  position: 'relative',
  display: 'inline-flex',
}))

const BadgeSizes = { sm: 10, md: 16, lg: 20 }

const StyledBadge = styled(View)<BadgeProps>((theme, { color = 'primary', size = 'sm', indicator, cutout }) => {
  const baseStyles = {
    backgroundColor: getThemeProperty({ object: theme.palette, key: color, fallback: color }),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius(4),
    zIndex: 1,
  } as const

  if (indicator !== undefined && indicator !== null) {
    return selectStyles(
      {
        when: cutout,
        styles: {
          borderColor: theme.palette.background,
          borderWidth: 3,
        },
      },
      {
        styles: {
          ...baseStyles,
          paddingHorizontal: theme.spacing(isValidElement(indicator) ? 0.5 : 1),
          paddingVertical: theme.spacing(0.5),
        },
      }
    )
  }

  const badgeSize = BadgeSizes[size]

  return selectStyles(
    {
      styles: {
        ...baseStyles,
        width: badgeSize,
        height: badgeSize,
      },
    },
    {
      when: cutout,
      styles: {
        width: badgeSize + 4,
        height: badgeSize + 4,
        paddingHorizontal: theme.spacing(0.2),
        paddingVertical: theme.spacing(0.2),
        borderColor: theme.palette.background,
        borderWidth: 3,
      },
    }
  )
})

export function Badge({
  children,
  indicator,
  hidden,
  showZero = false,
  maxValue,
  viewProps,
  position = { y: 'top', x: 'right' },
  ...props
}: BadgeProps) {
  const [badgeLayout, setBadgeLayout] = useState({ width: 0, height: 0 })
  const badgeContent =
    typeof indicator === 'number' && maxValue !== undefined && indicator > maxValue ? `${maxValue}+` : indicator

  const showBadge = !hidden && (showZero || badgeContent !== 0)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setBadgeLayout({ width, height })
  }

  const getBadgeStyle = () => {
    const style: any = {}

    if (position.y === 'top') {
      style.top = 0
    } else {
      style.bottom = 0
    }

    if (position.x === 'right') {
      style.right = 0
    } else {
      style.left = 0
    }

    style.transform = [
      { translateX: position.x === 'right' ? badgeLayout.width / 2 : -badgeLayout.width / 2 },
      { translateY: position.y === 'top' ? -badgeLayout.height / 2 : badgeLayout.height / 2 },
    ]

    return style
  }

  return (
    <BadgeRoot>
      {children}
      {showBadge ? (
        <StyledBadge {...props} indicator={indicator} onLayout={handleLayout} style={getBadgeStyle()}>
          {typeof badgeContent === 'string' || typeof badgeContent === 'number' ? (
            <Text variant="caption" color={`${props.color || 'primary'}.foreground`} {...viewProps?.label}>
              {badgeContent}
            </Text>
          ) : (
            badgeContent
          )}
        </StyledBadge>
      ) : null}
    </BadgeRoot>
  )
}
