import { Box } from '@bleach/ui/components/box'
import { Slider } from '@bleach/ui/components/slider'
import { Text } from '@bleach/ui/components/text'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

export const SliderShowcase = () => {
  const [sliderValue1, setSliderValue1] = useState(50)

  return (
    <Section>
      <Text variant="h5">Sliders</Text>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          Basic Sliders
        </Text>
        <Box>
          <Slider value={sliderValue1} onChange={setSliderValue1} showValue />
        </Box>
        <Box>
          <Slider min={0} max={50} step={5} showValue />
        </Box>
      </SubSection>
      <SubSection>
        <Text variant="h6" color="text.secondary">
          States
        </Text>
        <Box>
          <Slider value={30} disabled />
        </Box>
      </SubSection>
    </Section>
  )
}
