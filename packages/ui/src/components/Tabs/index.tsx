import { Children, forwardRef, type ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Pressable, type PressableProps, ScrollView, View, type ViewProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { styled } from '../../theme/styles'
import type { Palette, TextPaletteColors, Theme } from '../../theme/types'
import { Text } from '../text'

// TODO: Use context for managing tab state and toggle

export interface TabProps extends Omit<PressableProps, 'children'> {
  label: string
  value: string | number
  icon?: ReactNode | ((state: { isSelected: boolean }) => ReactNode)
  disabled?: boolean
  isSelected?: boolean
  onPress?: () => void
}

interface TabsState {
  value: string | number
}

export interface TabsProps extends ViewProps {
  value: string | number
  onTabSelect?: ((value: string) => void) | ((value: number) => void) | ((value: string | number) => void)
  variant?: 'standard' | 'scrollable'
  color?: keyof Palette | keyof TextPaletteColors | (string & {})
  children: ReactNode
  indicatorColor?: keyof Palette | keyof TextPaletteColors | (string & {})
  viewProps?:
    | {
        root?: ViewProps
        tabsWrapper?: ViewProps
        indicator?: ViewProps
        tab?: Omit<TabProps, 'label' | 'value' | 'icon' | 'disabled' | 'isSelected'>
        label?: ViewProps
      }
    | ((state: TabsState) => {
        root?: ViewProps
        tabsWrapper?: ViewProps
        indicator?: ViewProps
        tab?: Omit<TabProps, 'label' | 'value' | 'icon' | 'disabled' | 'isSelected'>
        label?: ViewProps
      })
}

interface StyledTabsContainerProps extends ViewProps {
  variant?: TabsProps['variant']
  children?: ReactNode
}

const StyledTabsContainer = styled(View)<StyledTabsContainerProps>((theme) => ({
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: theme.palette.border,
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
  gap: theme.spacing(1),
  paddingHorizontal: theme.spacing(3),
  paddingVertical: theme.spacing(1.5),
  opacity: props.disabled ? 0.3 : 1,
  minHeight: 48,
  flex: props.variant === 'standard' ? 1 : undefined,
  zIndex: 100,
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

export const Tab = forwardRef<View, TabProps & { variant?: TabsProps['variant'] }>(function Tab(
  { label, value, icon, disabled, isSelected = false, onPress, variant, ...props },
  ref
) {
  const [pressed, setPressed] = useState(false)
  const iconElement = useMemo(() => (typeof icon === 'function' ? icon({ isSelected }) : icon), [icon])

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
      <Text variant="sm" fontWeight="medium" color={isSelected ? 'primary.main' : 'text.primary'}>
        {label}
      </Text>
    </StyledTab>
  )
})

export const Tabs = function Tabs({
  value,
  onTabSelect,
  variant = 'standard',
  children,
  viewProps,
  ...props
}: TabsProps) {
  const tabRefs = useRef<{ [key: string]: View | null }>({})
  const containerRef = useRef<View | null>(null)
  const scrollViewRef = useRef<ScrollView | null>(null)
  const selectedTabWidth = useSharedValue(0)
  const selectedTabX = useSharedValue(0)

  const indicatorStyle = useAnimatedStyle(() => ({
    width: withSpring(selectedTabWidth.value, { damping: 20, stiffness: 150 }),
    transform: [{ translateX: withSpring(selectedTabX.value, { damping: 20, stiffness: 150 }) }],
  }))

  const updateTabMetrics = (tabValue: string | number) => {
    const tabRef = tabRefs.current[tabValue]
    if (tabRef && containerRef.current) {
      containerRef.current.measure(
        (_cx: number, _cy: number, _cwidth: number, _cheight: number, containerPageX: number) => {
          tabRef.measure((_x: number, _y: number, width: number, _height: number, pageX: number) => {
            selectedTabWidth.value = width
            selectedTabX.value = pageX - containerPageX

            // Scroll to the selected tab if in scrollable mode
            if (variant === 'scrollable' && scrollViewRef.current) {
              scrollViewRef.current.scrollTo({
                x: pageX - containerPageX,
                animated: true,
              })
            }
          })
        }
      )
    }
  }

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      updateTabMetrics(value)
    })
  }, [])

  const resolvedViewProps = useMemo(
    () => (typeof viewProps === 'function' ? viewProps({ value }) : viewProps),
    [value, viewProps]
  )

  const TabsContent = (
    <StyledTabsContainer ref={containerRef} variant={variant} {...resolvedViewProps?.tabsWrapper}>
      {Children.map(children, (child) => {
        if (!child) return null

        const tab = child as { props: TabProps }
        const isSelected = tab.props.value === value

        return (
          <Tab
            {...tab.props}
            {...resolvedViewProps?.tab}
            key={tab.props.value}
            variant={variant}
            ref={(ref: View | null) => {
              tabRefs.current[tab.props.value] = ref
            }}
            isSelected={isSelected}
            onPress={() => {
              if (onTabSelect) {
                onTabSelect(tab.props.value as never)
              }
              if (tab.props.onPress) {
                tab.props.onPress()
              }
              updateTabMetrics(tab.props.value)
            }}
          />
        )
      })}
      <AnimatedIndicator
        {...resolvedViewProps?.indicator}
        style={[indicatorStyle, resolvedViewProps?.indicator?.style]}
      />
    </StyledTabsContainer>
  )

  return (
    <View style={{ width: variant === 'standard' ? '100%' : 'auto' }} {...resolvedViewProps?.root} {...props}>
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
