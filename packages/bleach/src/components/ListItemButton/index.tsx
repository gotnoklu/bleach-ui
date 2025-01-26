import { Pressable, type View, type PressableProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'
import { type ForwardedRef, forwardRef } from 'react'

export interface ListItemButtonProps extends PressableProps, SxProps<PressableProps> {
  disablePadding?: boolean
  disableMinHeight?: boolean
}

const StyledListItemButton = styled(Pressable)<Omit<ListItemButtonProps, 'sx'>>(
  (theme, { disablePadding, disableMinHeight }) => ({
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.create(2),
    minHeight: disableMinHeight ? 'auto' : 56,
    borderRadius: theme.radius.create(2),
    paddingHorizontal: disablePadding ? 0 : theme.spacing.create(2),
  })
)

const ListItemButton = forwardRef(function ListItemButton(
  { children, ...props }: ListItemButtonProps,
  ref: ForwardedRef<View | null>
) {
  return (
    <StyledListItemButton ref={ref} {...props}>
      {children}
    </StyledListItemButton>
  )
})

export default ListItemButton
