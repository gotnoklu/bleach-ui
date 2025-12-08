import { View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/styles'

export interface BackgroundViewProps extends ViewProps {
  fill?: boolean
  alignCenter?: boolean
  justifyCenter?: boolean
}

const StyledBackgroundView = styled(View)((theme) => ({
  backgroundColor: theme.palette.background,
}))

export function BackgroundView({ fill, alignCenter, justifyCenter, style, children, ...props }: BackgroundViewProps) {
  return (
    <StyledBackgroundView
      {...props}
      style={selectStyles(
        { when: fill, styles: { flex: 1 } },
        { when: alignCenter, styles: { alignItems: 'center' } },
        { when: justifyCenter, styles: { justifyContent: 'center' } },
        { styles: style }
      )}
    >
      {children}
    </StyledBackgroundView>
  )
}
