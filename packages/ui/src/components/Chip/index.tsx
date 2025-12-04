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
      ...theme.typography.variants.body1,
    }
  }
)

const useLabelStyles = createComponentStyles(
  (
    theme,
    {
      checked,
      color = 'text.secondary',
      size = 'medium',
      disabled,
    }: Pick<ChipProps, 'checked' | 'color' | 'size' | 'disabled'>
  ) => {
    const labelSizes = { small: 11, medium: 14, large: 16 }
    const chipColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

    return {
      fontSize: labelSizes[size],
      color: checked ? theme.palette.primary.main : disabled ? theme.palette.disabled : chipColor,
    }
  }
)

export default function Chip({ checked, slotProps, children, disabled, ...props }: ChipProps) {
  const labelStyles = useLabelStyles({
    color: props.color,
    size: props.size,
    checked,
    disabled,
  })

  return (
    <StyledChip
      checked={checked}
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
            <Typography {...slotProps?.label} style={[labelStyles, slotProps?.label?.style]}>
              {child}
            </Typography>
          )
        }

        return child
      })}
    </StyledChip>
  )
}
