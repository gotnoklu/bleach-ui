import { View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'
import { Fragment } from 'react/jsx-runtime'
import Divider from '../Divider'
import { type ForwardedRef, forwardRef } from 'react'

export interface ListItemProps extends ViewProps, SxProps<ViewProps> {
  size?: 'small' | 'medium' | 'large'
  divider?: boolean
  disablePadding?: boolean
  disableMinHeight?: boolean
}

const StyledListItem = styled(View)<Omit<ListItemProps, 'sx'>>(
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
          paddingHorizontal: disablePadding ? 0 : theme.spacing.create(2),
        },
      }
    )
  }
)

const ListItem = forwardRef(function ListItem(
  { divider, children, ...props }: ListItemProps,
  ref: ForwardedRef<View | null>
) {
  const element = (
    <StyledListItem ref={ref} {...props}>
      {children}
    </StyledListItem>
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

export default ListItem
