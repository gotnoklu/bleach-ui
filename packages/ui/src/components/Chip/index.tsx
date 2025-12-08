import { Children, type ReactNode, useState } from 'react'
import { type GestureResponderEvent, Pressable, type PressableProps } from 'react-native'
import { createStyles, selectStyles, styled } from '../../theme/styles'
import type { PaletteColorToken } from '../../theme/types'
import { alpha, getThemeProperty } from '../../theme/utilities'
import { Text, type TextProps } from '../text'

interface BaseChipProps extends PressableProps {
  variant?: 'filled' | 'outlined'
  shape?: 'default' | 'rounded'
  checked?: boolean
  color?: PaletteColorToken | (string & {})
  size?: 'sm' | 'md' | 'lg'
  viewProps?: {
    label?: TextProps
  }
  children?: ReactNode
  disabled?: boolean
  onChecked?(event: GestureResponderEvent): void
}

export interface ChipProps extends BaseChipProps {
  defaultChecked?: boolean
}

const StyledBaseChip = styled(Pressable)<BaseChipProps>(
  (theme, { variant = 'filled', checked, color = 'border', size = 'md', disabled, shape = 'default' }) => {
    const chipColor = getThemeProperty({ object: theme.palette, key: color, fallback: color })

    return selectStyles(
      {
        when: variant === 'filled',
        styles: {
          backgroundColor: alpha(checked ? theme.palette.primary.main : (chipColor ?? theme.palette.border), 0.1),
        },
      },
      {
        when: variant === 'outlined',
        styles: {
          borderColor: checked ? theme.palette.primary.main : disabled ? theme.palette.disabled : chipColor,
          borderWidth: 1,
        },
      },
      {
        styles: {
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          maxWidth: 'auto',
          borderRadius: theme.radius(shape === 'rounded' ? 100 : 2),
          gap: theme.spacing(1),
          paddingVertical: theme.spacing(0.5),
          paddingHorizontal: size === 'sm' ? theme.spacing(1) : size === 'md' ? theme.spacing(1) : theme.spacing(2),
          ...theme.typography.variants.body1,
        },
      }
    )
  }
)

const useLabelStyles = createStyles(
  (theme, { checked, size = 'md', disabled }: Pick<ChipProps, 'checked' | 'color' | 'size' | 'disabled'>) => {
    const labelSizes = { sm: 11, md: 14, lg: 16 }

    return {
      fontSize: labelSizes[size],
      color: checked ? theme.palette.primary.main : disabled ? theme.palette.disabled : theme.palette.text.secondary,
    }
  }
)

function BaseChip({ variant, checked, viewProps, children, disabled, onChecked, ...props }: ChipProps) {
  const labelStyles = useLabelStyles({
    color: props.color,
    size: props.size,
    checked,
    disabled,
  })

  return (
    <StyledBaseChip
      variant={variant}
      checked={checked}
      disabled={disabled}
      android_ripple={{
        borderless: false,
        foreground: true,
      }}
      onPress={onChecked}
      {...props}
    >
      {Children.map(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number') {
          return (
            <Text {...viewProps?.label} style={[labelStyles, viewProps?.label?.style]}>
              {child}
            </Text>
          )
        }

        return child
      })}
    </StyledBaseChip>
  )
}

const ControlledChip = BaseChip

function UncontrolledChip({ checked: defaultChecked, ...props }: ChipProps) {
  const [checked, setChecked] = useState(defaultChecked)

  function toggleChecked() {
    setChecked(!checked)
  }

  return <BaseChip {...props} checked={checked} onChecked={toggleChecked} />
}

export function Chip({ checked, defaultChecked, ...props }: ChipProps) {
  if (typeof checked === 'boolean') return <ControlledChip checked={checked} {...props} />
  return <UncontrolledChip checked={defaultChecked} {...props} />
}

Chip.Base = BaseChip
