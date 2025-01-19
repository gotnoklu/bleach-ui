import { Children, type ReactNode, useState } from 'react'
import { Pressable, type PressableProps } from 'react-native'
import type { ButtonVariant } from './types'
import Typography, { type TypographyProps } from '../Typography'
import type { Palette, SxProps, TextColor } from '../../theme/types'
import { useTheme } from '../../theme/hooks'
import {
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

export interface ButtonProps extends Omit<PressableProps, 'style'>, SxProps<PressableProps> {
  variant?: ButtonVariant
  color?: keyof Palette | keyof TextColor | (string & {})
  pressedColor?: keyof Palette | keyof TextColor | (string & {})
  size?: 'small' | 'medium' | 'large'
  slotProps?: {
    label?: TypographyProps
  }
  fullWidth?: boolean
  style?: PressableStyle
  children: ReactNode
  rounded?: boolean
  disabled?: boolean
}

const StyledButton = styled(Pressable)<ButtonProps>(
  (
    theme,
    { variant = 'text', color = 'primary', size = 'medium', fullWidth, disabled, rounded }
  ) => {
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
          width: fullWidth ? '100%' : 'auto',
          minWidth: 64,
          display: 'flex',
          flexDirection: 'row',
          height: buttonSizes[size],
          maxHeight: buttonSizes[size],
          borderRadius: theme.radius.create(rounded ? 100 : 2),
          gap: theme.spacing.create(1),
          paddingHorizontal:
            size === 'small'
              ? theme.spacing.create(1.5)
              : size === 'medium'
                ? theme.spacing.create(3)
                : theme.spacing.create(4),
          opacity: disabled ? 0.5 : 1,
          ...theme.typography.variants.body1,
        },
      }
    )
  }
)

const useLabelStyles = createComponentStyles(
  (
    theme,
    {
      variant = 'text',
      color = 'primary',
      size = 'medium',
      disabled,
    }: Pick<ButtonProps, 'variant' | 'color' | 'size' | 'disabled'>
  ) => {
    const labelSizes = { small: 14, medium: 16, large: 18 }
    const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

    return selectStyles(
      {
        if: variant === 'contained',
        styles: {
          color: getThemeProperty({
            object: theme.palette,
            key: disabled ? 'text.disabled' : `${color}.text`,
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
          fontSize: labelSizes[size],
        },
      }
    )
  }
)

export default function Button({
  pressedColor = 'primary.dark',
  slotProps,
  children,
  variant = 'text',
  disabled,
  ...props
}: ButtonProps) {
  const theme = useTheme()
  const [isPressed, setIsPressed] = useState(false)
  const labelStyles = useLabelStyles({
    variant,
    color:
      isPressed && !disabled && (variant === 'text' || variant === 'outlined')
        ? 'primary.text'
        : props.color,
    size: props.size,
    disabled,
  })
  const pressablePressedColor = getThemeProperty({
    object: theme.palette,
    key: pressedColor,
    fallback: pressedColor ?? 'rgba(150, 150, 150, 0.2)',
  })

  return (
    <StyledButton
      variant={variant}
      disabled={disabled}
      android_ripple={{
        color: pressablePressedColor,
        borderless: false,
        foreground: true,
      }}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => !disabled && setIsPressed(false)}
      {...props}
      style={(state) => ({
        backgroundColor: !disabled && state.pressed ? pressablePressedColor : undefined,
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
            <Typography
              fontWeight="medium"
              {...slotProps?.label}
              style={[labelStyles, slotProps?.label?.style]}
            >
              {child}
            </Typography>
          )
        }

        return child
      })}
    </StyledButton>
  )
}
