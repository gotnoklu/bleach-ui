import { Children, type ReactNode, useState, useRef, forwardRef, useEffect } from 'react'
import { Pressable, View, type PressableProps, type ViewProps, ScrollView } from 'react-native'
import type { SxProps, Palette, TextColor, Theme } from '../../theme/types'
import { styled } from '../../theme/utilities'
import Typography from '../Typography'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import React from 'react'

export interface TabProps extends Omit<PressableProps, 'children'>, SxProps<PressableProps> {
  label: string
  value: string
  icon?: ReactNode
  disabled?: boolean
  isSelected?: boolean
  onPress?: () => void
}

interface TabSlotState {
  value: string
  isSelected: boolean
  disabled?: boolean
}

interface TabsSlotState {
  value?: string
}

export interface TabsProps extends ViewProps, SxProps<ViewProps> {
  value?: string
  onChange?: (value: string) => void
  variant?: 'standard' | 'scrollable'
  color?: keyof Palette | keyof TextColor | (string & {})
  children: ReactNode
  indicatorColor?: keyof Palette | keyof TextColor | (string & {})
  slotProps?: {
    container?: ViewProps | ((state: TabsSlotState) => ViewProps)
    tabsContainer?: ViewProps | ((state: TabsSlotState) => ViewProps)
    indicator?: ViewProps | ((state: TabsSlotState) => ViewProps)
    tab?:
      | Omit<TabProps, 'label' | 'value' | 'icon' | 'disabled' | 'isSelected'>
      | ((
          state: TabSlotState
        ) => Omit<TabProps, 'label' | 'value' | 'icon' | 'disabled' | 'isSelected'>)
    label?: ViewProps | ((state: TabSlotState) => ViewProps)
  }
}

interface StyledTabsContainerProps extends ViewProps {
  variant?: TabsProps['variant']
  children?: ReactNode
}

const StyledTabsContainer = styled(View)<StyledTabsContainerProps>((theme) => ({
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: theme.palette.divider,
  position: 'relative',
}))

interface StyledTabProps extends PressableProps {
  disabled?: boolean
  isSelected?: boolean
  pressed?: boolean
  children?: ReactNode
  variant?: TabsProps['variant']
}

const StyledTab = styled(Pressable)<StyledTabProps>((theme: Theme, props) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing.create(1),
  paddingHorizontal: theme.spacing.create(3),
  paddingVertical: theme.spacing.create(1.5),
  opacity: props.disabled ? 0.5 : 1,
  minHeight: 48,
  flex: props.variant === 'standard' ? 1 : undefined,
  backgroundColor: props.pressed && !props.isSelected ? 'rgba(0, 0, 0, 0.04)' : undefined,
}))

interface StyledIndicatorProps extends ViewProps {
  children?: ReactNode
}

const StyledIndicator = styled(View)<StyledIndicatorProps>((theme: Theme) => ({
  position: 'absolute',
  bottom: -1,
  height: 2,
  backgroundColor: theme.palette.primary.main,
}))

const AnimatedIndicator = Animated.createAnimatedComponent(StyledIndicator)

const Tab = forwardRef<View, TabProps & { variant?: TabsProps['variant'] }>(function Tab(
  { label, value, icon, disabled, isSelected, onPress, variant, ...props },
  ref
) {
  const [pressed, setPressed] = useState(false)

  const iconElement =
    icon && React.isValidElement(icon)
      ? React.cloneElement(icon, {
          color: isSelected ? 'primary.main' : 'text.primary',
          ...(icon.props as any),
        })
      : icon

  return (
    <StyledTab
      ref={ref}
      disabled={disabled}
      isSelected={isSelected}
      pressed={pressed}
      variant={variant}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={disabled ? undefined : onPress}
      {...props}
    >
      {iconElement}
      <Typography
        variant="body2"
        fontWeight="medium"
        color={isSelected ? 'primary.main' : 'text.primary'}
      >
        {label}
      </Typography>
    </StyledTab>
  )
})

