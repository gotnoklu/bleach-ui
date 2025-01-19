import { Pressable, type PressableProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps, Theme } from '../../theme/types'
import Icon from '../Icon'
import type { ReactNode } from 'react'

export interface CheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  size?: number
  disabled?: boolean
  sx?: SxProps<PressableProps>['sx']
  children?: ReactNode
  onPress?: PressableProps['onPress']
}

const StyledCheckbox = styled(Pressable)<CheckboxProps>(
  (theme: Theme, { checked = false, size = 24, disabled = false }) => ({
    width: size,
    height: size,
    borderRadius: theme.radius.create(1),
    borderWidth: 2,
    borderColor: disabled ? theme.palette.disabled : theme.palette.action,
    backgroundColor: disabled
      ? theme.palette.disabled
      : checked
        ? theme.palette.action
        : theme.palette.backgrounds.paper,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  })
)

export default function Checkbox({
  checked = false,
  onChange,
  size = 24,
  disabled = false,
  ...props
}: CheckboxProps) {
  return (
    <StyledCheckbox
      checked={checked}
      size={size}
      disabled={disabled}
      onPress={() => !disabled && onChange?.(!checked)}
      {...props}
    >
      {checked && (
        <Icon name="check" size={size * 0.75} color={disabled ? 'text.disabled' : 'common.white'} />
      )}
    </StyledCheckbox>
  )
}
