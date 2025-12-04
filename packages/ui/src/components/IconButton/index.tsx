import {
  cloneElement,
  type Component,
  type ForwardedRef,
  forwardRef,
  type ReactElement,
} from 'react'
import { Pressable, type PressableProps } from 'react-native'
import type { TypographyProps } from '../Typography'
import type { Palette, SxProps, TextColor } from '../../theme/types'
import { useTheme } from '../../theme/hooks'
import {
  alpha,
  createComponentStyles,
  getThemeProperty,
  merge,
  selectStyles,
  styled,
} from '../../theme/utilities'

type PressableStyle = Exclude<
  PressableProps['style'],
  (number & Record<PropertyKey, any>) | Array<any> | false | ''
>

export interface IconButtonProps extends Omit<PressableProps, 'style'>, SxProps<PressableProps> {
  variant?: 'contained' | 'outlined' | 'text'
  color?: keyof Palette | keyof TextColor | (string & {})
  pressedColor?: keyof Palette | keyof TextColor | (string & {})
  size?: 'small' | 'medium' | 'large'
  slotProps?: {
    label?: TypographyProps
  }
  style?: PressableStyle
  children: ReactElement
  rounded?: boolean
  disabled?: boolean
}

const StyledIconButton = styled(Pressable)<Omit<IconButtonProps, 'sx'>>(
  (theme, { variant = 'text', color = 'primary', size = 'medium', disabled, rounded }) => {
    const buttonSizes = { small: 32, medium: 40, large: 48 }
    const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })
    return selectStyles(
      {
        if: variant === 'contained',
        styles: { backgroundColor: disabled ? theme.palette.disabled : buttonColor },
      },
      {
        if: variant === 'outlined',
        styles: { borderColor: disabled ? theme.palette.disabled : buttonColor, borderWidth: 1 },
      },
      {
        if: variant === 'text',
        styles: { backgroundColor: 'transparent' },
      },
      {
        styles: {
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          height: buttonSizes[size],
          width: buttonSizes[size],
          borderRadius: theme.radius.create(rounded ? 100 : 2),
          gap: theme.spacing.create(1),
          // paddingHorizontal:
          //   size === 'small'
          //     ? theme.spacing.create(1.5)
          //     : size === 'medium'
          //       ? theme.spacing.create(3)
          //       : theme.spacing.create(4),
          opacity: disabled ? 0.5 : 1,
        },
      }
    )
  }
)

const useIconStyles = createComponentStyles(
  (
    theme,
    {
      variant = 'text',
      color = 'primary',
      size = 'medium',
      disabled,
    }: Pick<IconButtonProps, 'variant' | 'color' | 'size' | 'disabled'>
  ) => {
    const iconSizes = { small: 16, medium: 22.5, large: 28 }
    const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

    return selectStyles(
      {
        if: variant === 'contained',
        styles: {
          color: getThemeProperty({
            object: theme.palette,
            key: disabled ? 'disabled' : `${color}.text`,
            fallback: color,
          }),
        },
      },
      {
        if: variant === 'outlined' || variant === 'text',
        styles: { color: disabled ? theme.palette.disabled : buttonColor },
      },
      {
        styles: {
          fontSize: iconSizes[size],
        },
      }
    )
  }
)

const IconButton = forwardRef(function IconButton(
  {
    pressedColor = 'primary.dark',
    slotProps,
    children,
    variant = 'text',
    color = 'primary',
    disabled,
    ...props
  }: IconButtonProps,
  ref: ForwardedRef<Component<IconButtonProps> | null>
) {
  const theme = useTheme()

  const iconStyles = useIconStyles({
    variant,
    color,
    size: props.size,
    disabled,
  }) as { color: string; fontSize: number }

  const pressablePressedColor = getThemeProperty({
    object: theme.palette,
    key: pressedColor,
    fallback: pressedColor ?? 'rgba(150, 150, 150, 0.2)',
  })

  return (
    <StyledIconButton
      ref={ref}
      color={color}
      variant={variant}
      disabled={disabled}
      android_ripple={{
        color: pressablePressedColor,
        borderless: false,
        foreground: true,
      }}
      {...props}
      style={(state) => ({
        backgroundColor:
          variant === 'contained' && disabled
            ? theme.palette.disabled
            : state.pressed
              ? variant !== 'contained'
                ? alpha(pressablePressedColor as string, 0.1)
                : pressablePressedColor
              : undefined,
        ...(typeof props.style === 'function'
          ? props.style(state)
          : Array.isArray(props.style)
            ? props.style.reduce((result, style) => merge(result, style), {})
            : props.style),
      })}
    >
      {cloneElement(children, {
        color: iconStyles.color,
        size: iconStyles.fontSize,
        styles: iconStyles,
      })}
    </StyledIconButton>
  )
})

export default IconButton
