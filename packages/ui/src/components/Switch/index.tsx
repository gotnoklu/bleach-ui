import { useLayoutEffect, useState } from 'react'
import { Pressable, type PressableProps, View } from 'react-native'
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useTheme } from '../../theme/context'
import { selectStyles, styled } from '../../theme/styles'

interface BaseSwitchProps extends PressableProps {
  variant?: 'filled' | 'outlined'
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

const Track = styled(Pressable)<SwitchProps>((theme, { variant = 'outlined', shape = 'default', disabled }) => {
  return selectStyles(
    {
      when: variant === 'outlined',
      styles: {
        borderWidth: 1.2,
        borderColor: disabled ? theme.palette.disabled : theme.palette.switchTrackOutlined,
      },
    },
    {
      when: variant === 'filled',
      styles: {
        backgroundColor: theme.palette.switchTrackFilled,
      },
    },
    {
      styles: {
        borderRadius: theme.radius(shape === 'rounded' ? 4 : 2),
        width: 40,
        minHeight: 16,
        padding: theme.spacing(0.5),
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.3 : 1,
      },
    }
  )
})

const Thumb = styled(View)<SwitchProps>((theme, { variant = 'outlined', disabled, shape = 'default' }) => {
  return selectStyles(
    {
      when: variant === 'outlined',
      styles: {
        backgroundColor: disabled ? theme.palette.disabled : theme.palette.switchTrackOutlined,
      },
    },
    {
      when: variant === 'filled',
      styles: {
        backgroundColor: disabled ? theme.palette.disabled : theme.palette.card,
      },
    },
    {
      styles: {
        borderRadius: theme.radius(shape === 'rounded' ? 4 : 1),
        width: 16,
        height: 16,
      },
    }
  )
})

const AnimatedTrack = Animated.createAnimatedComponent(Track)
const AnimatedThumb = Animated.createAnimatedComponent(Thumb)

function ControlledSwitch({ variant, checked, shape, disabled, onChecked, ...props }: ControlledSwitchProps) {
  const theme = useTheme()
  const colorOffset = useSharedValue(0)
  const translationOffset = useSharedValue(0)

  const animatedTrackStyles = useAnimatedStyle(() => {
    if (variant === 'filled') {
      return {
        backgroundColor: withTiming(
          interpolateColor(
            colorOffset.value,
            [0, 1],
            [theme.palette.switchTrackFilled, disabled ? theme.palette.disabled : theme.palette.primary.main],
            'RGB',
            { gamma: 2.2 }
          )
        ),
      }
    }

    return {
      borderColor: withTiming(
        interpolateColor(
          colorOffset.value,
          [0, 1],
          [theme.palette.switchTrackOutlined, disabled ? theme.palette.disabled : theme.palette.primary.main],
          'RGB',
          { gamma: 2.2 }
        )
      ),
    }
  })

  const animatedThumbStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(translationOffset.value) }],
      backgroundColor:
        variant === 'filled'
          ? theme.palette.card
          : withTiming(
              interpolateColor(
                colorOffset.value,
                [0, 1],
                [theme.palette.switchTrackFilled, theme.palette.primary.main],
                'RGB',
                { gamma: 2.2 }
              )
            ),
    }
  })

  function toggleSwitch() {
    if (checked) {
      translationOffset.value = 0
      colorOffset.value = 0
      if (typeof onChecked === 'function') onChecked(false)
    } else {
      translationOffset.value = variant === 'filled' ? 16 : 14
      colorOffset.value = 1
      if (typeof onChecked === 'function') onChecked(true)
    }
  }

  useLayoutEffect(() => {
    if (checked) {
      translationOffset.value = variant === 'filled' ? 16 : 14
      colorOffset.value = 1
    } else {
      translationOffset.value = 0
      colorOffset.value = 0
    }
  }, [])

  return (
    <AnimatedTrack
      {...props}
      variant={variant}
      shape={shape}
      disabled={disabled}
      style={animatedTrackStyles}
      onPress={toggleSwitch}
    >
      <AnimatedThumb
        style={animatedThumbStyles}
        variant={variant}
        shape={shape}
        disabled={disabled}
        collapsable={false}
      />
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