const Tabs = function Tabs({
  value,
  onChange,
  variant = 'standard',
  children,
  slotProps,
  ...props
}: TabsProps) {
  const [selectedTabWidth, setSelectedTabWidth] = useState(0)
  const [selectedTabX, setSelectedTabX] = useState(0)
  const tabRefs = useRef<{ [key: string]: View | null }>({})
  const containerRef = useRef<View>(null)
  const scrollViewRef = useRef<ScrollView>(null)

  const indicatorStyle = useAnimatedStyle(() => ({
    width: withSpring(selectedTabWidth, { damping: 20, stiffness: 150 }),
    transform: [{ translateX: withSpring(selectedTabX, { damping: 20, stiffness: 150 }) }],
  }))

  const updateTabMetrics = (tabValue: string) => {
    const tabRef = tabRefs.current[tabValue]
    if (tabRef && containerRef.current) {
      containerRef.current.measure(
        (_cx: number, _cy: number, _cwidth: number, _cheight: number, containerPageX: number) => {
          tabRef.measure(
            (_x: number, _y: number, width: number, _height: number, pageX: number) => {
              setSelectedTabWidth(width)
              setSelectedTabX(pageX - containerPageX)

              // Scroll to the selected tab if in scrollable mode
              if (variant === 'scrollable' && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                  x: pageX - containerPageX,
                  animated: true,
                })
              }
            }
          )
        }
      )
    }
  }

  useEffect(() => {
    if (value) {
      requestAnimationFrame(() => {
        updateTabMetrics(value)
      })
    }
  }, [value])

  const getContainerProps = (state: TabsSlotState) => {
    const slotProp = slotProps?.container
    if (typeof slotProp === 'function') {
      return slotProp(state)
    }
    return slotProp
  }

  const getTabsContainerProps = (state: TabsSlotState) => {
    const slotProp = slotProps?.tabsContainer
    if (typeof slotProp === 'function') {
      return slotProp(state)
    }
    return slotProp
  }

  const getTabProps = (state: TabSlotState) => {
    const slotProp = slotProps?.tab
    if (typeof slotProp === 'function') {
      return slotProp(state)
    }
    return slotProp
  }

  const getIndicatorProps = (state: TabsSlotState) => {
    const slotProp = slotProps?.indicator
    if (typeof slotProp === 'function') {
      return slotProp(state)
    }
    return slotProp
  }

  const TabsContent = (
    <StyledTabsContainer ref={containerRef} variant={variant} {...getTabsContainerProps({ value })}>
      {Children.map(children, (child) => {
        if (!child) return null

        const tab = child as { props: TabProps }
        const isSelected = tab.props.value === value

        return (
          <Tab
            {...getTabProps({
              value: tab.props.value,
              isSelected,
              disabled: tab.props.disabled,
            })}
            {...tab.props}
            key={tab.props.value}
            variant={variant}
            ref={(ref: View | null) => {
              tabRefs.current[tab.props.value] = ref
              if (isSelected) {
                updateTabMetrics(tab.props.value)
              }
            }}
            isSelected={isSelected}
            onPress={() => {
              if (onChange) {
                onChange(tab.props.value)
              }
              if (tab.props.onPress) {
                tab.props.onPress()
              }
              updateTabMetrics(tab.props.value)
            }}
          />
        )
      })}
      <AnimatedIndicator style={indicatorStyle} {...getIndicatorProps({ value })} />
    </StyledTabsContainer>
  )

  return (
    <View
      style={{ width: variant === 'standard' ? '100%' : 'auto' }}
      {...getContainerProps({ value })}
      {...props}
    >
      {variant === 'scrollable' ? (
        <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false}>
          {TabsContent}
        </ScrollView>
      ) : (
        TabsContent
      )}
    </View>
  )
}

Tabs.Tab = Tab

export default Tabs
