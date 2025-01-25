import { styled } from 'bleach/dist/theme/utilities'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import Typography from 'bleach/dist/components/Typography'
import Slider from 'bleach/dist/components/Slider'
import { useState } from 'react'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export const SliderShowcase = () => {
  const [sliderValue1, setSliderValue1] = useState(50)

  return (
    <Section>
      <Typography variant="h5">Sliders</Typography>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          Basic Sliders
        </Typography>
        <Box>
          <Slider value={sliderValue1} onChange={setSliderValue1} showValue />
        </Box>
        <Box>
          <Slider min={0} max={50} step={5} showValue />
        </Box>
      </SubSection>
      <SubSection>
        <Typography variant="h6" color="text.secondary">
          States
        </Typography>
        <Box>
          <Slider value={30} disabled />
        </Box>
      </SubSection>
    </Section>
  )
}
