import { Children, type ReactNode, useState, useRef, forwardRef, useEffect } from 'react'
import { Pressable, View, type PressableProps, type ViewProps } from 'react-native'
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

export interface TabsProps extends ViewProps, SxProps<ViewProps> {
  value?: string
  onChange?: (value: string) => void
  variant?: 'standard' | 'fullWidth'
  color?: keyof Palette | keyof TextColor | (string & {})
  children: ReactNode
  indicatorColor?: keyof Palette | keyof TextColor | (string & {})
  slotProps?: {
    container?: ViewProps
    tabsContainer?: ViewProps
    indicator?: ViewProps
    tab?: Omit<TabProps, 'label' | 'value' | 'icon' | 'disabled' | 'isSelected'>
    label?: ViewProps
  }
}

interface StyledTabsContainerProps extends ViewProps {
  variant?: TabsProps['variant']
  children?: ReactNode
}

const StyledTabsContainer = styled(View)<StyledTabsContainerProps>((theme: Theme, props) => ({
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: theme.palette.divider,
  position: 'relative',
  ...(props.variant === 'fullWidth' && {
    width: '100%',
  }),
}))

interface StyledTabProps extends PressableProps {
  disabled?: boolean
  isSelected?: boolean
  children?: ReactNode
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
  flex: 1,
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

const Tab = forwardRef<View, TabProps>(
  ({ label, value, icon, disabled, isSelected, onPress, ...props }, ref) => {
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
  }
)

Tab.displayName = 'Tab'

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

  const indicatorStyle = useAnimatedStyle(() => ({
    width: withSpring(selectedTabWidth, { damping: 20, stiffness: 150 }),
    transform: [{ translateX: withSpring(selectedTabX, { damping: 20, stiffness: 150 }) }],
  }))

  const updateTabMetrics = (tabValue: string) => {
    const tabRef = tabRefs.current[tabValue]
    if (tabRef && containerRef.current) {
      containerRef.current.measure((_cx, _cy, _cwidth, _cheight, containerPageX) => {
        tabRef.measure((_x, _y, width, _height, pageX) => {
          setSelectedTabWidth(width)
          setSelectedTabX(pageX - containerPageX)
        })
      })
    }
  }

  useEffect(() => {
    if (value) {
      // Use requestAnimationFrame to ensure the layout is complete
      requestAnimationFrame(() => {
        updateTabMetrics(value)
      })
    }
  }, [value])

  return (
    <View
      style={{ width: variant === 'fullWidth' ? '100%' : 'auto' }}
      {...slotProps?.container}
      {...props}
    >
      <StyledTabsContainer ref={containerRef} variant={variant} {...slotProps?.tabsContainer}>
        {Children.map(children, (child) => {
          if (!child) return null

          const tab = child as { props: TabProps }
          const isSelected = tab.props.value === value

          return (
            <Tab
              {...slotProps?.tab}
              {...tab.props}
              key={tab.props.value}
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
        <AnimatedIndicator style={indicatorStyle} {...slotProps?.indicator} />
      </StyledTabsContainer>
    </View>
  )
}

Tabs.Tab = Tab

export default Tabs
