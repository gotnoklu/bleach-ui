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
import Avatar from 'bleach/dist/components/Avatar'
import { styled } from 'bleach/dist/theme/utilities'
import Chip from 'bleach/dist/components/Chip'
import { Alert, ScrollView } from 'react-native'
import { useState } from 'react'
import Badge from 'bleach/dist/components/Badge'
import { useTheme } from 'bleach/dist/theme/hooks'

const Section = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(4) }))
const SubSection = styled(Box)<BoxProps>((theme) => ({ gap: theme.spacing.create(2) }))
const BadgeItem = styled(Box)<BoxProps>((theme) => ({
  gap: theme.spacing.create(1),
  alignItems: 'center',
  flex: 1,
}))

export default function HomeScreen() {
  const theme = useTheme()
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

        {/* Chips Section */}
        <Section>
          <Typography variant="h5">Chips</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Chip>Default</Chip>
              <Chip>
                With Close Icon <Icon name="x" size={18} />
              </Chip>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Sizes
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Chip size="small">Small</Chip>
              <Chip size="medium">Medium</Chip>
              <Chip size="large">Large</Chip>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Shapes
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Chip>Default</Chip>
              <Chip rounded>Rounded</Chip>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              States
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Chip checked>Checked</Chip>
            </ListItem>
            <ListItem disableMinHeight disablePadding>
              <Chip disabled>Disabled</Chip>
            </ListItem>
          </SubSection>
        </Section>

        <Divider />

        {/* Sliders Section */}
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
              <Checkbox defaultChecked />
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
              <Switch defaultChecked />
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

        <Divider />

        {/* Tabs Section */}
        <Section>
          <Typography variant="h5">Tabs</Typography>

          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <Box sx={() => ({ gap: 12 })}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Standard
                </Typography>
                <Tabs value={basicTab} onChange={setBasicTab} variant="standard">
                  <Tabs.Tab label="Overview" value="tab1" />
                  <Tabs.Tab label="Details" value="tab2" />
                  <Tabs.Tab label="Settings" value="tab3" />
                </Tabs>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Scrollable
                </Typography>
                <Tabs value={fullWidthTab} onChange={setFullWidthTab} variant="scrollable">
                  <Tabs.Tab label="Profile" value="tab1" />
                  <Tabs.Tab label="Posts" value="tab2" />
                  <Tabs.Tab label="Photos" value="tab3" />
                  <Tabs.Tab label="Following" value="tab4" />
                  <Tabs.Tab label="Followers" value="tab5" />
                  <Tabs.Tab label="Likes" value="tab6" />
                </Tabs>
              </Box>
            </Box>
          </SubSection>

          <SubSection>
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
          </SubSection>

          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Styles
            </Typography>
            <Box sx={() => ({ gap: 12 })}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  With Icons
                </Typography>
                <Tabs value={iconTab} onChange={setIconTab}>
                  <Tabs.Tab label="Home" value="home" icon={<Icon name="home" size={20} />} />
                  <Tabs.Tab label="Search" value="search" icon={<Icon name="search" size={20} />} />
                  <Tabs.Tab label="Gear" value="settings" icon={<Icon name="gear" size={20} />} />
                </Tabs>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Custom Styled
                </Typography>
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
          </SubSection>
        </Section>

        <Divider />

        {/* Avatar Section */}
        <Section>
          <Typography variant="h5">Avatars</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Avatar>Jeremy Doe</Avatar>
              <Avatar variant="rounded">Random Brand</Avatar>
              <Avatar variant="square">Nathaniel Stevens</Avatar>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Sizes
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Avatar size="small">S</Avatar>
              <Avatar size="medium">M</Avatar>
              <Avatar size="large">L</Avatar>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Colors
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Avatar backgroundColor="primary.main" color="primary.text">
                Primary
              </Avatar>
              <Avatar backgroundColor="secondary" color="secondary.text">
                Secondary
              </Avatar>
              <Avatar backgroundColor="error.main" color="error.text">
                Error
              </Avatar>
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Images
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Avatar src="https://i.pravatar.cc/300?img=1" alt="User 1" />
              <Avatar variant="rounded" src="https://i.pravatar.cc/300?img=2" alt="User 2" />
              <Avatar variant="square" src="https://i.pravatar.cc/300?img=3" alt="User 3" />
            </ListItem>
          </SubSection>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Custom Content
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <Avatar backgroundColor="primary.light">
                <Icon name="person" size={20} color="primary.text" />
              </Avatar>
              <Avatar backgroundColor="secondary">
                <Icon name="gear" size={20} color="secondary.text" />
              </Avatar>
              <Avatar backgroundColor="error">
                <Icon name="bell" size={20} color="error.text" />
              </Avatar>
            </ListItem>
          </SubSection>
        </Section>

        <Divider />

        {/* Badges Section */}
        <Section>
          <Typography variant="h5">Badges</Typography>
          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Basic Usage
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <BadgeItem>
                <Badge content={3} color="primary" variant="contained">
                  <Icon name="inbox" size={28} />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Unread messages
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge content="NEW" color="success">
                  <Icon name="gift" size={28} />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Special offer
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge
                  content={
                    <Box
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.success.main,
                      }}
                    />
                  }
                  color="success"
                  variant="contained"
                >
                  <Avatar size="medium" src="https://i.pravatar.cc/300?img=3" />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Online status
                </Typography>
              </BadgeItem>
            </ListItem>
          </SubSection>

          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Colors & Variants
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <BadgeItem>
                <Badge content={12} color="primary" variant="contained" rounded>
                  <Icon name="bell" size={24} />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Notifications
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge content="LIVE" color="error" variant="outlined" rounded>
                  <Icon name="broadcast" size={24} />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Streaming
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge content="5" color="warning" variant="contained">
                  <Icon name="alert" size={24} />
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Alerts
                </Typography>
              </BadgeItem>
            </ListItem>
          </SubSection>

          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Interactive Examples
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <BadgeItem>
                <Badge content={99} max={99} color="error" variant="contained" rounded>
                  <Button variant="outlined" size="small">
                    Messages <Icon name="mail" size={16} />
                  </Button>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Message count
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge
                  content={<Icon name="check" size={12} color="success.text" />}
                  color="success"
                  variant="contained"
                  rounded
                >
                  <Button variant="outlined" size="small">
                    Connected <Icon name="link" size={16} />
                  </Button>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Status indicator
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge content="1" color="primary" variant="outlined" rounded>
                  <Button variant="contained" size="small">
                    Cart <Icon name="package" size={16} />
                  </Button>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Shopping cart
                </Typography>
              </BadgeItem>
            </ListItem>
          </SubSection>

          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Profile Examples
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <BadgeItem>
                <Badge
                  content={
                    <Box
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: theme.palette.success.main,
                      }}
                    />
                  }
                  color="success"
                  variant="contained"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar size="large" src="https://i.pravatar.cc/300?img=4">
                    JD
                  </Avatar>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Active now
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge
                  content="AWAY"
                  color="warning"
                  variant="outlined"
                  rounded
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar size="large" src="https://i.pravatar.cc/300?img=5">
                    MK
                  </Avatar>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Away status
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge
                  content={<Icon name="verified" size={16} color="primary.text" />}
                  color="primary"
                  variant="contained"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar size="large" src="https://i.pravatar.cc/300?img=6">
                    VK
                  </Avatar>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Verified user
                </Typography>
              </BadgeItem>
            </ListItem>
          </SubSection>

          <SubSection>
            <Typography variant="h6" color="text.secondary">
              Advanced Examples
            </Typography>
            <ListItem disableMinHeight disablePadding>
              <BadgeItem>
                <Badge content="1st" color="warning" variant="contained" rounded>
                  <Avatar size="large" backgroundColor="warning.light" color="warning.text">
                    <Icon name="star" size={24} />
                  </Avatar>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Achievement
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge
                  content={<Icon name="star-fill" size={12} color="warning.text" />}
                  color="warning"
                  variant="contained"
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                  <Avatar size="large" backgroundColor="primary.light" color="primary.text">
                    <Icon name="gift" size={24} />
                  </Avatar>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Special item
                </Typography>
              </BadgeItem>
              <BadgeItem>
                <Badge
                  content="PRO"
                  color="secondary"
                  variant="outlined"
                  rounded
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                  <Avatar size="large" backgroundColor="secondary.light" color="secondary.text">
                    <Icon name="rocket" size={24} />
                  </Avatar>
                </Badge>
                <Typography variant="body2" color="text.secondary">
                  Premium user
                </Typography>
              </BadgeItem>
            </ListItem>
          </SubSection>
        </Section>
      </BackgroundView>
    </ScrollView>
  )
}
