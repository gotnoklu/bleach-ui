import type { BoxProps } from '@bleach/ui/dist/components/Box'
import Box from '@bleach/ui/dist/components/Box'
import Typography from '@bleach/ui/dist/components/Typography'
import { styled } from '@bleach/ui/dist/theme/utilities'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing(2) }))

export const BoxShowcase = () => {
  return (
    <Section>
      <Typography variant="h5">Boxes</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Row
        </Typography>
        <Box direction="row" gap={2}>
          <Box backgroundColor="primary" width={50} height={50} />
          <Box backgroundColor="primary" width={50} height={50} />
          <Box backgroundColor="primary" width={50} height={50} />
        </Box>
      </SubSection>
    </Section>
  )
}
