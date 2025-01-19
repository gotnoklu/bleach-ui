import Button from 'bleach/dist/components/Button'
import Typography from 'bleach/dist/components/Typography'
import Checkbox from 'bleach/dist/components/Checkbox'
import Box, { type BoxProps } from 'bleach/dist/components/Box'
import BackgroundView from 'bleach/dist/components/BackgroundView'
import Switch from 'bleach/dist/components/Switch'
import ListItem from 'bleach/dist/components/ListItem'
import Divider from 'bleach/dist/components/Divider'
import Slider from 'bleach/dist/components/Slider'
import Tabs from 'bleach/dist/components/Tabs'
import Icon from 'bleach/dist/components/Icon'
import { Alert, ScrollView } from 'react-native'
import { useState } from 'react'
import { styled } from 'bleach'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))

export default function HomeScreen() {
  const [isChecked1, setIsChecked1] = useState(false)
  const [sliderValue1, setSliderValue1] = useState(50)
  const [loading, setLoading] = useState(false)

  const [basicTab, setBasicTab] = useState('tab1')
  const [iconTab, setIconTab] = useState('home')
  const [fullWidthTab, setFullWidthTab] = useState('tab1')
  const [stateTab, setStateTab] = useState('active')
  const [styledTab, setStyledTab] = useState('music')

  const handleLoadingPress = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const handleButtonAlertPress = () => {
    Alert.alert('Button pressed')
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
      <BackgroundView
        sx={(theme) => ({
          paddingHorizontal: theme.spacing.create(2),
          paddingVertical: theme.spacing.create(4),
          gap: theme.spacing.create(5),
        })}
      >
        <Box>
          <Typography variant="h1" fontWeight="medium" gutterBottom>
            Bleach UI
          </Typography>
          <Typography variant="h6" color="text.secondary">
            The stylish React Native UI library
          </Typography>
        </Box>

        {/* Buttons Section */}
        <Section>
          <Typography variant="h5">Buttons</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Shapes
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Button variant="contained">Default</Button>
              <Button variant="contained" rounded>
                Rounded
              </Button>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              States
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Button variant="contained" onPress={handleLoadingPress}>
                {loading ? 'Loading...' : 'Press me'}
              </Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
              <Button variant="contained" onPress={handleButtonAlertPress}>
                Action
              </Button>
            </ListItem>
          </SubSection>
        </Section>

        <Divider />

        {/* Sliders Section */}
        <Section>
          <Typography variant="h2">Sliders</Typography>
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

        <Divider />

        {/* Checkboxes Section */}
        <Section>
          <Typography variant="h5">Checkboxes</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Sizes
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked size="small" />
              <Typography>Small</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked />
              <Typography>Medium</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked size="large" />
              <Typography>Large</Typography>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked rounded />
              <Typography>Rounded</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked />
              <Typography>Default</Typography>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              States
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked={isChecked1} onChange={setIsChecked1} />
              <Typography>Controlled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox />
              <Typography>Uncontrolled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox checked disabled />
              <Typography style={{ flex: 1 }}>Disabled checked</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Checkbox disabled />
              <Typography style={{ flex: 1 }}>Disabled unchecked</Typography>
            </ListItem>
          </SubSection>
        </Section>
        <Divider />
        <Section>
          <Typography variant="h5">Switches</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Switch rounded />
              <Typography>Rounded</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch />
              <Typography>Default</Typography>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              States
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Switch />
              <Typography>Uncontrolled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch />
              <Typography>Controlled</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch checked disabled />
              <Typography>Disabled Checked</Typography>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Switch disabled />
              <Typography>Disabled Unchecked</Typography>
            </ListItem>
          </SubSection>
        </Section>

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
      </BackgroundView>
    </ScrollView>
  )
}
