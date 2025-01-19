import Button from 'bleach/dist/components/Button'
import Typography from 'bleach/dist/components/Typography'
import Checkbox from 'bleach/dist/components/Checkbox'
import Box from 'bleach/dist/components/Box'
import Slider from 'bleach/dist/components/Slider'
import Tabs from 'bleach/dist/components/Tabs'
import Icon from 'bleach/dist/components/Icon'
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
  const [basicTab, setBasicTab] = useState('tab1')
  const [iconTab, setIconTab] = useState('home')
  const [fullWidthTab, setFullWidthTab] = useState('tab1')
  const [stateTab, setStateTab] = useState('active')
  const [styledTab, setStyledTab] = useState('music')
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

          {/* Tabs Section */}
          <Box sx={() => ({ gap: 16 })}>
            <Typography variant="h2">Tabs</Typography>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Basic Tabs
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Tabs value={basicTab} onChange={setBasicTab}>
                  <Tabs.Tab label="Tab 1" value="tab1" />
                  <Tabs.Tab label="Tab 2" value="tab2" />
                  <Tabs.Tab label="Tab 3" value="tab3" />
                </Tabs>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Tabs with Icons
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Tabs value={iconTab} onChange={setIconTab}>
                  <Tabs.Tab label="Home" value="home" icon={<Icon name="home" size={20} />} />
                  <Tabs.Tab label="Search" value="search" icon={<Icon name="search" size={20} />} />
                  <Tabs.Tab label="Gear" value="settings" icon={<Icon name="gear" size={20} />} />
                </Tabs>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Full Width Tabs
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Tabs value={fullWidthTab} onChange={setFullWidthTab} variant="fullWidth">
                  <Tabs.Tab label="Tab 1" value="tab1" />
                  <Tabs.Tab label="Tab 2" value="tab2" />
                  <Tabs.Tab label="Tab 3" value="tab3" />
                </Tabs>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                States
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Tabs value={stateTab} onChange={setStateTab}>
                  <Tabs.Tab label="Active" value="active" />
                  <Tabs.Tab label="Disabled" value="disabled" disabled />
                  <Tabs.Tab label="Long Tab Label" value="long" />
                </Tabs>
              </Box>
            </Box>

            <Box sx={() => ({ gap: 8 })}>
              <Typography variant="h6" color="text.secondary">
                Styled Tabs
              </Typography>
              <Box sx={() => ({ gap: 12 })}>
                <Tabs
                  value={styledTab}
                  onChange={setStyledTab}
                  slotProps={{
                    tabsContainer: {
                      style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        borderRadius: 8,
                        padding: 4,
                        borderBottomWidth: 0,
                      },
                    },
                    tab: (state) => ({
                      style: {
                        borderRadius: 12,
                        minHeight: 40,
                        backgroundColor: state.isSelected ? '#FFFFFF' : 'transparent',
                        elevation: state.isSelected ? 1 : 0,
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: state.isSelected ? 1 : 0,
                        shadowRadius: 2,
                      },
                    }),
                    indicator: {
                      style: {
                        display: 'none',
                      },
                    },
                  }}
                >
                  <Tabs.Tab label="Music" value="music" icon={<Icon name="play" size={20} />} />
                  <Tabs.Tab label="Videos" value="videos" icon={<Icon name="video" size={20} />} />
                  <Tabs.Tab label="Photos" value="photos" icon={<Icon name="image" size={20} />} />
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}
