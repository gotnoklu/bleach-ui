import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated'
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler'
import type { SxProps } from '../../theme/types'
import { styled } from '../../theme/utilities'
import { View, type ViewProps } from 'react-native'
import Typography from '../Typography'
import { useEffect, useState } from 'react'

export interface SliderProps extends ViewProps, SxProps<ViewProps> {
  value?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number) => void
  showValue?: boolean
  disabled?: boolean
}

const StyledContainer = styled(View)(() => ({
  minHeight: 32,
  justifyContent: 'center',
}))

const StyledTrack = styled(View)<Omit<SliderProps, 'sx'>>((theme, props) => {
  return {
    width: '100%',
    height: 4,
    backgroundColor:
      theme.mode === 'dark' ? 'rgba(100, 100, 100, 0.5)' : 'rgba(100, 100, 100, 0.2)',
    borderRadius: theme.radius.create(1),
    position: 'relative',
    opacity: props.disabled ? 0.5 : 1,
  }
})

const StyledThumb = styled(View)<Omit<SliderProps, 'sx'>>((theme, props) => {
  return {
    width: 20,
    height: 20,
    backgroundColor:
      theme.mode === 'dark' ? theme.palette.backgrounds.default : theme.palette.backgrounds.paper,
    borderRadius: theme.radius.create(10),
    position: 'absolute',
    top: -8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    opacity: props.disabled ? 0.5 : 1,
  }
})

const StyledFill = styled(View)<Omit<SliderProps, 'sx'>>((theme, props) => {
  return {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.radius.create(1),
    position: 'absolute',
    opacity: props.disabled ? 0.5 : 1,
  }
})

const AnimatedThumb = Animated.createAnimatedComponent(StyledThumb)
const AnimatedFill = Animated.createAnimatedComponent(StyledFill)

export default function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  showValue = false,
  disabled = false,
  style,
  ...props
}: SliderProps) {
  const position = useSharedValue(((value - min) / (max - min)) * 100)
  const startX = useSharedValue(0)
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

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      'worklet'
      startX.value = position.value
    })
    .onUpdate((event) => {
      'worklet'
      let newPosition = startX.value + (event.translationX / 200) * 100
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
    return {
      transform: [{ translateX: (position.value / 100) * 200 }],
    }
  })

  const fillStyle = useAnimatedStyle(() => {
    return {
      width: `${position.value}%`,
    }
  })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[{ width: 200, marginVertical: 10 }, style]} {...props}>
        <StyledContainer>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={{ flex: 1 }}>
              <StyledTrack disabled={disabled}>
                <AnimatedFill style={fillStyle} disabled={disabled} />
                <AnimatedThumb style={thumbStyle} disabled={disabled} />
              </StyledTrack>
            </Animated.View>
          </GestureDetector>
        </StyledContainer>
        {showValue && (
          <Typography variant="caption" style={{ textAlign: 'center' }}>
            {displayValue}
          </Typography>
        )}
      </View>
    </GestureHandlerRootView>
  )
}
