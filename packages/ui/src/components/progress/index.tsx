import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/styles'
import type { PaletteColorToken } from '../../theme/types'
import { getThemeProperty } from '../../theme/utilities'

export interface IndicatorProps extends Omit<ViewProps, 'children'> {}

export interface ProgressBarProps extends Omit<ViewProps, 'children'> {
  progress?: number
  size?: 'sm' | 'md' | 'lg'
  shape?: 'default' | 'rounded'
  colors?: { complete?: PaletteColorToken | (string & {}); incomplete?: PaletteColorToken | (string & {}) }
  viewProps?: {
    indicator?: IndicatorProps
  }
}

const ProgressSizes = { sm: 4, md: 8, lg: 12 }

const StyledTrack = styled(View)<ProgressBarProps & { children: ViewProps['children'] }>(
  (theme, { size = 'sm', shape = 'default' }) => {
    return {
      backgroundColor: theme.palette.progressTrack,
      width: '100%',
      borderRadius: shape === 'rounded' ? theme.radius(2) : 0,
      overflow: 'hidden',
      height: ProgressSizes[size],
    }
  }
)

const StyledIndicator = styled(View)<
  IndicatorProps & {
    progress?: ProgressBarProps['progress']
    colors?: ProgressBarProps['colors']
    shape?: ProgressBarProps['shape']
  }
>((theme, { progress = 0, colors = { complete: 'primary.main', incomplete: 'primary.light' }, shape = 'default' }) => {
  const currentColor = progress === 100 ? colors?.complete : colors?.incomplete

  return {
    backgroundColor: getThemeProperty({
      object: theme.palette,
      key: currentColor ?? 'primary.main',
      fallback: currentColor,
    }),
    width: `${progress}%`,
    height: '100%',
    borderRadius: shape === 'rounded' ? theme.radius(2) : 0,
  }
})

export function Progress({ progress, viewProps, shape, colors, ...props }: ProgressBarProps) {
  return (
    <StyledTrack shape={shape} {...props}>
      <StyledIndicator progress={progress} shape={shape} colors={colors} {...viewProps?.indicator} />
    </StyledTrack>
  )
}
