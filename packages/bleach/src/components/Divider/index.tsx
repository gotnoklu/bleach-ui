import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'

export interface DividerProps extends ViewProps, SxProps<ViewProps> {}

const StyledDivider = styled(View)((theme) => ({
  borderBottomColor: theme.palette.divider,
  borderBottomWidth: 1,
  flex: 1,
  height: 1,
  maxHeight: 1,
}))

export default function Divider(props: DividerProps) {
  return <StyledDivider {...props} collapsable={false} />
}
