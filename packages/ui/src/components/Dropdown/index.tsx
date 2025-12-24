import { Fragment, isValidElement, type ReactNode, useMemo, useRef, useState } from 'react'
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
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { selectStyles, styled } from '../../theme/styles'
import { Card, type CardProps } from '../card'
import { IconCheck, IconChevronDown, IconChevronUp, IconSearch } from '../icons'
import { Input } from '../input'
import { ListItemButton } from '../list-item-button'
import { Separator } from '../separator'
import { Show } from '../show'
import { Text, type TextProps } from '../text'

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
  viewProps?: { card?: CardProps }
  enableSearch?: boolean
  displayOnlyIcon?: boolean
  maxOptionsCardHeight?: number
  onSelect?(option: Options[number]): void
  displayTopOptions?(options: Options): Options
}

type BaseDropdownProps<Options extends Array<Record<PropertyKey, any>> = []> =
  | (ViewProps &
      Omit<BaseProps<Options>, 'viewProps'> & {
        label?: ReactNode
        description?: ReactNode
        viewProps?: { card?: CardProps; label?: TextProps; description?: TextProps }
      })
  | (PressableProps &
      BaseProps<Options> & {
        label?: ReactNode
        description?: ReactNode
      })

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
        borderRadius: theme.radius(2),
        paddingHorizontal: theme.spacing(2),
        gap: theme.spacing(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: fullWidth ? '100%' : displayOnlyIcon ? 20 + theme.spacing(1) * 4 + 20 : 150,
        maxWidth: fullWidth ? '100%' : 'auto',
      },
    },
    {
      when: variant === 'outlined',
      styles: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: isOpen ? theme.palette.primary.main : theme.palette.border,
      },
    }
  )
})

const StyledRootView = styled(View)<ViewProps>((theme) => {
  return {
    gap: theme.spacing(1),
  }
})

const AnimatedCard = Animated.createAnimatedComponent(Card)

