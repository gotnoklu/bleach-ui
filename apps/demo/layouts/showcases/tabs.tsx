import { Box } from '@bleeech/ui/components/box'
import {
  IconCaretRight,
  IconHome,
  IconMountain,
  IconSearch,
  IconSettings,
  IconVideo,
} from '@bleeech/ui/components/icons'
import { Tab, Tabs } from '@bleeech/ui/components/tabs'
import { Text } from '@bleeech/ui/components/text'
import { useState } from 'react'
import { Section, SubSection } from '../../components/section'

export const TabsShowcase = () => {
  const [basicTab, setBasicTab] = useState('tab1')
  const [iconTab, setIconTab] = useState('home')
  const [fullWidthTab, setFullWidthTab] = useState('tab1')
  const [stateTab, setStateTab] = useState('active')
  const [styledTab, setStyledTab] = useState('music')

  return (
    <Section>
      <Text variant="xl">Tabs</Text>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Variants
        </Text>
        <Box style={{ gap: 12 }}>
          <Box>
            <Text variant="sm" color="text.secondary" gutterBottom>
              Standard
            </Text>
            <Tabs value={basicTab} onTabSelect={setBasicTab} variant="standard">
              <Tab label="Overview" value="tab1" />
              <Tab label="Details" value="tab2" />
              <Tab label="Settings" value="tab3" />
            </Tabs>
          </Box>
          <Box>
            <Text variant="sm" color="text.secondary" gutterBottom>
              Scrollable
            </Text>
            <Tabs value={fullWidthTab} onTabSelect={setFullWidthTab} variant="scrollable">
              <Tab label="Profile" value="tab1" />
              <Tab label="Posts" value="tab2" />
              <Tab label="Photos" value="tab3" />
              <Tab label="Following" value="tab4" />
              <Tab label="Followers" value="tab5" />
              <Tab label="Likes" value="tab6" />
            </Tabs>
          </Box>
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          States
        </Text>
        <Box style={{ gap: 12 }}>
          <Tabs value={stateTab} onTabSelect={setStateTab}>
            <Tab label="Active" value="active" />
            <Tab label="Disabled" value="disabled" disabled />
            <Tab label="Long Tab Label" value="long" />
          </Tabs>
        </Box>
      </SubSection>

      <SubSection>
        <Text variant="lg" color="text.secondary">
          Styles
        </Text>
        <Box style={{ gap: 12 }}>
          <Box>
            <Text variant="sm" color="text.secondary" gutterBottom>
              With Icons
            </Text>
            <Tabs value={iconTab} onTabSelect={setIconTab}>
              <Tab
                label="Home"
                value="home"
                icon={({ isSelected }) => <IconHome size={20} color={isSelected ? 'primary.main' : 'icon'} />}
              />
              <Tab
                label="Search"
                value="search"
                icon={({ isSelected }) => <IconSearch size={20} color={isSelected ? 'primary.main' : 'icon'} />}
              />
              <Tab
                label="Gear"
                value="settings"
                icon={({ isSelected }) => <IconSettings size={20} color={isSelected ? 'primary.main' : 'icon'} />}
              />
            </Tabs>
          </Box>
          <Box>
            <Text variant="sm" color="text.secondary" gutterBottom>
              Custom Styled
            </Text>
            <Tabs
              value={styledTab}
              onTabSelect={setStyledTab}
              viewProps={{
                tabsWrapper: {
                  style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    borderRadius: 16,
                    borderBottomWidth: 0,
                    paddingHorizontal: 4,
                  },
                },
                indicator: {
                  style: {
                    borderRadius: 12,
                    top: 4,
                    bottom: 4,
                    height: 40,
                    backgroundColor: '#FFFFFF',
                    elevation: 1,
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  },
                },
              }}
            >
              <Tab
                label="Music"
                value="music"
                icon={({ isSelected }) => <IconCaretRight size={20} color={isSelected ? 'primary.main' : 'icon'} />}
              />
              <Tab
                label="Videos"
                value="videos"
                icon={({ isSelected }) => <IconVideo size={20} color={isSelected ? 'primary.main' : 'icon'} />}
              />
              <Tab
                label="Photos"
                value="photos"
                icon={({ isSelected }) => <IconMountain size={20} color={isSelected ? 'primary.main' : 'icon'} />}
              />
            </Tabs>
          </Box>
        </Box>
      </SubSection>
    </Section>
  )
}
