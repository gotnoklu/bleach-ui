import { View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/utilities'

export interface BackgroundViewProps extends ViewProps {
  fillParent?: boolean
  alignCenter?: boolean
  justifyCenter?: boolean
}

const StyledBackgroundView = styled(View)((theme) => ({
  backgroundColor: theme.palette.backgrounds.default,
}))

export function BackgroundView({
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
        { when: fillParent, styles: { flex: 1 } },
        { when: alignCenter, styles: { alignItems: 'center' } },
        { when: justifyCenter, styles: { justifyContent: 'center' } },
        { styles: style }
      )}
    >
      {children}
    </StyledBackgroundView>
  )
}
