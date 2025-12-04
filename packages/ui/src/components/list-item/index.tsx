import { type ForwardedRef, forwardRef } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/utilities'
import Separator from '../separator'

export interface ListItemProps extends ViewProps {
  size?: 'small' | 'medium' | 'large'
  Separator?: boolean
  disablePadding?: boolean
  disableMinHeight?: boolean
}

const StyledListItem = styled(View)<Omit<ListItemProps, 'sx'>>(
  (theme, { size = 'large', disablePadding, disableMinHeight }) => {
    return selectStyles(
      { when: disableMinHeight, styles: { minHeight: 'auto' } },
      { when: size === 'small', styles: { minHeight: 40 } },
      { when: size === 'medium', styles: { minHeight: 48 } },
      { when: size === 'large', styles: { minHeight: 56 } },
      {
        styles: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing(2),
          paddingHorizontal: disablePadding ? 0 : theme.spacing(2),
        },
      }
    )
  }
)

const ListItem = forwardRef(function ListItem(
  { Separator, children, ...props }: ListItemProps,
  ref: ForwardedRef<View | null>
) {
  const element = (
    <StyledListItem ref={ref} {...props}>
      {children}
    </StyledListItem>
  )

  if (Separator === true) {
    return (
      <Fragment>
        {element}
        <Separator />
      </Fragment>
    )
  }

  return element
})

export ListItem
