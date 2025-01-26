import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'

export interface BoxProps extends ViewProps, SxProps<ViewProps> {
  row?: boolean
  gap?: number
  padding?: number
  margin?: number
  paddingX?: number
  marginX?: number
  paddingY?: number
  marginY?: number
  alignItems?: 'flex-start' | 'flex-end' | 'center'
  justifyContent?: 'flex-start' | 'flex-end' | 'center'
}

const StyledBox = styled(View)<Omit<BoxProps, 'sx'>>(
  (
    theme,
    {
      row,
      alignItems,
      justifyContent,
      padding = 0,
      paddingY = 0,
      paddingX = 0,
      margin = 0,
      marginY = 0,
      marginX = 0,
      gap = 0,
    }
  ) => ({
    flexDirection: row ? 'row' : 'column',
    padding: theme.spacing.create(padding),
    margin: theme.spacing.create(margin),
    paddingVertical: theme.spacing.create(paddingY),
    marginVertical: theme.spacing.create(marginY),
    paddingHorizontal: theme.spacing.create(paddingX),
    marginHorizontal: theme.spacing.create(marginX),
    alignItems: alignItems,
    justifyContent: justifyContent,
    gap: theme.spacing.create(gap),
  })
)

export default function Box({ children, ...props }: BoxProps) {
  return <StyledBox {...props}>{children}</StyledBox>
}
