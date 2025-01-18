import { View, type ViewProps } from 'react-native'
import { styled } from '../../../theme/utilities'
import type { SxProps } from '../../../theme/types'

export interface BoxProps extends ViewProps, SxProps<ViewProps> {
  row?: boolean
}

const StyledBox = styled(View)<Omit<BoxProps, 'sx'>>((_theme, { row }) => ({
  flexDirection: row ? 'row' : 'column',
}))

export default function Box({ children, ...props }: BoxProps) {
  return <StyledBox {...props}>{children}</StyledBox>
}
