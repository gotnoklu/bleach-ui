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
    fieldset?: ViewProps
    textInput?: Omit<TextInputProps, 'onFocus' | 'onBlur' | 'placeholder'>
  }
  fullWidth?: boolean
  invalid?: boolean
  leftActions?: ReactNode
  rightActions?: ReactNode
  onFocus?: TextInputProps['onFocus']
  onBlur?: TextInputProps['onBlur']
  placeholder?: TextInputProps['placeholder']
}

const InputRoot = styled(View)<ViewProps & Pick<InputProps, 'fullWidth'>>((theme, { fullWidth }) => {
  return {
    gap: theme.spacing(1),
    width: fullWidth ? '100%' : 'auto',
  }
})

const StyledFieldset = styled(View)<
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

const StyledTextInput = styled(TextInput)<TextInputProps>((theme) => {
  return {
    flex: 1,
    color: theme.palette.text.primary,
    height: '100%',
    verticalAlign: 'middle',
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    ...theme.typography.variants.body1,
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
          variant="body2"
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
      >
        <StyledFieldset variant={variant} isFocused={isFocused} {...viewProps?.fieldset}>
          {leftActions}
          <StyledTextInput
            ref={inputRef}
            returnKeyType="next"
            placeholder={placeholder}
            placeholderTextColor={variant === 'filled' ? '#888888' : 'rgba(150, 150, 150, 0.7)'}
            {...viewProps?.textInput}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
          {rightActions}
        </StyledFieldset>
      </TouchableWithoutFeedback>
      {isValidElement(description) ? (
        description
      ) : typeof description === 'string' ? (
        <Text
          variant="caption"
          color={invalid ? 'error' : isFocused ? 'primary.main' : 'text.secondary'}
          {...viewProps?.description}
        >
          {description}
        </Text>
      ) : null}
    </InputRoot>
  )
}
