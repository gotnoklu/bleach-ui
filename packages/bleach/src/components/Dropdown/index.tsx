import { Fragment, useMemo, useRef, useState, isValidElement, type ReactNode } from 'react'
import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  type PressableProps,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native'
import Typography, { type TypographyProps } from '../Typography'
import Icon from '../Icon'
import Paper, { type PaperProps } from '../Paper'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Show from '../Show'
import TextField from '../TextField'
import ListItemButton from '../ListItemButton'
import { selectStyles, styled } from '../../../theme/utilities'
import Divider from '../Divider'
import type { SxProps } from '../../../theme/types'

export type SelectVariant = 'base' | 'outlined'

type BaseProps<Options extends Array<Record<PropertyKey, any>> = []> = {
  variant?: SelectVariant
  placeholder?: string
  value?: string
  labelKey?: keyof Options[number] | 'label'
  valueKey?: keyof Options[number] | 'value'
  iconKey?: keyof Options[number] | 'icon'
  options: Options
  fullWidth?: boolean
  slots?: { leftAdornments?: ReactNode; rightAdornments?: ReactNode }
  slotProps?: { paper?: PaperProps }
  enableSearch?: boolean
  displayOnlyIcon?: boolean
  maxOptionsPaperHeight?: number
  onChange?: (option: Options[number]) => void
  displayTopOptions?: (options: Options) => Options
}

type BaseDropdownProps<Options extends Array<Record<PropertyKey, any>> = []> =
  | (ViewProps &
      SxProps<ViewProps> &
      Omit<BaseProps<Options>, 'slotProps'> & {
        label?: ReactNode
        description?: ReactNode
        slotProps?: { paper?: PaperProps; label?: TypographyProps; description?: TypographyProps }
      })
  | (PressableProps & SxProps<PressableProps> & BaseProps<Options>)

const StyledDropdown = styled(Pressable)<
  PressableProps &
    Pick<BaseDropdownProps, 'displayOnlyIcon' | 'variant' | 'fullWidth'> & {
      isOpen?: boolean
    }
>((theme, { displayOnlyIcon, variant, fullWidth, isOpen }) => {
  return selectStyles(
    {
      styles: {
        minHeight: 44,
        borderRadius: theme.radius.create(2),
        paddingHorizontal: theme.spacing.create(2),
        gap: theme.spacing.create(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: fullWidth
          ? '100%'
          : displayOnlyIcon
            ? 20 + theme.spacing.create(1) * 4 + 20
            : 150,
        maxWidth: fullWidth ? '100%' : 'auto',
      },
    },
    {
      if: variant === 'outlined',
      styles: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: isOpen ? theme.palette.primary.main : theme.palette.divider,
      },
    }
  )
})

const StyledRootView = styled(View)<ViewProps>((theme) => {
  return {
    gap: theme.spacing.create(1),
  }
})

const AnimatedPaper = Animated.createAnimatedComponent(Paper)

