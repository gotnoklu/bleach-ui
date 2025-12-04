import { View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/utilities'
import type { SxProps } from '../../theme/types'

export interface BackgroundViewProps extends ViewProps, SxProps<ViewProps> {
  fillParent?: boolean
  alignCenter?: boolean
  justifyCenter?: boolean
}

const StyledBackgroundView = styled(View)((theme) => ({
  backgroundColor: theme.palette.backgrounds.default,
}))

export default function BackgroundView({
  fillParent,
  alignCenter,
  justifyCenter,
  style,
  children,
  ...props
}: BackgroundViewProps) {
  return (
    <StyledBackgroundView
      {...props}
      style={selectStyles(
        { if: fillParent, styles: { flex: 1 } },
        { if: alignCenter, styles: { alignItems: 'center' } },
        { if: justifyCenter, styles: { justifyContent: 'center' } },
        { styles: style }
      )}
    >
      {children}
    </StyledBackgroundView>
  )
}
