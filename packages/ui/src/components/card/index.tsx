import { type ForwardedRef, forwardRef } from 'react'
import { View, type ViewProps } from 'react-native'
import { styled } from '../../theme/styles'

export interface CardProps extends ViewProps {
  roundness?: number
}

const StyledCard = styled(View, { omitProps: ['variant'] })<CardProps>((theme, { roundness = 2 }) => {
  return {
    borderColor: theme.palette.border,
    borderWidth: 1,
    borderRadius: theme.radius(roundness),
    backgroundColor: theme.palette.card,
  }
})

export const Card = forwardRef(function Card(props: CardProps, ref: ForwardedRef<View>) {
  return <StyledCard ref={ref} {...props} />
})
