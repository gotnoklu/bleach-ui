import { View, type ViewProps } from 'react-native'
import { getPaletteColor, merge, styled } from '../../../theme/utilities'
import type { Palette, SxProps, TextColor } from '../../../theme/types'

export interface IndicatorProps extends Omit<ViewProps, 'children'>, SxProps<ViewProps> {}

export interface ProgressBarProps extends Omit<ViewProps, 'children'>, SxProps<ViewProps> {
  progress?: number
  size?: 'small' | 'medium' | 'large'
  intermediateColor?: keyof Palette | keyof TextColor | (string & {})
  completedColor?: keyof Palette | keyof TextColor | (string & {})
  slotProps?: {
    indicator?: IndicatorProps
  }
  rounded?: boolean
}

const StyledTrack = styled(View)<ProgressBarProps & { children: ViewProps['children'] }>(
  (theme, { size = 'small', rounded }) => {
    const baseStyles = {
      backgroundColor: theme.palette.backgrounds.default,
      width: '100%',
      borderRadius: rounded ? 8 : 0,
      overflow: 'hidden',
    } as const

    if (size === 'small') {
      return merge(baseStyles, { height: 2 })
    }

    if (size === 'medium') {
      return merge(baseStyles, { height: 4 })
    }

    if (size === 'large') {
      return merge(baseStyles, { height: 8 })
    }
  }
)

const StyledIndicator = styled(View)<
  IndicatorProps & {
    progress?: ProgressBarProps['progress']
    intermediateColor?: ProgressBarProps['intermediateColor']
    completedColor?: ProgressBarProps['completedColor']
    rounded?: ProgressBarProps['rounded']
  }
>(
  (
    theme,
    { progress = 0, intermediateColor = 'primary.light', completedColor = 'primary.main', rounded }
  ) => {
    const currentColor = progress === 100 ? completedColor : intermediateColor

    return {
      backgroundColor: getPaletteColor({
        palette: theme.palette,
        key: currentColor,
        fallback: currentColor,
      }),
      width: `${progress}%`,
      height: '100%',
      borderRadius: rounded ? 8 : 0,
    }
  }
)

export default function ProgressBar({ progress, slotProps, rounded, ...props }: ProgressBarProps) {
  return (
    <StyledTrack rounded={rounded} {...props}>
      <StyledIndicator progress={progress} rounded={rounded} {...slotProps?.indicator} />
    </StyledTrack>
  )
}
