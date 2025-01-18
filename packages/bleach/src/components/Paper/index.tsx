import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'
import { type ForwardedRef, forwardRef } from 'react'

export interface PaperProps extends ViewProps, SxProps<ViewProps> {
  roundness?: number
}

const StyledPaper = styled(View)<Omit<PaperProps, 'sx'>>((theme, { roundness = 2 }) => ({
  borderRadius: theme.radius.create(roundness),
  backgroundColor: theme.palette.backgrounds.paper,
  ...theme.shadows[1],
}))

const Paper = forwardRef(function Paper(props: PaperProps, ref: ForwardedRef<View>) {
  return <StyledPaper ref={ref} {...props} />
})

export default Paper
