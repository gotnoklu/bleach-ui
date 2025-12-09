import { useState } from 'react'
import { Pressable, type PressableProps } from 'react-native'
import { selectStyles, styled } from '../../theme/styles'
import { Color } from '../color'
import { IconCheck } from '../icon'

type CheckboxSizes = 'sm' | 'md' | 'lg'

export interface CheckboxProps extends PressableProps {
  variant?: 'filled' | 'outlined'
  shape?: 'default' | 'rounded'
  size?: 'sm' | 'md' | 'lg'
  checked?: boolean
  defaultChecked?: boolean
  onChecked?: (checked: boolean) => void
}

const CheckboxSizes = {
  sm: 20.5,
  md: 26,
  lg: 32,
}

const CheckboxRadii: { [_ in CheckboxSizes]: number } = {
  sm: 1.5,
  md: 2,
  lg: 2.5,
}

const StyledCheckbox = styled(Pressable)<CheckboxProps>(
  (theme, { variant = 'outlined', checked = false, size = 'md', disabled = false, shape = 'default' }) => {
    return selectStyles(
      {
        when: variant === 'filled',
        styles: {
          width: CheckboxSizes[size],
          height: CheckboxSizes[size],
          backgroundColor: disabled
            ? theme.palette.disabled
            : checked
              ? theme.palette.primary.main
              : theme.palette.checkboxFilled,
        },
      },
      {
        when: variant === 'outlined',
        styles: {
          width: CheckboxSizes[size] - 1.2,
          height: CheckboxSizes[size] - 1.2,
          borderWidth: 1.2,
          borderColor: disabled ? theme.palette.disabled : theme.palette.primary.main,
        },
      },
      {
        styles: {
          borderRadius: shape === 'rounded' ? CheckboxSizes[size] : theme.radius(CheckboxRadii[size]),
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.3 : 1,
        },
      }
    )
  }
)

function ControlledCheckbox({ variant, checked = false, onChecked, size = 'md', disabled, ...props }: CheckboxProps) {
  function handleToggleCheck() {
    if (typeof onChecked === 'function') onChecked(!checked)
  }

  return (
    <StyledCheckbox
      variant={variant}
      checked={checked}
      size={size}
      disabled={disabled}
      onPress={handleToggleCheck}
      {...props}
    >
      {checked ? (
        <Color color={variant === 'filled' ? 'primary.foreground' : 'primary.main'}>
          <IconCheck size={CheckboxSizes[size] * 0.6} />
        </Color>
      ) : null}
    </StyledCheckbox>
  )
}

function UncontrolledCheckbox({ defaultChecked = false, onChecked, ...props }: Omit<CheckboxProps, 'checked'>) {
  const [checked, setChecked] = useState(defaultChecked)

  function handleToggleCheck(checked: boolean) {
    setChecked(checked)
  }

  return <ControlledCheckbox checked={checked} onChecked={handleToggleCheck} {...props} />
}

export function Checkbox({ checked, defaultChecked, ...props }: CheckboxProps) {
  if (typeof checked === 'boolean') {
    return <ControlledCheckbox checked={checked} {...props} />
  }

  return <UncontrolledCheckbox defaultChecked={defaultChecked} {...props} />
}