function BaseDropdown<Options extends Array<Record<PropertyKey, any>> = []>({
  // @ts-ignore
  label,
  // @ts-ignore
  description,
  variant = 'base',
  value,
  placeholder = 'Select Option',
  options = [] as unknown as Options,
  labelKey = 'label',
  valueKey = 'value',
  iconKey = 'icon',
  displayOnlyIcon = false,
  maxOptionsPaperHeight = 300,
  fullWidth = false,
  slots,
  slotProps,
  onChange,
  enableSearch,
  displayTopOptions,
  ...props
}: BaseDropdownProps<Options>) {
  const [selectState, setSelectState] = useState({
    isOpen: false,
    topOffset: 0,
    leftOffset: 0,
    width: 0,
  })
  const [filtered, setFiltered] = useState<Array<Record<PropertyKey, any>> | null>(null)
  const selectEl = useRef<View | null>(null)
  const optionsBoxEl = useRef<View | null>(null)
  const animationHeight = useSharedValue(0)
  const dimensions = useWindowDimensions()

  const selectAnimationStyles = useAnimatedStyle(() => {
    return {
      maxHeight: withTiming(animationHeight.value, { duration: 300 }),
    }
  })

  const optionsIndex = useMemo(() => {
    const result = {} as Record<string, number>
    let index = 0
    for (index; index < options.length; index++) {
      result[(options[index] as Options[number])[valueKey] as string] = index
    }
    return result
  }, [options])

  function closeSelect() {
    animationHeight.value = 0
    Keyboard.dismiss()
    setFiltered(null)
    setTimeout(() => {
      setSelectState((prev) => ({ ...prev, isOpen: false }))
    }, 250)
  }

  function openSelect() {
    let optionsBoxHeight = 0

    optionsBoxEl.current?.measureInWindow((_left, _top, _width, height) => {
      optionsBoxHeight = height
    })

    selectEl.current?.measureInWindow((left, top, width, height) => {
      let topOffset = 0

      if (top > dimensions.height - optionsBoxHeight) {
        topOffset = top - optionsBoxHeight
      } else {
        topOffset = top + height + 8
      }

      animationHeight.value = maxOptionsPaperHeight
      setSelectState((prev) => ({ ...prev, isOpen: true, topOffset, leftOffset: left, width }))
    })
  }

  function toggleSelect() {
    if (selectState.isOpen) {
      return closeSelect()
    }

    return openSelect()
  }

  function selectOption(option: Options[number]) {
    if (typeof onChange === 'function') onChange(option)
    closeSelect()
  }

  function getSelectedOption() {
    if (value) return options[optionsIndex[value]] as Options[number]
    return null
  }

  function filterOptions(text: string) {
    if (text === '') return setFiltered(null)

    return setFiltered(
      options.filter((option) => option[labelKey].toLowerCase().includes(text.toLowerCase()))
    )
  }

  const selectedOption = useMemo(() => {
    const option = getSelectedOption()
    const result = { icon: option?.[iconKey] ?? null, label: null as string | null }
    if (!displayOnlyIcon) {
      const label = option?.[labelKey] as string
      if (label) {
        result.label = label
      } else {
        result.label = placeholder
      }
    }

    return result
  }, [value])

  const mergedOptions = useMemo(() => {
    if (filtered === null) {
      return typeof displayTopOptions === 'function'
        ? [...displayTopOptions(options), { type: 'divider', [valueKey]: 'divider-0' }, ...options]
        : options
    }

    return filtered
  }, [filtered, displayTopOptions])

  const DropdownEl = (
    <Fragment>
      <StyledDropdown
        ref={selectEl}
        isOpen={selectState.isOpen}
        onPress={toggleSelect}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      >
        <Show visible={!displayOnlyIcon}>{slots?.leftAdornments}</Show>
        {selectedOption.icon}
        <Show visible={!displayOnlyIcon}>
          <Typography variant="body2" fontWeight="medium" style={{ flex: 1 }}>
            {selectedOption.label}
          </Typography>
        </Show>
        <Show visible={!displayOnlyIcon}>
          {slots?.rightAdornments ?? (
            <Icon
              name={selectState.isOpen ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={selectState.isOpen ? 'primary.main' : 'action'}
            />
          )}
        </Show>
      </StyledDropdown>
      <Modal
        visible={selectState.isOpen}
        transparent={true}
        animationType="none"
        onRequestClose={closeSelect}
        onDismiss={closeSelect}
      >
        <Pressable style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]} onPress={closeSelect}>
          <AnimatedPaper
            ref={optionsBoxEl}
            {...slotProps?.paper}
            style={[
              selectAnimationStyles,
              {
                top: selectState.topOffset,
                left: selectState.leftOffset,
                width: selectState.width,
              },
              slotProps?.paper?.style,
            ]}
          >
            <Show visible={enableSearch === true}>
              <TextField
                placeholder="Search"
                variant="outlined"
                leftAdornments={<Icon name="search" size={20} style={{ marginLeft: 8 }} />}
                slotProps={{ textInput: { onChangeText: filterOptions } }}
              />
            </Show>
            <Show
              visible={Array.isArray(filtered) && filtered.length === 0}
              fallback={
                <FlatList
                  data={mergedOptions}
                  keyExtractor={(item) => {
                    return item[valueKey as keyof typeof item]
                  }}
                  renderItem={({ item }) => {
                    if (item.type === 'divider') {
                      return <Divider />
                    }

                    return (
                      <ListItemButton style={{ minHeight: 40 }} onPress={() => selectOption(item)}>
                        {item[iconKey]}
                        <Typography
                          variant="body2"
                          color={value === item[valueKey] ? 'primary.main' : 'text.primary'}
                          style={{ flex: 1 }}
                        >
                          {item[labelKey as keyof typeof item] as string}
                        </Typography>
                        {item[valueKey as keyof typeof item] === value ? (
                          <Icon name="check" color="primary" size={16} />
                        ) : null}
                      </ListItemButton>
                    )
                  }}
                />
              }
            >
              <Typography style={{ height: '100%' }}>No items match your search</Typography>
            </Show>
          </AnimatedPaper>
        </Pressable>
      </Modal>
    </Fragment>
  )

  if (label !== undefined || description !== undefined) {
    return (
      <StyledRootView {...(props as ViewProps & SxProps<ViewProps>)}>
        {isValidElement(label) ? (
          label
        ) : typeof label === 'string' ? (
          <Typography
            variant="body2"
            fontWeight="medium"
            {...(slotProps as Extract<typeof slotProps, { label?: any }>)?.label}
          >
            {label}
          </Typography>
        ) : null}
        {DropdownEl}
        {isValidElement(description) ? (
          description
        ) : typeof description === 'string' ? (
          <Typography
            variant="caption"
            color="secondary"
            {...(slotProps as Extract<typeof slotProps, { description?: any }>)?.description}
          >
            {description}
          </Typography>
        ) : null}
      </StyledRootView>
    )
  }

  return DropdownEl
}

function UncontrolledDropdown<Options extends Array<Record<PropertyKey, any>> = []>({
  defaultValue,
  valueKey = 'value',
  onChange,
  ...props
}: Omit<BaseDropdownProps<Options>, 'value'> & {
  defaultValue?: BaseDropdownProps<Options>['value']
}) {
  const [value, setValue] = useState(defaultValue)

  function selectOption(option: Options[number]) {
    setValue(option[valueKey])
    if (typeof onChange === 'function') onChange(option)
  }

  return <BaseDropdown value={value} onChange={selectOption} valueKey={valueKey} {...props} />
}

export type DropdownProps<Options extends Array<Record<PropertyKey, any>> = []> =
  BaseDropdownProps<Options> & {
    defaultValue?: BaseDropdownProps<Options>['value']
  }

export default function Dropdown<Options extends Array<Record<PropertyKey, any>> = []>({
  value,
  defaultValue,
  ...props
}: DropdownProps<Options>) {
  if (defaultValue !== undefined && defaultValue !== null) {
    return <UncontrolledDropdown defaultValue={defaultValue} {...props} />
  }

  return <BaseDropdown value={value} {...props} />
}
