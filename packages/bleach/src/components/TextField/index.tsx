import { isValidElement, useRef, useState, type ReactNode } from 'react'
import {
  type NativeSyntheticEvent,
  TextInput,
  type TextInputFocusEventData,
  type TextInputProps,
  TouchableWithoutFeedback,
  View,
  type ViewProps,
} from 'react-native'
import Typography, { type TypographyProps } from '../Typography'
import { selectStyles, styled } from '../../../theme/utilities'
import type { SxProps } from '../../../theme/types'

export type TextFieldVariant = 'base' | 'filled' | 'outlined'

export interface TextFieldProps extends ViewProps, SxProps<ViewProps> {
  variant?: TextFieldVariant
  label?: ReactNode
  description?: ReactNode
  typography?: {
    variant?: TypographyProps['variant']
    fontWeight?: TypographyProps['fontWeight']
  }
  slotProps?: {
    label?: TypographyProps
    description?: TypographyProps
    fieldset?: ViewProps
    textInput?: TextInputProps
  }
  fullWidth?: boolean
  isInvalid?: boolean
  leftAdornments?: ReactNode
  rightAdornments?: ReactNode
  onFocus?: TextInputProps['onFocus']
  onBlur?: TextInputProps['onBlur']
  placeholder?: TextInputProps['placeholder']
}

const StyledTextField = styled(View)((theme) => {
  return {
    gap: theme.spacing.create(1),
  }
})

const StyledFieldset = styled(View)<
  ViewProps & Pick<TextFieldProps, 'variant' | 'fullWidth' | 'isInvalid'> & { isFocused?: boolean }
>((theme, { variant, fullWidth, isFocused, isInvalid }) => {
  return selectStyles(
    {
      styles: {
        minHeight: 44,
        borderRadius: theme.radius.create(2),
        paddingHorizontal: theme.spacing.create(1),
        gap: theme.spacing.create(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        width: fullWidth ? '100%' : 'auto',
        flex: fullWidth ? 1 : 0,
      },
    },
    {
      if: variant === 'outlined',
      styles: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: isInvalid
          ? theme.palette.error.main
          : isFocused
            ? theme.palette.primary.main
            : theme.palette.divider,
      },
    },
    {
      if: variant === 'filled',
      styles: {
        backgroundColor: 'rgba(150, 150, 150, 0.25)',
      },
    }
  )
})

const StyledTextInput = styled(TextInput)<
  TextInputProps & { typography?: TextFieldProps['typography'] }
>((theme, { typography }) => {
  return selectStyles(
    {
      if: typography?.variant && typography.variant in theme.typography.variants,
      styles:
        theme.typography.variants[typography?.variant as Extract<TypographyProps['variant'], {}>],
      fallback: theme.typography.variants.body1,
    },
    {
      styles: {
        flex: 1,
        color: theme.palette.text.primary,
        height: '100%',
        verticalAlign: 'middle',
        paddingTop: theme.spacing.create(1.5),
        paddingBottom: theme.spacing.create(1.5),
      },
    }
  )
})

export default function TextField({
  variant = 'outlined',
  label,
  description,
  slotProps,
  isInvalid = false,
  fullWidth = false,
  typography,
  leftAdornments,
  rightAdornments,
  placeholder,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
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
    <StyledTextField {...props}>
      {isValidElement(label) ? (
        label
      ) : typeof label === 'string' ? (
        <Typography
          variant="body2"
          color={isInvalid ? 'error' : isFocused ? 'primary.main' : 'text.primary'}
          {...slotProps?.label}
        >
          {label}
        </Typography>
      ) : null}
      <TouchableWithoutFeedback
        onPress={() => {
          inputRef.current?.focus()
        }}
      >
        <StyledFieldset variant={variant} isFocused={isFocused} {...slotProps?.fieldset}>
          {leftAdornments}
          <StyledTextInput
            ref={inputRef}
            returnKeyType="next"
            placeholder={placeholder}
            placeholderTextColor={variant === 'filled' ? '#888888' : 'rgba(150, 150, 150, 0.7)'}
            typography={typography}
            {...slotProps?.textInput}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
          />
          {rightAdornments}
        </StyledFieldset>
      </TouchableWithoutFeedback>
      {isValidElement(description) ? (
        description
      ) : typeof description === 'string' ? (
        <Typography
          variant="caption"
          color={isInvalid ? 'error' : isFocused ? 'primary.main' : 'text.secondary'}
          {...slotProps?.description}
        >
          {description}
        </Typography>
      ) : null}
    </StyledTextField>
  )
}
