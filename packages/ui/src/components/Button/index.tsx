import { Children, type Component, type ForwardedRef, forwardRef, type ReactNode } from 'react'
import { Pressable, type PressableProps } from 'react-native'
import { useTheme } from '../../theme/hooks'
import type { Palette, TextPaletteColors } from '../../theme/types'
import { alpha, getThemeProperty, selectStyles, styled } from '../../theme/utilities'
import { merge } from '../../utilities'
import { Text, type TextProps } from '../text'

export type ButtonVariant = 'contained' | 'outlined' | 'text'

type PressableStyle = Exclude<PressableProps['style'], (number & Record<PropertyKey, any>) | Array<any> | false | ''>

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant
  color?: keyof Palette | keyof TextPaletteColors | (string & {})
  pressedColor?: keyof Palette | keyof TextPaletteColors | (string & {})
  size?: 'small' | 'medium' | 'large'
  slotProps?: {
    label?: TextProps
  }
  fullWidth?: boolean
  fullFlex?: boolean
  style?: PressableStyle
  children: ReactNode
  rounded?: boolean
  disabled?: boolean
}

const StyledButton = styled(Pressable)<Omit<ButtonProps, 'sx'>>(
  (theme, { variant = 'text', color = 'primary', size = 'medium', fullWidth, fullFlex, disabled, rounded }) => {
    const buttonSizes = { small: 32, medium: 40, large: 48 }
    const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })
    return selectStyles(
      {
        when: variant === 'contained',
        styles: {
          backgroundColor: disabled ? theme.palette.disabled : buttonColor,
          opacity: disabled ? 0.3 : 1,
        },
      },
      {
        when: variant === 'outlined',
        styles: {
          borderColor: disabled ? theme.palette.disabled : buttonColor,
          borderWidth: 1,
        },
      },
      {
        when: variant === 'text',
        styles: { backgroundColor: 'transparent' },
      },

      {
        styles: {
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          width: fullWidth ? '100%' : 'auto',
          flex: fullFlex ? 1 : undefined,
          minWidth: 64,
          display: 'flex',
          flexDirection: 'row',
          height: buttonSizes[size],
          maxHeight: buttonSizes[size],
          borderRadius: theme.radius(rounded ? 100 : 2),
          gap: theme.spacing(1),
          paddingHorizontal:
            size === 'small' ? theme.spacing(1.5) : size === 'medium' ? theme.spacing(3) : theme.spacing(4),
          ...theme.typography.variants.body1,
        },
      }
    )
  }
)

const StyledLabel = styled(Text)<
  Omit<TextProps, 'color'> &
    Pick<ButtonProps, 'color' | 'size' | 'disabled'> & { buttonVariant?: ButtonProps['variant'] }
>((theme, { buttonVariant = 'text', color = 'primary', size = 'medium', disabled }) => {
  const labelSizes = { small: 14, medium: 16, large: 18 }
  const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

  return selectStyles(
    {
      when: buttonVariant === 'contained',
      styles: {
        color: getThemeProperty({
          object: theme.palette,
          key: disabled ? 'text.disabled' : `${color}.text`,
          fallback: color,
        }),
      },
    },
    {
      when: buttonVariant === 'outlined' || buttonVariant === 'text',
      styles: { color: disabled ? theme.palette.disabled : buttonColor },
    },
    {
      styles: {
        fontSize: labelSizes[size],
      },
    }
  )
})

export const Button = forwardRef(function Button(
  { pressedColor = 'primary.dark', slotProps, children, variant = 'text', disabled, ...props }: ButtonProps,
  ref: ForwardedRef<Component<ButtonProps> | null>
) {
  const theme = useTheme()

  const pressablePressedColor = getThemeProperty({
    object: theme.palette,
    key: pressedColor,
    fallback: pressedColor ?? 'rgba(150, 150, 150, 0.2)',
  })

  return (
    <StyledButton
      ref={ref}
      variant={variant}
      disabled={disabled}
      android_ripple={{
        color: pressablePressedColor,
        borderless: false,
        foreground: true,
      }}
      {...props}
      style={(state) => ({
        backgroundColor: disabled
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
      {Children.map(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return (
            <StyledLabel
              buttonVariant={variant}
              color={props.color}
              size={props.size}
              disabled={disabled}
              {...slotProps?.label}
            >
              {child}
            </StyledLabel>
          )
        }

        return child
      })}
    </StyledButton>
  )
})
