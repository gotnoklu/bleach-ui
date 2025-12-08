import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/styles'

export interface SeparatorProps extends ViewProps {}

const StyledSeparator = styled(View)((theme) => ({
  borderBottomColor: theme.palette.border,
  borderBottomWidth: 1,
  flex: 1,
  height: 1,
  maxHeight: 1,
}))

export function Separator(props: SeparatorProps) {
  return <StyledSeparator {...props} collapsable={false} />
}
