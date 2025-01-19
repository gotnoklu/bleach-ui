import Button from 'bleach/dist/components/Button'
import Typography from 'bleach/dist/components/Typography'
import Checkbox from 'bleach/dist/components/Checkbox'
import Box from 'bleach/dist/components/Box'
import Slider from 'bleach/dist/components/Slider'
import { Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useState } from 'react'

export default function HomeScreen() {
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(true)
  const [loading, setLoading] = useState(false)
  const [sliderValue1, setSliderValue1] = useState(50)
  const [sliderValue2, setSliderValue2] = useState(25)
  const tabBarHeight = useBottomTabBarHeight()

  const handleLoadingPress = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const handleButtonAlertPress = () => {
    Alert.alert('Button pressed')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Box sx={() => ({ padding: 16, gap: 32, paddingBottom: tabBarHeight + 16 })}>
          <Box>
            <Typography variant="h1" gutterBottom>
              Bleach UI
            </Typography>
            <Typography variant="h6" color="text.secondary">
              A beautiful React Native UI library
            </Typography>
          </Box>

          {/* Buttons Section */}
          <Box sx={() => ({ gap: 16 })}>
            <Typography variant="h2">Buttons</Typography>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Variants
              </Typography>
              <Box row sx={() => ({ gap: 8, flexWrap: 'wrap' })}>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Button variant="text">Text</Button>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Shapes
              </Typography>
              <Box row sx={() => ({ gap: 8, flexWrap: 'wrap' })}>
                <Button variant="contained">Default</Button>
                <Button variant="contained" rounded>
                  Rounded
                </Button>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                States
              </Typography>
              <Box row sx={() => ({ gap: 8, flexWrap: 'wrap' })}>
                <Button variant="contained" onPress={handleLoadingPress}>
                  {loading ? 'Loading...' : 'Press me'}
                </Button>
                <Button variant="contained" disabled>
                  Disabled
                </Button>
                <Button variant="contained" onPress={handleButtonAlertPress}>
                  Action
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Checkboxes Section */}
          <Box sx={() => ({ gap: 16 })}>
            <Typography variant="h2">Checkboxes</Typography>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Interactive Examples
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Box row sx={() => ({ alignItems: 'center', gap: 8 })}>
                  <Checkbox checked={isChecked1} onChange={setIsChecked1} />
                  <Typography>Unchecked by default</Typography>
                </Box>
                <Box row sx={() => ({ alignItems: 'center', gap: 8 })}>
                  <Checkbox checked={isChecked2} onChange={setIsChecked2} />
                  <Typography>Checked by default</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Sizes
              </Typography>
              <Box row sx={() => ({ alignItems: 'center', gap: 16 })}>
                <Box sx={() => ({ alignItems: 'center', gap: 4 })}>
                  <Checkbox checked size={16} />
                  <Typography variant="caption">Small</Typography>
                </Box>
                <Box sx={() => ({ alignItems: 'center', gap: 4 })}>
                  <Checkbox checked size={24} />
                  <Typography variant="caption">Medium</Typography>
                </Box>
                <Box sx={() => ({ alignItems: 'center', gap: 4 })}>
                  <Checkbox checked size={32} />
                  <Typography variant="caption">Large</Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                States
              </Typography>
              <Box row sx={() => ({ alignItems: 'center', gap: 16 })}>
                <Box row sx={() => ({ alignItems: 'center', gap: 8 })}>
                  <Checkbox checked disabled />
                  <Typography>Disabled checked</Typography>
                </Box>
                <Box row sx={() => ({ alignItems: 'center', gap: 8 })}>
                  <Checkbox disabled />
                  <Typography>Disabled unchecked</Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Sliders Section */}
          <Box sx={() => ({ gap: 16 })}>
            <Typography variant="h2">Sliders</Typography>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Basic Sliders
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Box>
                  <Slider value={sliderValue1} onChange={setSliderValue1} showValue />
                </Box>
                <Box>
                  <Slider
                    value={sliderValue2}
                    onChange={setSliderValue2}
                    min={0}
                    max={50}
                    step={5}
                    showValue
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                States
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Slider value={30} disabled />
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
