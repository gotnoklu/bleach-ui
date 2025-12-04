import { View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'
import { type ForwardedRef, forwardRef } from 'react'

export interface PaperProps extends ViewProps, SxProps<ViewProps> {
  variant?: 'outlined' | 'elevated'
  roundness?: number
}

const StyledPaper = styled(View, { omitProps: ['variant'] })<Omit<PaperProps, 'sx'>>(
  (theme, { variant = 'elevated', roundness = 2 }) => {
    return selectStyles(
      { if: variant === 'elevated' || variant === undefined, styles: theme.shadows[1] },
      {
        if: variant === 'outlined',
        styles: { borderColor: theme.palette.divider, borderWidth: 1 },
      },
      {
        styles: {
          borderRadius: theme.radius.create(roundness),
          backgroundColor: theme.palette.backgrounds.paper,
        },
      }
    )
  }
)

const Paper = forwardRef(function Paper(props: PaperProps, ref: ForwardedRef<View>) {
  return <StyledPaper ref={ref} {...props} />
})

export default Paper
