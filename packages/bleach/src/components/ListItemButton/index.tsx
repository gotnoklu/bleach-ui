import { Pressable, type View, type PressableProps } from 'react-native'
import { selectStyles, styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'
import { type ForwardedRef, forwardRef, Fragment } from 'react'
import Divider from '../Divider'

export interface ListItemButtonProps extends PressableProps, SxProps<PressableProps> {
  size?: 'small' | 'medium' | 'large'
  divider?: boolean
  disablePadding?: boolean
  disableMinHeight?: boolean
}

export const StyledListItemButton = styled(Pressable)<Omit<ListItemButtonProps, 'sx'>>(
  (theme, { size = 'large', disablePadding, disableMinHeight }) => {
    return selectStyles(
      { if: disableMinHeight, styles: { minHeight: 'auto' } },
      { if: size === 'small', styles: { minHeight: 40 } },
      { if: size === 'medium', styles: { minHeight: 48 } },
      { if: size === 'large', styles: { minHeight: 56 } },
      {
        styles: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.create(2),
          borderRadius: theme.radius.create(2),
          paddingHorizontal: disablePadding ? 0 : theme.spacing.create(2),
        },
      }
    )
  }
)

const ListItemButton = forwardRef(function ListItemButton(
  { divider, children, ...props }: ListItemButtonProps,
  ref: ForwardedRef<View | null>
) {
  const element = (
    <StyledListItemButton ref={ref} {...props}>
      {children}
    </StyledListItemButton>
  )

  if (divider === true) {
    return (
      <Fragment>
        {element}
        <Divider />
      </Fragment>
    )
  }

  return element
})

export default ListItemButton
