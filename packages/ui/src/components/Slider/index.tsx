import { useCallback, useEffect, useState } from 'react'
import { View, type ViewProps } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedReaction, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { styled } from '../../theme/styles'
import { alpha } from '../../theme/utilities'
import { Box } from '../box'
import { Show } from '../show'
import { Text } from '../text'

export interface SliderProps extends ViewProps {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  showValue?: boolean
  disabled?: boolean
  viewProps?: {
    container?: ViewProps
    track?: ViewProps
    thumb?: ViewProps
    fill?: ViewProps
    value?: ViewProps
  }
}

const THUMB_SIZE = 20

const StyledContainer = styled(View)(() => ({
  minHeight: 32,
  justifyContent: 'center',
  width: '100%',
}))

const StyledTrack = styled(View)<SliderProps>((theme, props) => {
  return {
    width: '100%',
    height: 4,
    backgroundColor: alpha(theme.palette.disabled, props.disabled ? 0.3 : 0.5),
    borderRadius: theme.radius(1),
    position: 'relative',
  }
})

const StyledThumb = styled(View)<SliderProps>((theme, props) => {
  const color = props.disabled ? alpha(theme.palette.disabled, 1) : theme.palette.card
  return {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: color,
    borderRadius: theme.radius(10),
    position: 'absolute',
    top: -8,
    left: -THUMB_SIZE / 2,
    ...theme.shadows[1],
  }
})

const StyledFill = styled(View)<SliderProps>((theme, props) => {
  const color = props.disabled ? theme.palette.disabled : theme.palette.primary.main
  return {
    height: '100%',
    backgroundColor: alpha(color, props.disabled ? 0.5 : 1),
    borderRadius: theme.radius(1),
    position: 'absolute',
  }
})

const AnimatedThumb = Animated.createAnimatedComponent(StyledThumb)
const AnimatedFill = Animated.createAnimatedComponent(StyledFill)

export function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  showValue = false,
  disabled = false,
  style,
  viewProps,
  ...props
}: SliderProps) {
  const position = useSharedValue(((value - min) / (max - min)) * 100)
  const startX = useSharedValue(0)
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
      const maxWidth = trackWidth.value - THUMB_SIZE
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
    const maxWidth = trackWidth.value - THUMB_SIZE
    return {
      transform: [{ translateX: (position.value / 100) * maxWidth + THUMB_SIZE / 2 }],
    }
  })

  const fillStyle = useAnimatedStyle(() => {
    return {
      width: `${position.value}%`,
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Box style={{ width: '100%', marginVertical: 16 }} {...props}>
        <StyledContainer {...viewProps?.container}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={{ flex: 1 }}>
              <StyledTrack disabled={disabled} {...viewProps?.track} onLayout={onTrackLayout}>
                <AnimatedFill style={fillStyle} disabled={disabled} {...viewProps?.fill} />
                <AnimatedThumb style={thumbStyle} disabled={disabled} {...viewProps?.thumb} />
              </StyledTrack>
            </Animated.View>
          </GestureDetector>
        </StyledContainer>
        <Show when={showValue}>
          <Text variant="caption" style={{ textAlign: 'center' }} {...viewProps?.value}>
            {displayValue}
          </Text>
        </Show>
      </Box>
    </GestureHandlerRootView>
  )
}
