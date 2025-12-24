import { Children, type Component, type ForwardedRef, forwardRef, type ReactNode } from 'react'
import { Pressable, type PressableProps } from 'react-native'
import { selectStyles, styled } from '../../theme/styles'
import type { PaletteColorToken } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'
import { Text, type TextProps } from '../text'

export type ButtonVariant = 'filled' | 'outlined' | 'ghost'
export type ButtonSizes = 'sm' | 'md' | 'lg' | 'icon' | 'icon-sm' | 'icon-md' | 'icon-lg'

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant
  color?: PaletteColorToken | (string & {})
  size?: ButtonSizes
  viewProps?: {
    text?: TextProps
  }
  fullWidth?: boolean
  children: ReactNode
  shape?: 'default' | 'rounded'
  disabled?: boolean
}

const ButtonSizes: { [_ in ButtonSizes]: number } = {
  sm: 32,
  md: 40,
  lg: 48,
  icon: 40,
  'icon-sm': 32,
  'icon-md': 40,
  'icon-lg': 48,
}

const ButtonRadii: { [_ in ButtonSizes]: number } = {
  sm: 2.5,
  md: 3,
  lg: 4,
  icon: 3,
  'icon-sm': 2.5,
  'icon-md': 3,
  'icon-lg': 4,
}

const TextSizes: { [_ in Exclude<ButtonSizes, `icon${string}`>]: number } = { sm: 14, md: 16, lg: 18 }

const StyledButton = styled(Pressable)<ButtonProps>(
  (theme, { variant = 'text', color = 'primary', size = 'md', fullWidth, disabled, shape = 'default' }) => {
    const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

    if (size.startsWith('icon')) {
      return selectStyles(
        {
          when: variant === 'filled',
          styles: {
            backgroundColor: disabled ? theme.palette.disabled : buttonColor,
            opacity: disabled ? 0.3 : 1,
          },
        },
        {
          when: variant === 'outlined',
          styles: {
            borderColor: disabled ? theme.palette.disabled : buttonColor,
            borderWidth: 1.2,
          },
        },
        {
          when: variant === 'ghost',
          styles: { backgroundColor: 'transparent' },
        },
        {
          styles: {
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            width: ButtonSizes[size],
            height: ButtonSizes[size],
            maxWidth: ButtonSizes[size],
            maxHeight: ButtonSizes[size],
            display: 'flex',
            flexDirection: 'row',
            borderRadius: theme.radius(shape === 'rounded' ? 100 : ButtonRadii[size]),
            padding: theme.spacing(1.5),
          },
        }
      )
    }

    return selectStyles(
      {
        when: variant === 'filled',
        styles: {
          backgroundColor: disabled ? theme.palette.disabled : buttonColor,
          opacity: disabled ? 0.3 : 1,
        },
      },
      {
        when: variant === 'outlined',
        styles: {
          borderColor: disabled ? theme.palette.disabled : buttonColor,
          borderWidth: 1.2,
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
          minWidth: 64,
          display: 'flex',
          flexDirection: 'row',
          height: ButtonSizes[size],
          maxHeight: ButtonSizes[size],
          borderRadius: theme.radius(shape === 'rounded' ? 100 : 2),
          gap: theme.spacing(1),
          paddingHorizontal: size === 'sm' ? theme.spacing(1.5) : size === 'md' ? theme.spacing(3) : theme.spacing(4),
          ...theme.typography.variants.md,
        },
      }
    )
  }
)

const StyledText = styled(Text)<
  TextProps & Pick<ButtonProps, 'size' | 'disabled'> & { buttonVariant?: ButtonProps['variant'] }
>((theme, { buttonVariant = 'ghost', color = 'primary', size = 'md', disabled }) => {
  const buttonColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

  return selectStyles(
    {
      when: buttonVariant === 'filled',
      styles: {
        color: getThemeProperty({
          object: theme.palette,
          key: disabled ? 'text.disabled' : `${color}.foreground`,
          fallback: color,
        }),
      },
    },
    {
      when: buttonVariant === 'outlined' || buttonVariant === 'ghost',
      styles: { color: disabled ? theme.palette.disabled : buttonColor },
    },
    {
      when: !size.startsWith('icon'),
      styles: {
        fontSize: TextSizes[size as keyof typeof TextSizes],
      },
    }
  )
})

export const Button = forwardRef(function Button(
  { viewProps, children, variant = 'filled', disabled, ...props }: ButtonProps,
  ref: ForwardedRef<Component<ButtonProps> | null>
) {
  return (
    <StyledButton ref={ref} variant={variant} disabled={disabled} {...props}>
      {Children.map(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return (
            <StyledText
              buttonVariant={variant}
              color={props.color}
              size={props.size}
              disabled={disabled}
              {...viewProps?.text}
            >
              {child}
            </StyledText>
          )
        }

        return child
      })}
    </StyledButton>
  )
})
