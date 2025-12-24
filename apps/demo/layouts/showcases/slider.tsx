import { Box } from '@bleeech/ui/components/box'
import { Slider } from '@bleeech/ui/components/slider'
import { Text } from '@bleeech/ui/components/text'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

export const SliderShowcase = () => {
  const [sliderValue1, setSliderValue1] = useState(50)

  return (
    <Section>
      <Text variant="xl">Sliders</Text>
      <SubSection>
        <Text variant="lg" color="text.secondary">
          Basic Sliders
        </Text>
        <Box>
          <Slider value={sliderValue1} onChange={setSliderValue1} />
        </Box>
        <Box>
          <Slider min={0} max={50} step={5} showValue />
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Sizes
        </Text>
        <Box>
          <Slider size="sm" value={sliderValue1} onChange={setSliderValue1} showValue />
        </Box>
        <Box>
          <Slider size="md" min={-50} max={50} step={1} showValue />
        </Box>
        <Box>
          <Slider size="lg" min={0} max={50} step={5} showValue />
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          States
        </Text>
        <Box>
          <Text>Disabled</Text>
          <Slider value={30} disabled />
        </Box>
      </SubSection>
    </Section>
  )
}
