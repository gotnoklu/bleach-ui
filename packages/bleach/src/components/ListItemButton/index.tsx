import { Pressable, type PressableProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'

export interface ListItemButtonProps extends PressableProps, SxProps<PressableProps> {
  disablePadding?: boolean
  disableMinHeight?: boolean
}

const StyledListItemButton = styled(Pressable)<Omit<ListItemButtonProps, 'sx'>>(
  (theme, { disablePadding, disableMinHeight }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.create(2),
    minHeight: disableMinHeight ? 'auto' : 56,
    borderRadius: theme.radius.create(2),
    paddingHorizontal: disablePadding ? 0 : theme.spacing.create(2),
  })
)

export default function ListItemButton({ children, ...props }: ListItemButtonProps) {
  return <StyledListItemButton {...props}>{children}</StyledListItemButton>
}
