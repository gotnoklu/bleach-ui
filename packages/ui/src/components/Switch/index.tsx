import { useLayoutEffect, useState } from 'react'
import { Pressable, type PressableProps, View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../theme/context'
import { styled } from '../../theme/styles'

interface BaseSwitchProps extends PressableProps {
  shape?: 'default' | 'rounded'
  onChecked?(checked: boolean): void
}

interface ControlledSwitchProps extends BaseSwitchProps {
  checked: boolean
}

interface UncontrolledSwitchProps extends BaseSwitchProps {
  defaultChecked?: boolean
}

export interface SwitchProps extends Partial<ControlledSwitchProps>, UncontrolledSwitchProps {}

const Track = styled(Pressable)<SwitchProps>((theme, { shape = 'default' }) => {
  return {
    borderRadius: theme.radius(shape === 'rounded' ? 4 : 2),
    backgroundColor: theme.palette.switchTrack,
    width: 16 * 2.5,
    minHeight: 16,
    padding: theme.spacing(0.5),
    flexDirection: 'row',
    alignItems: 'center',
  }
})

const Thumb = styled(View)<SwitchProps>((theme, { disabled, shape = 'default' }) => {
  return {
    borderRadius: theme.radius(shape === 'rounded' ? 4 : 1),
    width: 16,
    height: 16,
    backgroundColor: disabled
      ? theme.palette.disabled
      : theme.mode === 'dark'
        ? theme.palette.background
        : theme.palette.card,
  }
})

const AnimatedTrack = Animated.createAnimatedComponent(Track)
const AnimatedThumb = Animated.createAnimatedComponent(Thumb)

function ControlledSwitch({ checked, shape, disabled, onChecked, ...props }: ControlledSwitchProps) {
  const theme = useTheme()
  const colorOffset = useSharedValue(0)
  const translationOffset = useSharedValue(0)

  const animatedTrackStyles = useAnimatedStyle(() => {
    const colorInterpolation = withTiming(
      interpolateColor(
        translationOffset.value,
        [0, 16],
        [theme.palette.switchTrack, disabled ? theme.palette.disabled : theme.palette.primary.main],
        'RGB',
        { gamma: 2.2 }
      )
    )

    return {
      backgroundColor: colorInterpolation,
    }
  })

  const animatedThumbStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(translationOffset.value) }],
    }
  })

  function toggleSwitch() {
    if (checked) {
      translationOffset.value = 0
      colorOffset.value = 0
      if (typeof onChecked === 'function') onChecked(false)
    } else {
      translationOffset.value = 16
      colorOffset.value = 1
      if (typeof onChecked === 'function') onChecked(true)
    }
  }

  useLayoutEffect(() => {
    toggleSwitch()
  }, [])

  return (
    <AnimatedTrack {...props} shape={shape} disabled={disabled} style={animatedTrackStyles} onPress={toggleSwitch}>
      <AnimatedThumb style={animatedThumbStyles} shape={shape} disabled={disabled} collapsable={false} />
    </AnimatedTrack>
  )
}

function UncontrolledSwitch({ defaultChecked = false, ...props }: UncontrolledSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked)
  return <ControlledSwitch checked={checked} onChecked={setChecked} {...props} />
}

export function Switch({ checked, defaultChecked, ...props }: SwitchProps) {
  if (typeof checked === 'boolean') {
    return <ControlledSwitch checked={checked} {...props} />
  }

  return <UncontrolledSwitch defaultChecked={defaultChecked} {...props} />
}
