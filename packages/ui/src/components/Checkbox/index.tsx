import { useState } from 'react'
import { Pressable, type PressableProps } from 'react-native'
import { styled } from '../../theme/utilities'
import { IconCircle, IconCircleCheckFilled } from '../icon'

export interface CheckboxProps extends PressableProps {
  checked?: boolean
  defaultChecked?: boolean
  rounded?: boolean
  size?: 'small' | 'medium' | 'large'
  onChange?: (checked: boolean) => void
}

const CheckboxSizes = {
  small: 20.5,
  medium: 26,
  large: 32,
}

const StyledCheckbox = styled(Pressable)<CheckboxProps>(
  (theme, { checked = false, size = 'medium', disabled = false, rounded }) => {
    return {
      width: CheckboxSizes[size],
      height: CheckboxSizes[size],
      borderRadius: rounded ? CheckboxSizes[size] : theme.radius(1.5),
      borderWidth: 2,
      borderColor: disabled ? theme.palette.disabled : theme.palette.primary.main,
      backgroundColor: disabled
        ? theme.palette.disabled
        : checked
          ? theme.palette.primary.main
          : theme.palette.backgrounds.paper,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    }
  }
)

function ControlledCheckbox({ checked = false, onChange, size = 'medium', disabled, ...props }: CheckboxProps) {
  function handleChange() {
    if (typeof onChange === 'function') onChange(!checked)
  }

  return (
    <StyledCheckbox checked={checked} size={size} disabled={disabled} onPress={handleChange} {...props}>
      {checked ? (
        <IconCircleCheckFilled size={CheckboxSizes[size] * 0.6} />
      ) : (
        <IconCircle size={CheckboxSizes[size] * 0.6} />
      )}
    </StyledCheckbox>
  )
}

function UncontrolledCheckbox({ defaultChecked = false, onChange, ...props }: Omit<CheckboxProps, 'checked'>) {
  const [checked, setChecked] = useState(defaultChecked)

  function handleChange(checked: boolean) {
    setChecked(checked)
  }

  return <ControlledCheckbox checked={checked} onChange={handleChange} {...props} />
}

export function Checkbox({ checked, defaultChecked, ...props }: CheckboxProps) {
  if (typeof checked === 'boolean') {
    return <ControlledCheckbox checked={checked} {...props} />
  }

  return <UncontrolledCheckbox defaultChecked={defaultChecked} {...props} />
}
