import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'
import { type ForwardedRef, forwardRef } from 'react'

export interface BoxProps extends ViewProps, SxProps<ViewProps> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  flex?: number
  gap?: number
  padding?: number
  margin?: number
  paddingX?: number
  marginX?: number
  paddingY?: number
  paddingTop?: number
  paddingBottom?: number
  marginY?: number
  marginTop?: number
  marginBottom?: number
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
}

const StyledBox = styled(View)<Omit<BoxProps, 'sx'>>(
  (
    theme,
    {
      direction,
      flex,
      alignItems,
      justifyContent,
      padding = 0,
      paddingY = 0,
      paddingX = 0,
      margin = 0,
      marginY = 0,
      marginX = 0,
      paddingTop = 0,
      paddingBottom = 0,
      marginTop = 0,
      marginBottom = 0,
      gap = 0,
    }
  ) => ({
    flex,
    flexDirection: direction,
    padding: theme.spacing.create(padding),
    margin: theme.spacing.create(margin),
    paddingTop: theme.spacing.create(paddingTop),
    paddingBottom: theme.spacing.create(paddingBottom),
    paddingVertical: theme.spacing.create(paddingY),
    marginVertical: theme.spacing.create(marginY),
    paddingHorizontal: theme.spacing.create(paddingX),
    marginHorizontal: theme.spacing.create(marginX),
    marginTop: theme.spacing.create(marginTop),
    marginBottom: theme.spacing.create(marginBottom),
    alignItems: alignItems,
    justifyContent: justifyContent,
    gap: theme.spacing.create(gap),
  })
)

const Box = forwardRef(function Box(
  { children, ...props }: BoxProps,
  ref: ForwardedRef<View | null>
) {
  return (
    <StyledBox ref={ref} {...props}>
      {children}
    </StyledBox>
  )
})

export default Box
