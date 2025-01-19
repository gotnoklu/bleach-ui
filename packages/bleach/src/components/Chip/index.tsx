import { Pressable, type PressableProps } from 'react-native'
import { createComponentStyles, getThemeProperty, styled } from '../../theme/utilities'
import type { Palette, SxProps, TextColor } from '../../theme/types'
import Typography, { type TypographyProps } from '../Typography'
import { Children, type ReactNode } from 'react'

export interface ChipProps extends PressableProps, SxProps<PressableProps> {
  variant?: 'contained' | 'outlined'
  checked?: boolean
  defaultChecked?: boolean
  color?: keyof Palette | keyof TextColor | (string & {})
  size?: 'small' | 'medium' | 'large'
  slotProps?: {
    label?: TypographyProps
  }
  children?: ReactNode
  rounded?: boolean
  disabled?: boolean
}

const StyledChip = styled(Pressable)<Omit<ChipProps, 'sx'>>(
  (theme, { checked, color = 'action', size = 'medium', disabled, rounded }) => {
    const chipColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })
    return {
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      maxWidth: 'auto',
      borderRadius: theme.radius.create(rounded ? 100 : 2),
      gap: theme.spacing.create(1),
      borderColor: checked
        ? theme.palette.primary.main
        : disabled
          ? theme.palette.disabled
          : chipColor,
      borderWidth: 1,
      paddingVertical: theme.spacing.create(0.5),
      paddingHorizontal:
        size === 'small'
          ? theme.spacing.create(1)
          : size === 'medium'
            ? theme.spacing.create(1)
            : theme.spacing.create(2),
      opacity: disabled ? 0.9 : 1,
      ...theme.typography.variants.body1,
    }
  }
)

const useLabelStyles = createComponentStyles(
  (
    theme,
    {
      color = 'text.secondary',
      size = 'medium',
      disabled,
    }: Pick<ChipProps, 'color' | 'size' | 'disabled'>
  ) => {
    const labelSizes = { small: 14, medium: 16, large: 18 }
    const chipColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

    return {
      fontSize: labelSizes[size],
      color: disabled ? theme.palette.disabled : chipColor,
    }
  }
)

export default function Chip({ slotProps, children, disabled, ...props }: ChipProps) {
  const labelStyles = useLabelStyles({
    color: props.color,
    size: props.size,
    disabled,
  })

  return (
    <StyledChip
      disabled={disabled}
      android_ripple={{
        borderless: false,
        foreground: true,
      }}
      {...props}
    >
      {Children.map(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return (
            <Typography
              variant="body2"
              {...slotProps?.label}
              style={[labelStyles, slotProps?.label?.style]}
            >
              {child}
            </Typography>
          )
        }

        return child
      })}
    </StyledChip>
  )
}
