import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import type { SxProps } from '../../theme/types'
import { styled } from '../../theme/utilities'
import { Pressable, type PressableProps, View } from 'react-native'
import { useTheme } from '../../theme/hooks'
import { useEffect, useState } from 'react'

export interface SwitchProps extends PressableProps, SxProps<PressableProps> {
  checked?: boolean
  defaultChecked?: boolean
  rounded?: boolean
  onChange?: (checked: boolean) => void
}

const StyledTrack = styled(Pressable)<Omit<SwitchProps, 'sx'>>((theme, { rounded = false }) => {
  return {
    borderRadius: theme.radius.create(rounded ? 4 : 2),
    backgroundColor:
      theme.mode === 'dark' ? 'rgba(100, 100, 100, 0.5)' : 'rgba(100, 100, 100, 0.2)',
    width: 16 * 2.5,
    minHeight: 16,
    padding: theme.spacing.create(0.5),
    flexDirection: 'row',
    alignItems: 'center',
  }
})

const StyledThumb = styled(View)<Omit<SwitchProps, 'sx'>>(
  (theme, { disabled, rounded = false }) => {
    return {
      borderRadius: theme.radius.create(rounded ? 4 : 1),
      width: 16,
      height: 16,
      backgroundColor: disabled
        ? theme.palette.disabled
        : theme.mode === 'dark'
          ? theme.palette.backgrounds.default
          : theme.palette.backgrounds.paper,
    }
  }
)

const AnimatedTrack = Animated.createAnimatedComponent(StyledTrack)
const AnimatedThumb = Animated.createAnimatedComponent(StyledThumb)

function ControlledSwitch({ checked, rounded, disabled, onChange, ...props }: SwitchProps) {
  const theme = useTheme()
  const colorOffset = useSharedValue(0)
  const translationOffset = useSharedValue(0)

  const animatedTrackStyles = useAnimatedStyle(() => {
    const colorInterpolation = withTiming(
      interpolateColor(
        translationOffset.value,
        [0, 16],
        [
          theme.mode === 'dark' ? 'rgba(100, 100, 100, 0.5)' : 'rgba(100, 100, 100, 0.2)',
          disabled ? theme.palette.disabled : theme.palette.primary.main,
        ],
        'RGB',
        {
          gamma: 2.2,
        }
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

  function checkSwitch() {
    translationOffset.value = 16
    colorOffset.value = 1
    if (typeof onChange === 'function') onChange(true)
  }

  function uncheckSwitch() {
    translationOffset.value = 0
    colorOffset.value = 0
    if (typeof onChange === 'function') onChange(false)
  }

  function toggleSwitch() {
    if (typeof checked === 'boolean') {
      if (checked) {
        uncheckSwitch()
      } else {
        checkSwitch()
      }
    } else {
      if (translationOffset.value === 0) {
        checkSwitch()
      } else {
        uncheckSwitch()
      }
    }
  }

  useEffect(() => {
    if (checked) {
      checkSwitch()
    }
  }, [])

  return (
    <AnimatedTrack
      {...props}
      rounded={rounded}
      disabled={disabled}
      style={animatedTrackStyles}
      onPress={toggleSwitch}
    >
      <AnimatedThumb
        style={animatedThumbStyles}
        rounded={rounded}
        disabled={disabled}
        collapsable={false}
      />
    </AnimatedTrack>
  )
}

function UncontrolledSwitch({ defaultChecked, ...props }: Omit<SwitchProps, 'checked'>) {
  const [checked, setChecked] = useState(defaultChecked)

  function handleChange(checked: boolean) {
    setChecked(checked)
  }

  return <ControlledSwitch checked={checked} onChange={handleChange} {...props} />
}

export default function Switch({ checked, defaultChecked, ...props }: SwitchProps) {
  if (typeof checked === 'boolean') {
    return <ControlledSwitch checked={checked} {...props} />
  }

  return <UncontrolledSwitch defaultChecked={checked} {...props} />
}
