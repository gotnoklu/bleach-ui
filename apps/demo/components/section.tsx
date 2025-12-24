import { Box, type BoxProps } from '@bleeech/ui/components/box'
import { styled } from '@bleeech/ui/theme/styles'

export const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
export const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))
