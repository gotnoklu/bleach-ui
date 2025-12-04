import { type ForwardedRef, forwardRef } from 'react'
import { View, type ViewProps } from 'react-native'
import { selectStyles, styled } from '../../theme/utilities'

export interface CardProps extends ViewProps {
  variant?: 'outlined' | 'elevated'
  roundness?: number
}

const StyledCard = styled(View, { omitProps: ['variant'] })<Omit<CardProps, 'sx'>>(
  (theme, { variant = 'elevated', roundness = 2 }) => {
    return selectStyles(
      { when: variant === 'elevated' || variant === undefined, styles: theme.shadows[1] },
      {
        when: variant === 'outlined',
        styles: { borderColor: theme.palette.border, borderWidth: 1 },
      },
      {
        styles: {
          borderRadius: theme.radius(roundness),
          backgroundColor: theme.palette.backgrounds.paper,
        },
      }
    )
  }
)

export const Card = forwardRef(function Card(props: CardProps, ref: ForwardedRef<View>) {
  return <StyledCard ref={ref} {...props} />
})
