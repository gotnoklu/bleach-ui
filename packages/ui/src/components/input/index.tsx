import { isValidElement, type ReactNode, useRef, useState } from 'react'
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputFocusEventData,
  type TextInputProps,
  TouchableWithoutFeedback,
  View,
  type ViewProps,
} from 'react-native'
import { selectStyles, styled } from '../../theme/styles'
import { Text, type TextProps } from '../text'

export type InputVariant = 'default' | 'filled' | 'outlined'

export interface InputProps extends ViewProps {
  variant?: InputVariant
  label?: ReactNode
  description?: ReactNode
  viewProps?: {
    label?: TextProps
    description?: TextProps
    textInputWrapper?: ViewProps
    textInput?: Omit<
      TextInputProps,
      | 'value'
      | 'defaultValue'
      | 'onChange'
      | 'onChangeText'
      | 'onFocus'
      | 'onBlur'
      | 'placeholder'
      | 'secureTextEntry'
      | 'onPress'
      | 'onPressIn'
      | 'onPressOut'
    >
  }
  fullWidth?: boolean
  invalid?: boolean
  leftActions?: ReactNode
  rightActions?: ReactNode
  value?: TextInputProps['value']
  defaultValue?: TextInputProps['defaultValue']
  onChange?: TextInputProps['onChange']
  onChangeText?: TextInputProps['onChangeText']
  onFocus?: TextInputProps['onFocus']
  onBlur?: TextInputProps['onBlur']
  secureTextEntry?: TextInputProps['secureTextEntry']
  editable?: TextInputProps['editable']
  onPressIn?: TextInputProps['onPressIn']
  onPressOut?: TextInputProps['onPressOut']
  onPress?: TextInputProps['onPress']
  placeholder?: TextInputProps['placeholder']
  disabled?: boolean
}

const InputRoot = styled(View)<ViewProps & Pick<InputProps, 'fullWidth'>>((theme, { fullWidth }) => {
  return {
    gap: theme.spacing(1),
    width: fullWidth ? '100%' : 'auto',
  }
})

const StyledTextInputWrapper = styled(View)<
  ViewProps & Pick<InputProps, 'variant' | 'fullWidth' | 'invalid'> & { isFocused?: boolean }
>((theme, { variant = 'default', fullWidth, isFocused, invalid }) => {
  return selectStyles(
    {
      styles: {
        minHeight: 44,
        borderRadius: theme.radius(2),
        paddingHorizontal: theme.spacing(1),
        gap: theme.spacing(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        width: fullWidth ? '100%' : 'auto',
        flex: fullWidth ? 1 : 0,
      },
    },
    {
      when: variant === 'outlined',
      styles: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: invalid ? theme.palette.error.main : isFocused ? theme.palette.primary.main : theme.palette.border,
      },
    },
    {
      when: variant === 'filled',
      styles: {
        backgroundColor: theme.palette.inputFilled,
      },
    }
  )
})

const StyledTextInput = styled(TextInput)<TextInputProps & { disabled?: boolean }>((theme, { disabled = false }) => {
  return {
    flex: 1,
    color: disabled ? theme.palette.disabled : theme.palette.text.primary,
    height: '100%',
    verticalAlign: 'middle',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    ...theme.typography.variants.md,
  }
})

export function Input({
  variant,
  label,
  description,
  viewProps,
  invalid = false,
  fullWidth = false,
  leftActions,
  rightActions,
  placeholder,
  onFocus,
  onBlur,
  secureTextEntry,
  editable,
  onPress,
  onPressIn,
  onPressOut,
  value,
  defaultValue,
  onChange,
  onChangeText,
  disabled,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<TextInput | null>(null)

  function onInputFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(true)
    if (typeof onFocus === 'function') {
      return onFocus(event)
    }
  }

  function onInputBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(false)
    if (typeof onBlur === 'function') {
      return onBlur(event)
    }
  }

  return (
    <InputRoot fullWidth={fullWidth} {...props}>
      {isValidElement(label) ? (
        label
      ) : typeof label === 'string' ? (
        <Text
          variant="sm"
          color={invalid ? 'error' : isFocused ? 'primary.main' : 'text.primary'}
          {...viewProps?.label}
        >
          {label}
        </Text>
      ) : null}
      <TouchableWithoutFeedback
        onPress={() => {
          inputRef.current?.focus()
        }}
        disabled={disabled}
      >
        <StyledTextInputWrapper variant={variant} isFocused={isFocused} {...viewProps?.textInputWrapper}>
          {leftActions}
          <StyledTextInput
            {...viewProps?.textInput}
            ref={inputRef}
            returnKeyType="next"
            placeholder={placeholder}
            placeholderTextColor={variant === 'filled' ? '#888888' : 'rgba(150, 150, 150, 0.7)'}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            secureTextEntry={secureTextEntry}
            editable={editable}
            onPress={disabled ? undefined : onPress}
            onPressIn={disabled ? undefined : onPressIn}
            onPressOut={disabled ? undefined : onPressOut}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            onChangeText={onChangeText}
            disabled={disabled}
          />
          {rightActions}
        </StyledTextInputWrapper>
      </TouchableWithoutFeedback>
      {isValidElement(description) ? (
        description
      ) : typeof description === 'string' ? (
        <Text
          variant="xs"
          color={invalid ? 'error' : isFocused ? 'primary.main' : 'text.secondary'}
          {...viewProps?.description}
        >
          {description}
        </Text>
      ) : null}
    </InputRoot>
  )
}
