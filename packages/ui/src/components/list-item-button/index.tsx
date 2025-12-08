import { type ForwardedRef, forwardRef } from 'react'
import { Pressable, type PressableProps, type View } from 'react-native'
import { selectStyles, styled } from '../../theme/styles'
import { Separator } from '../separator'

export interface ListItemButtonProps extends PressableProps {
  size?: 'small' | 'medium' | 'large'
  separator?: boolean
  disablePadding?: boolean
  disableMinHeight?: boolean
}

export const StyledListItemButton = styled(Pressable)<ListItemButtonProps>(
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
          borderRadius: theme.radius(2),
          paddingHorizontal: disablePadding ? 0 : theme.spacing(2),
        },
      }
    )
  }
)

export const ListItemButton = forwardRef(function ListItemButton(
  { separator, children, ...props }: ListItemButtonProps,
  ref: ForwardedRef<View | null>
) {
  const element = (
    <StyledListItemButton ref={ref} {...props}>
      {children}
    </StyledListItemButton>
  )

  if (separator === true) {
    return (
      <>
        {element}
        <Separator />
      </>
    )
  }

  return element
})