function BaseDropdown<Options extends Array<Record<PropertyKey, any>> = []>({
  label,
  description,
  variant = 'base',
  value,
  placeholder = 'Select Option',
  options = [] as unknown as Options,
  labelKey = 'label',
  valueKey = 'value',
  iconKey = 'icon',
  displayOnlyIcon = false,
  maxOptionsCardHeight = 300,
  fullWidth = false,
  slots,
  viewProps,
  onSelect,
  enableSearch,
  displayTopOptions,
  ...props
}: BaseDropdownProps<Options>) {
  const [dropdownState, setDropdownState] = useState({
    isOpen: false,
    topOffset: 0,
    leftOffset: 0,
    width: 0,
  })
  const [filtered, setFiltered] = useState<Array<Record<PropertyKey, any>> | null>(null)
  const dropdownEl = useRef<View | null>(null)
  const optionsBoxEl = useRef<View | null>(null)
  const animationHeight = useSharedValue(0)
  const dimensions = useWindowDimensions()

  const dropdownAnimationStyles = useAnimatedStyle(() => {
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

  function closeDropdown() {
    animationHeight.value = 0
    Keyboard.dismiss()
    setFiltered(null)
    setTimeout(() => {
      setDropdownState((prev) => ({ ...prev, isOpen: false }))
    }, 200)
  }

  function openDropdown() {
    let optionsBoxHeight = 0

    optionsBoxEl.current?.measureInWindow((_left, _top, _width, height) => {
      optionsBoxHeight = height
    })

    dropdownEl.current?.measureInWindow((left, top, width, height) => {
      let topOffset = 0

      if (top > dimensions.height - optionsBoxHeight) {
        topOffset = top - optionsBoxHeight
      } else {
        topOffset = top + height + 8
      }

      animationHeight.value = maxOptionsCardHeight
      setDropdownState((prev) => ({ ...prev, isOpen: true, topOffset, leftOffset: left, width }))
    })
  }

  function toggleDropdown() {
    if (dropdownState.isOpen) {
      return closeDropdown()
    }

    return openDropdown()
  }

  function selectOption(option: Options[number]) {
    if (typeof onSelect === 'function') onSelect(option)
    closeDropdown()
  }

  function getSelectedOption() {
    if (value) return options[optionsIndex[value]] as Options[number]
    return null
  }

  function filterOptions(text: string) {
    if (text === '') return setFiltered(null)

    return setFiltered(options.filter((option) => option[labelKey].toLowerCase().includes(text.toLowerCase())))
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
        ? [...displayTopOptions(options), { type: 'Separator', [valueKey]: 'Separator-0' }, ...options]
        : options
    }

    return filtered
  }, [filtered, displayTopOptions])

  const DropdownEl = (
    <Fragment>
      <StyledDropdown
        ref={dropdownEl}
        isOpen={dropdownState.isOpen}
        onPress={toggleDropdown}
        variant={variant}
        fullWidth={fullWidth}
        {...props}
      >
        <Show when={!displayOnlyIcon}>{slots?.leftAdornments}</Show>
        {selectedOption.icon}
        <Show when={!displayOnlyIcon}>
          <Text variant="sm" fontWeight="medium" style={{ flex: 1 }}>
            {selectedOption.label}
          </Text>
        </Show>
        <Show when={!displayOnlyIcon}>
          {slots?.rightAdornments ?? (dropdownState.isOpen ? <IconChevronUp /> : <IconChevronDown />)}
        </Show>
      </StyledDropdown>
      <Modal
        visible={dropdownState.isOpen}
        transparent={true}
        animationType="none"
        onRequestClose={closeDropdown}
        onDismiss={closeDropdown}
      >
        <Pressable style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]} onPress={closeDropdown}>
          <AnimatedCard
            ref={optionsBoxEl}
            {...viewProps?.card}
            style={[
              dropdownAnimationStyles,
              {
                top: dropdownState.topOffset,
                left: dropdownState.leftOffset,
                width: dropdownState.width,
              },
              viewProps?.card?.style,
            ]}
          >
            <Show when={enableSearch === true}>
              <Input
                placeholder="Search"
                variant="outlined"
                leftActions={<IconSearch />}
                onChangeText={filterOptions}
              />
            </Show>
            <Show
              when={Array.isArray(filtered) && filtered.length === 0}
              fallback={
                <FlatList
                  data={mergedOptions}
                  keyExtractor={(item) => {
                    return item[valueKey as keyof typeof item]
                  }}
                  renderItem={({ item }) => {
                    if (item.type === 'Separator') {
                      return <Separator />
                    }

                    return (
                      <ListItemButton style={{ minHeight: 40 }} onPress={() => selectOption(item)}>
                        {item[iconKey]}
                        <Text
                          variant="sm"
                          color={value === item[valueKey] ? 'primary.main' : 'text.primary'}
                          style={{ flex: 1 }}
                        >
                          {item[labelKey as keyof typeof item] as string}
                        </Text>
                        {item[valueKey as keyof typeof item] === value ? <IconCheck /> : null}
                      </ListItemButton>
                    )
                  }}
                />
              }
            >
              <Text style={{ height: '100%' }}>No items match your search</Text>
            </Show>
          </AnimatedCard>
        </Pressable>
      </Modal>
    </Fragment>
  )

  if (label !== undefined || description !== undefined) {
    return (
      <StyledRootView {...(props as ViewProps)}>
        {isValidElement(label) ? (
          label
        ) : typeof label === 'string' ? (
          <Text variant="sm" fontWeight="medium" {...(viewProps as Extract<typeof viewProps, { label?: any }>)?.label}>
            {label}
          </Text>
        ) : null}
        {DropdownEl}
        {isValidElement(description) ? (
          description
        ) : typeof description === 'string' ? (
          <Text
            variant="xs"
            color="secondary"
            {...(viewProps as Extract<typeof viewProps, { description?: any }>)?.description}
          >
            {description}
          </Text>
        ) : null}
      </StyledRootView>
    )
  }

  return DropdownEl
}

function UncontrolledDropdown<Options extends Array<Record<PropertyKey, any>> = []>({
  defaultValue,
  valueKey = 'value',
  onSelect,
  ...props
}: Omit<BaseDropdownProps<Options>, 'value'> & {
  defaultValue?: BaseDropdownProps<Options>['value']
}) {
  const [value, setValue] = useState(defaultValue)

  function selectOption(option: Options[number]) {
    setValue(option[valueKey])
    if (typeof onSelect === 'function') onSelect(option)
  }

  return <BaseDropdown value={value} onSelect={selectOption} valueKey={valueKey} {...props} />
}

export type DropdownProps<Options extends Array<Record<PropertyKey, any>> = []> = BaseDropdownProps<Options> & {
  defaultValue?: BaseDropdownProps<Options>['value']
}

export function Dropdown<Options extends Array<Record<PropertyKey, any>> = []>({
  value,
  defaultValue,
  ...props
}: DropdownProps<Options>) {
  if (defaultValue !== undefined && defaultValue !== null) {
    return <UncontrolledDropdown defaultValue={defaultValue} {...props} />
  }

  return <BaseDropdown value={value} {...props} />
}
