import { Children, type ReactNode } from 'react'
import { Pressable, type PressableProps } from 'react-native'
import type { ButtonVariant } from './types'
import Typography, { type TypographyProps } from '../Typography'
import type { Palette, SxProps, TextColor } from '../../theme/types'
import { useTheme } from '../../theme/hooks'
import { createStyles, getThemeProperty, merge, selectStyles, styled } from '../../theme/utilities'

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
}

const StyledButton = styled(Pressable)<ButtonProps>(
  (theme, { variant = 'text', color = 'primary', size = 'medium', fullWidth, disabled }) => {
    const buttonSizes = { small: 32, medium: 40, large: 48 }
    const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })
    return selectStyles(
      {
        if: variant === 'contained',
        styles: { backgroundColor: disabled ? 'transparent' : buttonColor },
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
          borderRadius: theme.radius.create(10),
          gap: theme.spacing.create(1),
          paddingHorizontal:
            size === 'small'
              ? theme.spacing.create(1.5)
              : size === 'medium'
                ? theme.spacing.create(3)
                : theme.spacing.create(4),
        },
      }
    )
  }
)

const useButtonStyles = createStyles(
  (
    theme,
    {
      variant = 'text',
      color = 'primary',
      size = 'medium',
    }: Pick<ButtonProps, 'variant' | 'color' | 'size'>
  ) => {
    const labelSizes = { small: 14, medium: 16, large: 18 }
    const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

    const labelStyles = selectStyles(
      {
        if: variant === 'contained',
        styles: {
          color: getThemeProperty({
            object: theme.palette,
            key: `${color}.text`,
            fallback: color,
          }),
        },
      },
      {
        if: variant === 'outlined',
        styles: { color: buttonColor },
      },
      {
        if: variant === 'text',
        styles: { color: buttonColor },
      },
      {
        styles: {
          fontSize: labelSizes[size],
          lineHeight: labelSizes[size],
        },
      }
    )

    return {
      label: labelStyles,
    }
  }
)

export default function Button({
  pressedColor = 'primary.dark',
  slotProps,
  children,
  ...props
}: ButtonProps) {
  const theme = useTheme()
  const styles = useButtonStyles({
    variant: props.variant,
    color: props.color,
    size: props.size,
  })
  const pressablePressedColor = getThemeProperty({
    object: theme.palette,
    key: pressedColor,
    fallback: pressedColor ?? 'rgba(150, 150, 150, 0.2)',
  })

  return (
    <StyledButton
      android_ripple={{
        color: pressablePressedColor,
        borderless: false,
        foreground: true,
      }}
      {...props}
      style={(state) => ({
        backgroundColor: state.pressed ? pressablePressedColor : undefined,
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
              style={[styles.label, slotProps?.label?.style]}
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
