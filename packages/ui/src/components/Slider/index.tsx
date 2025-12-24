import { useCallback, useEffect, useRef, useState } from 'react'
import { View, type ViewProps } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import type { GestureHandlerRootViewProps } from 'react-native-gesture-handler/lib/typescript/components/GestureHandlerRootView'
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { styled } from '../../theme/styles'
import { Show } from '../show'
import { Text } from '../text'

export interface SliderProps extends GestureHandlerRootViewProps {
  size?: 'sm' | 'md' | 'lg'
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  showValue?: boolean
  disabled?: boolean
  viewProps?: {
    root?: ViewProps
    sliderWrapper?: ViewProps
    track?: ViewProps
    thumb?: ViewProps
    fill?: ViewProps
    value?: ViewProps
  }
}

const SliderTrackSizes = { sm: 4, md: 8, lg: 12 }
const SliderThumbSizes = { sm: 20, md: 24, lg: 28 }

const StyledSliderWrapper = styled(View)(() => ({
  minHeight: 32,
  justifyContent: 'center',
  width: '100%',
  position: 'relative',
}))

const StyledTrack = styled(View)<ViewProps & { size?: SliderProps['size']; disabled?: boolean }>(
  (theme, { size = 'sm', disabled }) => {
    return {
      width: '100%',
      height: SliderTrackSizes[size],
      backgroundColor: disabled ? theme.palette.disabled : theme.palette.sliderTrackFilled,
      borderRadius: theme.radius(4),
      overflow: 'hidden',
    }
  }
)

const StyledThumb = styled(View)<
  ViewProps & { size?: SliderProps['size']; showValue?: SliderProps['showValue']; disabled?: boolean }
>((theme, { size = 'sm', showValue, disabled }) => {
  const thumbSize = SliderThumbSizes[size]
  const trackSize = SliderTrackSizes[size]

  return {
    width: showValue ? thumbSize * 1.5 : thumbSize,
    height: thumbSize,
    backgroundColor: disabled ? theme.palette.disabled : theme.palette.sliderThumbFilled,
    borderRadius: theme.radius(10),
    position: 'absolute',
    top: -(thumbSize - trackSize) / 2,
    left: -thumbSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows[1],
  }
})

const StyledFill = styled(View)<ViewProps & { disabled?: boolean }>((theme, { disabled }) => {
  return {
    height: '100%',
    backgroundColor: disabled ? theme.palette.disabled : theme.palette.primary.main,
    borderRadius: theme.radius(4),
    position: 'absolute',
  }
})

const AnimatedThumb = Animated.createAnimatedComponent(StyledThumb)
const AnimatedFill = Animated.createAnimatedComponent(StyledFill)

export function Slider({
  size = 'sm',
  min = 0,
  value = min,
  max = 100,
  step = 1,
  onChange,
  showValue = false,
  disabled = false,
  viewProps,
  ...props
}: SliderProps) {
  const sliderThumbSize = useRef(SliderThumbSizes[size])
  const position = useSharedValue(((value - min) / (max - min)) * 100)
  const startX = useSharedValue(-sliderThumbSize.current / 2)
  const trackWidth = useSharedValue(0)
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    position.value = ((value - min) / (max - min)) * 100
  }, [value, min, max, position])

  useAnimatedReaction(
    () => position.value,
    (currentPosition) => {
      const newValue = min + (currentPosition / 100) * (max - min)
      runOnJS(setDisplayValue)(Math.round(newValue))
    }
  )

  const onTrackLayout = useCallback((event: { nativeEvent: { layout: { width: number } } }) => {
    trackWidth.value = event.nativeEvent.layout.width
  }, [])

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      'worklet'
      startX.value = position.value
    })
    .onUpdate((event) => {
      'worklet'
      const maxWidth = trackWidth.value - sliderThumbSize.current
      let newPosition = startX.value + (event.translationX / maxWidth) * 100
      newPosition = Math.max(0, Math.min(100, newPosition))
      position.value = newPosition
    })
    .onEnd(() => {
      'worklet'
      const newValue = min + (position.value / 100) * (max - min)
      const steppedValue = Math.round(newValue / step) * step
      position.value = ((steppedValue - min) / (max - min)) * 100
      if (onChange) {
        runOnJS(onChange)(steppedValue)
      }
    })

  const thumbStyle = useAnimatedStyle(() => {
    const maxWidth = trackWidth.value - sliderThumbSize.current
    return {
      transform: [{ translateX: (position.value / 100) * maxWidth + sliderThumbSize.current / 2 }],
    }
  })

  const fillStyle = useAnimatedStyle(() => {
    return {
      width: `${position.value}%`,
    }
  })

  if (step <= 0 || step > max) {
    throw Error(
      'Invalid step value supplied for `Slider` component. Pass a number greater than or equal to the 1 and less than or equal to the `max` value.'
    )
  }

  return (
    <GestureHandlerRootView {...props} style={[{ flex: 1 }, props.style]}>
      <View {...viewProps?.root} style={[{ width: '100%', marginVertical: 16 }, viewProps?.root?.style]}>
        <StyledSliderWrapper {...viewProps?.sliderWrapper}>
          <GestureDetector gesture={panGesture}>
            <View style={{ flex: 1 }}>
              <StyledTrack size={size} disabled={disabled} {...viewProps?.track} onLayout={onTrackLayout}>
                <AnimatedFill style={fillStyle} disabled={disabled} {...viewProps?.fill} />
              </StyledTrack>
              <AnimatedThumb
                size={size}
                showValue={showValue}
                style={thumbStyle}
                disabled={disabled}
                {...viewProps?.thumb}
              >
                <Show when={showValue}>
                  <Text variant="xs" textAlign="center" {...viewProps?.value}>
                    {displayValue}
                  </Text>
                </Show>
              </AnimatedThumb>
            </View>
          </GestureDetector>
        </StyledSliderWrapper>
      </View>
    </GestureHandlerRootView>
  )
}
