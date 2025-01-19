import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'

export interface ListItemProps extends ViewProps, SxProps<ViewProps> {
  disablePadding?: boolean
  disableMinHeight?: boolean
}

const StyledListItem = styled(View)<Omit<ListItemProps, 'sx'>>(
  (theme, { disablePadding, disableMinHeight }) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.create(2),
    minHeight: disableMinHeight ? 'auto' : 56,
    paddingHorizontal: disablePadding ? 0 : theme.spacing.create(2),
  })
)

export default function ListItem({ children, ...props }: ListItemProps) {
  return <StyledListItem {...props}>{children}</StyledListItem>
}
